import React, { useContext } from "react";
import GlobalContext from "./context/GlobalContext";
import dayjs from "dayjs";

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <div className="flex items-center calendar-heading">
    <img src="/images/calendar3.png" alt="calendar" className="mr-2 w-12 h-12" />
    <h1 className="mr-10 text-lg text-gray-500 fond-bold calendar-title">
      Calendar
    </h1>
    <div className="calendar-flexEnd">
    <button
      onClick={handleReset}
      className="border rounded py-2 px-4 mr-5 text-sm calendar-button"
    >
      Today
    </button>
    <button onClick={handlePrevMonth}>
      <span className="cursor-pointer text-gray-600 mx-2">
      ❮
      </span>
    </button>
    <div className="calendar-date">
    <button onClick={handleNextMonth}>
      <span className="cursor-pointer text-gray-600 mx-2 mr-10">
      ❯
      <span className="calendar-date-title">
      {dayjs(new Date(dayjs().year(), monthIndex)).format(
          "MMMM YYYY"
        )}
        </span>
      </span>
    </button>
    </div>
    </div>
  </div>
  )
}

export default CalendarHeader