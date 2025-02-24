import { createContext, useContext, useState, useEffect } from "react";
import { getSchedulesByBoard } from "@/utils/indexedDB";
import { ISchedule } from "@/types/schedule";

interface ScheduleContextType {
  schedules: ISchedule[];
  refetchSchedules: (boardId: number) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined
);

export const ScheduleProvider = ({
  children,
  boardId,
}: {
  children: React.ReactNode;
  boardId: number;
}) => {
  const [schedules, setSchedules] = useState<ISchedule[]>([]);

  const refetchSchedules = async (boardId: number) => {
    const scheduleList = await getSchedulesByBoard(boardId);
    setSchedules(scheduleList);
  };

  useEffect(() => {
    refetchSchedules(boardId);
  }, [boardId]);

  return (
    <ScheduleContext.Provider value={{ schedules, refetchSchedules }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useScheduleContext = () => {
  const context = useContext(ScheduleContext);
  if (!context) throw new Error("컨텍스트에러");
  return context;
};
