export const errorMessage = (status, message, err) => {
  const error = new Error();
  const orignalErr = err?.message || "條件錯誤";
  //err?問號代表沒有宣告也沒關係，避免後續問題
  error.status = status;
  error.message = message ;
  return error;
};
