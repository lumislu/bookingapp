import axios from "axios";
import React, { useEffect, useState } from "react";

const useCreateOrder = (url, orderData, createOrderState) => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await axios.post(url, orderData);
      } catch (e) {
        console.log("上傳失敗");
      }
    };
    if (createOrderState == true) {
      createOrder();
    }
  }, [createOrderState]);
  return { order };
};

export default useCreateOrder;
