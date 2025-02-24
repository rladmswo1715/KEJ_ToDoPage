import ScheduleActionMenu from "./ScheduleActionMenu";
import { ISchedule } from "@/types/schedule";
import { useState } from "react";
import ScheduleEditor from "./ScheduleEditor";

interface ScheduleItemProps {
  scheduleData: ISchedule;
  boardId: number;
}

const ScheduleItem = ({ scheduleData, boardId }: ScheduleItemProps) => {
  const [isEditing, setEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <ScheduleEditor
          type="edit"
          boardId={boardId}
          setState={setEditing}
          scheduleId={scheduleData.id}
          contentText={scheduleData.content}
        />
      ) : (
        <div className="flex items-center gap-3">
          <div className="px-2 py-3 w-[90%] min-h-[3rem] bg-white rounded-md">
            <p className="text-base font-medium whitespace-pre-line">
              {scheduleData.content}
            </p>
          </div>
          <ScheduleActionMenu
            boardId={boardId}
            scheduleId={scheduleData.id}
            setEditState={setEditing}
          />
        </div>
      )}
    </>
  );
};

export default ScheduleItem;
