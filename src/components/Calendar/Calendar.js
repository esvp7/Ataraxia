import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from "./context/GlobalContext";
import { getMonth } from "./util";
import CalendarHeader from "./CalendarHeader";
import EventModal from "./EventModal";
import Sidebar from "./Sidebar";
import Month from "./Month";


const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    document.title = `Calendar: Ataraxia`;
  });

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <div className="h-screen flex flex-col calendar-main-cont">
      <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth}/>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Calendar;