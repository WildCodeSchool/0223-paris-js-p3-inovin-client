import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showConfirm, hideConfirm } from "../store/confirm.js";

function useConfirm() {
  const dispatch = useDispatch();
  const confirmState = useSelector((state) => state.confirm);
  const resolveCallbackRef = React.useRef(null);

  const onConfirm = () => {
    closeConfirm();
    if (resolveCallbackRef.current) {
      resolveCallbackRef.current(true);
      resolveCallbackRef.current = null; // Reset the callback after it's used
    }
  };

  const onCancel = () => {
    closeConfirm();
    if (resolveCallbackRef.current) {
      resolveCallbackRef.current(false);
      resolveCallbackRef.current = null; // Reset the callback after it's used
    }
  };

  const confirm = (text) => {
    dispatch(showConfirm({ text }));
    return new Promise((res, rej) => {
      resolveCallbackRef.current = res;
    });
  };

  const closeConfirm = () => {
    dispatch(hideConfirm());
  };

  return { confirm, onConfirm, onCancel, confirmState };
}

export default useConfirm;
