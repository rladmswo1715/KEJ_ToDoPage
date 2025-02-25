import ScheduleActionMenu from "./ScheduleActionMenu";
import { ISchedule } from "@/types/schedule";
import { useState } from "react";
import ScheduleEditor from "./ScheduleEditor";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ScheduleItemProps {
  scheduleData: ISchedule;
  boardId: number;
}

const ScheduleItem = ({ scheduleData, boardId }: ScheduleItemProps) => {
  const [isEditing, setEditing] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: scheduleData.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="flex items-center gap-3"
        >
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
