import ScheduleAddContainer from "./ScheduleAddContainer";
import ScheduleItem from "./ScheduleItem";
import { ISchedule } from "@/types/schedule";

interface ScheduleContainerProps {
  boardId: number;
  schedulesData: ISchedule[];
}

const ScheduleContainer = ({
  boardId,
  schedulesData,
}: ScheduleContainerProps) => {
  const renderEmptySchedule = (
    <div className="px-2 py-3 w-full min-h-[3rem] bg-gray-200 border-2 border-var-primary-300 rounded-md">
      <p className="text-base font-semibold text-center">
        + 버튼을 눌러 일정을 추가 하세요!
      </p>
    </div>
  );
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-3">
        {schedulesData.length > 0
          ? schedulesData.map((schedule) => {
              return (
                <ScheduleItem
                  key={schedule.id}
                  scheduleData={schedule}
                  boardId={boardId}
                />
              );
            })
          : renderEmptySchedule}
      </div>
      <ScheduleAddContainer boardId={boardId} />
    </div>
  );
};

export default ScheduleContainer;
