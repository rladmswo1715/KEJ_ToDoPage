import { useScheduleContext } from "@/contexts/ScheduleContext";
import ScheduleAddContainer from "./ScheduleAddContainer";
import ScheduleItem from "./ScheduleItem";

interface ScheduleContainerProps {
  boardId: number;
}

const ScheduleContainer = ({ boardId }: ScheduleContainerProps) => {
  const { schedules } = useScheduleContext();

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
        {schedules.length > 0
          ? schedules.map((schedule) => {
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
