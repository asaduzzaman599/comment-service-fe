import React, { useEffect,  } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../store';
import api from '../lib/axios';
import { type Comment } from '../store/comments-slice';

interface Props {
  comment: Comment
}

export default function CommentItem({comment}: Props) {
    const dispatch = useAppDispatch()
    const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
  }, []);


  return (
    <li key={comment._id} className="p-3 border rounded bg-gray-50">
            <span className="font-semibold">{comment.user.name}: </span>
            <span>{comment.comment}</span>
          </li>
  );
}
