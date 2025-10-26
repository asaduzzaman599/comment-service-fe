import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../store';
import { useForm, type SubmitHandler } from 'react-hook-form';
import api from '../lib/axios';
import { fetchComments } from '../store/comments-slice';
import CommentItem from '../components/CommentItem';
import { toast } from 'react-toastify';

interface Comment {
  id: number;
  username: string;
  text: string;
}

export default function CommentSection() {
    const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm<{comment: string }>();
    const dispatch = useAppDispatch()
    const user = useSelector((state: RootState) => state.auth.user);
    const comments = useSelector((state: RootState) => state.comment.comments);

  useEffect(() => {
    dispatch(fetchComments({limit: 6,
        page: 1
    }));
  }, [dispatch]);
 const onSubmit: SubmitHandler<{comment: string }> = async (data) => {
    try {

         await api.post("/comments", data); // Replace with your backend login endpoint
        reset()
     toast("Comment successful!");
    } catch (err) {
      console.error(err);
      toast("Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4">Comments</h2>

      {/* Comment list */}
      <ul className="space-y-4 mb-6 h-100 overflow-x-scroll">
        {comments?.map((comment) => (
          <CommentItem key={comment._id} comment={comment}/>
        ))}
      </ul>

      {/* Comment form */}
      <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-2">
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
          Submit Comment
        </button>
      </form>
    </div>
  );
}
