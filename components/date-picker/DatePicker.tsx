"use client";

import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import { DateObject } from "react-multi-date-picker";

interface CalendarProps {
  onDateChange: (date: string) => void;
}

const CalendarComponent: React.FC<CalendarProps> = ({ onDateChange }) => {
  const [date, setDate] = useState<DateObject | null>(null);

  const nextWeek = new DateObject({ calendar: persian }).add(7, "days");
  const oneMonthFromNow = new DateObject({ calendar: persian }).add(1, "month");

  const handleDateChange = (selectedDate: DateObject | null) => {
    setDate(selectedDate);

    if (selectedDate) {
      const isoDate = selectedDate.convert(gregorian).toDate().toISOString();
      onDateChange(isoDate);
    } else {
      onDateChange(""); 
    }
  };

  return (
    <div className="w-full border-none border-b-[1px] pb-2 pr-1 border-transparent bg-gradient-to-r from-[rgb(160,145,253)] to-[rgb(96,141,239)] bg-no-repeat bg-[length:100%_2px] bg-bottom focus:outline-none placeholder:text-xs mb-2">
      <DatePicker
        value={date}
        onChange={handleDateChange}
        calendar={persian}
        locale={persian_fa}
        placeholder="تاریخ ارسال را انتخاب کنید"
        minDate={nextWeek}
        maxDate={oneMonthFromNow}
        inputClass="border-none placeholder:text-xs"
      />
    </div>
  );
};

export default CalendarComponent;
