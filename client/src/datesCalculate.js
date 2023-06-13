export const ReservationDatesAndPrice = (
  startDate,
  endDate,
  hotelsPrice,
  roomsPrice
) => {
  const MSecond_per_day = 1000 * 86400;
  const DatesLength =
    (Math.abs(endDate?.getTime() - startDate?.getTime()) || 0) /
    MSecond_per_day;
  const totalHotelsPrice = DatesLength * hotelsPrice || 0;
  const totalRoomsPrice = DatesLength * roomsPrice || 0;
  return { DatesLength, totalHotelsPrice, totalRoomsPrice };
};

//會影響到全域變數
export const ReservationDatesList = (startDate, endDate) => {
  const recordDate = new Date(startDate);
  //須多new Date在宣告一次，不然會影響到startDate全域變數的值
  const stopRecord = new Date(endDate);
  const datesList = [];
  while (recordDate <= stopRecord) {
    datesList.push(recordDate.getTime());
    recordDate.setDate(recordDate.getDate() + 1);
  }
  return { datesList };
};
