import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../store';
import { fetchUser } from '../store/auth-slice';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const dispatch = useAppDispatch()
      const auth = useSelector((state: RootState) => state.auth);

  useEffect(()=>{
    dispatch(fetchUser())
  },[])
  if(auth.loading) return (<div>Loading.... {auth.user?.name}</div>)

  if (!auth?.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;