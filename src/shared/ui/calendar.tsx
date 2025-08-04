"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/src/shared/lib/utils";
import { buttonVariants } from "@/src/shared/ui/button";
import { ko } from "date-fns/locale/ko";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const today = new Date();
  const disabledDates = [today];
  const currentMonth = new Date(today.getFullYear(), today.getMonth());
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);

  for (let i = 31; i >= 1; i--) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);
    disabledDates.push(pastDate);
  }

  return (
    <DayPicker
      selected={undefined}
      locale={ko}
      fromMonth={currentMonth}
      toMonth={nextMonth}
      disabled={disabledDates}
      showOutsideDays={showOutsideDays}
      className={cn("px- py-4 w-full", className)} // width 100%로 설정하여 부모 컨테이너에 맞춰 크기 조정
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full", // 반응형 레이아웃 적용
        month: "space-y-4 w-full", // 월의 크기를 자동으로 맞춤
        caption: "flex justify-center pt-1 relative items-center w-full", // 캡션 너비 100% 설정
        caption_label: "text-base font-medium", // 글자 크기 유지
        nav: "space-x-1 flex items-center", // 네비게이션 버튼을 부모 너비에 맞춤
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1", // 테이블 너비 100%로 설정
        head_row: "flex w-full", // 헤더 로우를 가로로 맞춤
        head_cell:
          "text-muted-foreground rounded-md w-10 font-normal text-[0.9rem] flex-grow", // 컬럼 너비를 유동적으로 설정
        row: "flex w-full mt-2",
        cell: cn(
          "flex flex-grow px-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 font-normal aria-selected:opacity-100 flex flex-grow justify-center items-center", // 날짜를 셀 중앙에 배치
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          //"",
          day_today: "",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({}) => <ChevronLeft className="h-5 w-5" />,
        IconRight: ({}) => <ChevronRight className="h-5 w-5" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
