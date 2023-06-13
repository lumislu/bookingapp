import React from "react";
import "./searchItem.scss";
import { Link } from "react-router-dom";
import { ReservationDatesAndPrice } from "../datesCalculate";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const SearchItem = ({ active, dataDetail, conditions, dates }) => {
  const hotelsPrice = dataDetail.cheapestPrice;
  const { DatesLength, totalHotelsPrice } = ReservationDatesAndPrice(
    dates[0]?.startDate,
    dates[0]?.endDate,
    hotelsPrice
  );
  const ItemTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#F5544A",
      padding: 10,
    },
  }));

  return (
    <div className={`searchItem ${active}`}>
      <img src={dataDetail.photos[0]} alt="" />
      <div className="itemInfo">
        <div className="infoTitle">
          <h2>{dataDetail.name}</h2>
          <div className="infoTitleRight">
            <div className="comment">
              {dataDetail.rating < 9.5 ? "傑出" : "精緻好評"}
              <br />
              <p>{dataDetail.comments}則評論</p>
            </div>
            <button className="rate">{dataDetail.rating}</button>
          </div>
        </div>
        <div className="infoDes">
          <a href="#">{dataDetail.distance}</a>
          <span>免費專機接送</span>

          <div className="infoDetail">
            <div className="detailLeft">
              <p>標準單人房/共用衛浴</p>
              <p>一張單人床</p>
              <p>免費取消</p>
              <p>立即搶下優惠價-可取消</p>
              <p>此價格的客房在本站僅剩1間</p>
            </div>
            <div className="detailRight">
              <p className="optionDes">
                {DatesLength == 0 ? (
                  <>請先選擇住宿日期</>
                ) : (
                  `總共${DatesLength}晚`
                )}
                <br />
                {conditions.adult}位大人{" "}
                {conditions.children != 0 && `、${conditions.children}位小孩`}
              </p>
              <p className="price">
                {" "}
                {DatesLength == 0
                  ? `TWD ${dataDetail.cheapestPrice} 價格`
                  : `TWD ${totalHotelsPrice} 價格`}
              </p>
              <p>含稅費與其他費用</p>
              {DatesLength == 0 ? (
                <ItemTooltip
                  title="請先輸入住宿日期，並按左側 搜尋 查看結果"
                  followCursor
                >
                  <button className="btn">查看客房供應情況</button>
                </ItemTooltip>
              ) : (
                <Link to={`/hotels/${dataDetail._id}`}>
                  <button className="btn">查看客房供應情況</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
