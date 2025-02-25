import { useSortable } from "@dnd-kit/sortable";
import BoardTitleContainer from "./BoardTitleContainer";
import ScheduleContainer from "./ScheduleContainer";
import { IBoard } from "@/types/board";
import { CSS } from "@dnd-kit/utilities";

interface SortableboardProps {
  listItem: IBoard;
}

const SortableBoard = ({ listItem }: SortableboardProps) => {
  const { id, title, schedules } = listItem;
  const boardId = `board-${id}`;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: boardId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col p-4 mb-[12.5rem] bg-gray-200 min-w-[28rem] h-[40rem] rounded-lg gap-6"
    >
      <BoardTitleContainer boardId={id} title={title} />
      <ScheduleContainer boardId={id} schedulesData={schedules} />
    </div>
  );
};

export default SortableBoard;
