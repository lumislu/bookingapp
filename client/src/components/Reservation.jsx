import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import React from "react";
import { useContext, useState } from "react";
import { OptionsContext } from "../context/OptionsContext";
import { LoginContext } from "../context/LoginContext";
import useFetch from "../hooks/useFetch";
import "./reservation.scss";
import { motion } from "framer-motion";
import axios from "axios";
import useCreateOrder from "../hooks/useCreateOrder";
import { ReservationDatesList } from "../datesCalculate";
import { useNavigate } from "react-router-dom";

const Reservation = ({ openSetting, hotelid, DatesLength }) => {
  const { data, loading, error } = useFetch(`/rooms/findHotel/${hotelid}`);
  const { date, options } = useContext(OptionsContext);

  const { user } = useContext(LoginContext);
  const [roomNumber, setRoomNumber] = useState([]);
  const [orderData, setOrderData] = useState({
    userId: user,
    hotelid: hotelid,
    RoomNumberId: [],
    ReservationDates: [
      {
        startDate: date[0].startDate,
        endDate: date[0].endDate,
      },
    ],
    totalPrice: 0,
    options: {
      adult: options.adult,
      children: options.children,
      rooms: options.room,
    },
  });
  const { datesList } = ReservationDatesList(
    date[0]?.startDate,
    date[0]?.endDate
  );
  // console.log(datesList)
  const [createOrderState, setCreateOrderState] = useState(false);
  const { order } = useCreateOrder("/order", orderData, createOrderState);
  const handleCheckBox = (e) => {
    const roomNumberId = e.target.value;
    const checked = e.target.checked;
    setRoomNumber(
      checked
        ? [...roomNumber, roomNumberId]
        : roomNumber.filter((item) => item !== roomNumberId)
    );
  };
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      await setOrderData((item) => ({ ...item, RoomNumberId: roomNumber }));
      setCreateOrderState(true);
      updateReservationDates();
      setTimeout(() => navigate("/"), 5000);
    } catch (e) {
      console.log("訂單或住宿日期上傳失敗");
    }
  };
  // console.log(orderData)
  const updateReservationDates = async () => {
    try {
      await Promise.all(
        roomNumber.map((roomNumberId) => {
          const res = axios.put(`/rooms/reservationdates/${roomNumberId}`, {
            dates: datesList,
          });
        })
      );
    } catch (e) {
      console.log("上傳失敗");
    }
  };
  const isNotAvailableDate = (roomNumber) => {
    const isitNotAvailable = roomNumber.unavailableDates.some((dates) =>
      datesList.includes(new Date(dates).getTime())
    );
    return isitNotAvailable;
  };

  return (
    <div className="Reservation">
      <motion.div
        className="container"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="wrapper">
          <div className="title">
            <h2>空房情況</h2>
            <p>
              {format(date[0]?.startDate, "MM/dd/yyyy")} -{" "}
              {format(date[0]?.endDate, "MM/dd/yyyy")} 入住 {DatesLength} 晚{" "}
            </p>
            <FontAwesomeIcon
              icon={faCircleXmark}
              onClick={() => openSetting(false)}
            />
          </div>
          <div className="body">
            <div className="roomTitle">
              <div>客房類型</div>
              <div>適合人數</div>
              <div>房型今日價格</div>
              <div>住宿總價格</div>
              <div>選擇房型編號</div>
            </div>
            <div className="roomData">
              <div className="roomColumn">
                {loading && <>載入中</>}
                {data.map((room, i) => (
                  <div className="roomInfo" key={i}>
                    <div>
                      {room.title}
                      <br />
                      <p>{room.desc}</p>
                    </div>
                    <div>{room.maxPeople}</div>
                    <div>TWD {room.price}</div>

                    <div>TWD {room.price * DatesLength}</div>

                    <div>
                      {room.roomNumbers?.map((item, i) => (
                        <span key={i}>
                          <input
                            type="checkbox"
                            value={item._id}
                            onChange={handleCheckBox}
                            disabled={isNotAvailableDate(item)}
                          />
                          {item.number}
                          <br />
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="reservationbtn"
                disabled={roomNumber.length == 0}
                onClick={handleClick}
              >
                現在預訂
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Reservation;
