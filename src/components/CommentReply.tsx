import React, { useEffect, useState,  } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../store';
import api from '../lib/axios';
import { type Comment } from '../store/comments-slice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faReply, faTrash  } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
interface Props {
comment: Comment
}
export default function CommentReply({comment }: Props){
        

    const user = useSelector((state: RootState) => state.auth.user);

    function matchUser(id: string){
      return user?._id === id
    }

    function like(id: string){
      api.patch(`/comments/like/${id}`)
      
    }
    function dislike(id: string){

      api.patch(`/comments/dislike/${id}`)
    }
    function deleteComment(id: string){

      api.delete(`/comments/remove/${id}`).then(()=>
      toast("Comment Removed")
      )
    }

  return (
     <div className={`border-b border-gray-200 px-4 py-5 sm:px-6 flex flex-col w-full hover:bg-gray-200 ${matchUser(comment.userId)? 'items-end' : 'items-start' }`}>
      <h3 className="text-base font-semibold text-gray-900">{comment.user.name}</h3>
      <p className="mt-1 text-sm text-gray-500">
       {comment.comment}
      </p>
      <div className='flex gap-5'>
         <button onClick={()=>like(comment._id)} className={`flex items-center  ${comment?.likeIds?.find(i=>matchUser(i)) ? 'text-red-500' : 'text-gray-500' } gap-1 hover:`}>
        <FontAwesomeIcon icon={faThumbsUp} />
        <span>{comment?.likeIds?.length ?? 0}</span>
      </button>
         <button className={`flex items-center  ${comment?.dislikeIds?.find(i=>matchUser(i))? 'text-red-500' : 'text-gray-500' } gap-1 hover:`}>
        <FontAwesomeIcon  onClick={()=>dislike(comment._id)} icon={faThumbsDown} />
        <span>{comment?.dislikeIds?.length ?? 0}</span>
      </button>
     {matchUser(comment.userId) && <button onClick={()=>deleteComment(comment._id)} className="flex items-center gap-1  text-gray-500 hover:text-green-500">
        <FontAwesomeIcon icon={faTrash} />
      </button>}
      </div>
    </div>
  );
}