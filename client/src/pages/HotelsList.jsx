import SearchItem from "../components/SearchItem";
import Navbar from "../components/Navbar";
import React, { useState, useContext } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import * as locales from "react-date-range/dist/locale";
import "./hotelsList.scss";
import { useLocation } from "react-router-dom";
import { OptionsContext } from "../context/OptionsContext";
import { new_Options } from "../constants/actionTypes";
import useFetch from "../hooks/useFetch";
import Skeleton from "../components/Skeleton";

const HotelsList = () => {
  const [openConditions, setOpenConditions] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

  const locationSearchBarData = useLocation();


  const [destination, setDestination] = useState(
    locationSearchBarData.state?.destination
  );
  const [dates, setDates] = useState(locationSearchBarData.state?.dates);

  const [conditions, setConditions] = useState(
    locationSearchBarData.state?.conditions
  );
  const { city, date, options, dispatch } = useContext(OptionsContext);
  const [lowestPrice, setLowestPrice] = useState("");
  const [highestPrice, setHighestPrice] = useState("");

  const searchUrl = `/hotels?${
    destination ? "city=" + destination : "popularHotel=true"
  }&lowestPrice=${lowestPrice} &highestPrice=${highestPrice}
  `;
  const [fetchDataUrl, setFetchDataUrl] = useState(searchUrl);
  const { data, loading, error } = useFetch(fetchDataUrl);

  const handleClick = () => {
    dispatch({
      type: new_Options,
      payload: { city: destination, date: dates, options: conditions },
    });
    setFetchDataUrl(searchUrl);
  };

  return (
    <div>
      <Navbar />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <div className="searchTitle">搜尋</div>
            <div className="listItem">
              <label>目的地／住宿名稱：{destination}</label>
              <input
                type="text"
                className="searchInput"
                placeholder={destination === "" ? "要去哪裡?" : destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="listItem">
              <label>入住/退房日期</label>
              <span className="dates">
                <div
                  className="searchInput"
                  onClick={() => setOpenCalendar(!openCalendar)}
                >
                  {format(date[0].startDate, "MM/dd/yyyy")} -{" "}
                  {format(date[0].endDate, "MM/dd/yyyy")}
                </div>
                {openCalendar && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                    locale={locales["zhTW"]}
                  />
                )}
              </span>
            </div>
            <div className="listItem">
              <div className="listItemLimitPrice">
                <span className="limitTitle">每晚最低價格</span>
                <input
                  type="text"
                  className="searchInput"
                  onChange={(e) => setLowestPrice(e.target.value)}
                />
              </div>
              <div className="listItemLimitPrice">
                <span className="limitTitle">每晚最高價格</span>
                <input
                  type="text"
                  className="searchInput"
                  onChange={(e) => setHighestPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="listItemConditions">
              <span
                className="SearchText"
                onClick={() => setOpenConditions(!openConditions)}
              >
                {conditions.adult}位成人·{conditions.children}位小孩·
                {conditions.room}間房
              </span>
            </div>
          </div>
          <div className="listItem">
            <button className="searchbtn" onClick={handleClick}>
              搜尋
            </button>
          </div>
        </div>
        <div className="listResult">
          <div className="resultTitle">
            <h2>
              在{city || "熱門景點"}找到{data.length}間房間
            </h2>
            <div className="map">
              <button>在地圖上顯示</button>
            </div>
          </div>
          {loading ? (
            <Skeleton type="SearchItemSK" length={3} />
          ) : (
            data.map((item, index) => (
              <SearchItem
                active={index == 0 && "active"}
                key={item._id}
                dataDetail={item}
                conditions={options}
                dates={date}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelsList;
