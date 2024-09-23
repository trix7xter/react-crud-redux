import { toast, ToastContainer } from 'react-toastify';
import {
  selectErrorMessage,
  clearErrorMessage,
} from '../../redux/slices/errorSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const Error = () => {
  const errorMessage = useSelector(selectErrorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorMessage) {
      toast.info(errorMessage);
      dispatch(clearErrorMessage());
    }
  }, [errorMessage, dispatch]);
  return <ToastContainer position="top-right" autoClose={5000} />;
};

export default Error;
