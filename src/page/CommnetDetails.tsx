import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../lib/axios"
import CommentItem from "../components/CommentItem"
import type { Comment } from "../store/comments-slice"
import CommentReply from "../components/CommentReply"
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from "react-toastify"
import { getSocket } from "../lib/socket"

export default function CommentDetailsPage(){
    const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm<{comment: string }>();
       const navigate = useNavigate()
     const { id } = useParams()
     const [comment, setComment] = useState<Comment>()
     const [replies, setReplies] = useState<Comment[]>()
     useEffect(()=>{
       fetchComment()
        fetchReply()
        const socket = getSocket()
        if(socket){
            socket.on("updateReplies",(msg: any)=>{
                if(id == msg.comment.parentId){
                    fetchReply()
                }
                else if(!msg.comment.parentId){
                    fetchComment()
                }
            })
        }
     },[])

     function fetchReply(){
        api.get('comments/reply/' + id).then(({data})=>setReplies(data.data))
     }
     function fetchComment(){
        api.get('comments/' +  id).then(({data})=>{
            if(data?.data)
            setComment(data.data)
        })
     }

     const onSubmit: SubmitHandler<{comment: string }> = async (data) => {
    try {

         await api.post(`/comments/reply/${id}`, data);
        reset()
     toast("Replied successful!");
    } catch (err) {
      console.error(err);
      toast("Something went wrong!");
    }
  };
    return (<>
    <div className="md:w-2/3 w-full mx-auto bg-white h-screen grid grid-cols-1 md:grid-cols-2 gap-5">
    <div className="flex flex-col justify-between">

    {comment && <CommentItem key={comment._id} comment={comment}></CommentItem>}
    <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-2 p-2">
        <textarea
          className="p-2 border rounded resize-none"
          id="comment" {...register("comment", { required: "Comment is required" })}
          placeholder="Comment Here..."
          required
          rows={3}
          />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-blue-700"
          >
          Submit Reply
        </button>
        <button
          onClick={()=>navigate('/comments')}
          className="bg-red-600 text-white p-2 rounded hover:bg-blue-700"
          >
          Back
        </button>
      </form>
      </div>
    <div className="h-full overflow-auto">
        {replies && replies?.map(c=><CommentReply comment={c}></CommentReply>)}
    </div>
        
        </div></>)
}