import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import ScheduleAddContainer from "./ScheduleAddContainer";
import ScheduleItem from "./ScheduleItem";
import { ISchedule } from "@/types/schedule";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useTodoListContext } from "@/contexts/TodoListContext";
import { saveScheduleOrder } from "@/utils/indexedDB";

interface ScheduleContainerProps {
  boardId: number;
  schedulesData: ISchedule[];
}

const ScheduleContainer = ({
  boardId,
  schedulesData,
}: ScheduleContainerProps) => {
  const { list, setList } = useTodoListContext();

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = schedulesData.findIndex((item) => item.id === active.id);
    const newIndex = schedulesData.findIndex((item) => item.id === over.id);

    const newOrder = arrayMove(schedulesData, oldIndex, newIndex).map(
      (schedule, index) => ({
        ...schedule,
        order: index,
      })
    );

    const updatedBoards = list.map((board) => {
      if (board.id === boardId) {
        return { ...board, schedules: newOrder };
      }
      return board;
    });

    setList(updatedBoards);
    saveScheduleOrder(boardId, newOrder);
  };

  const renderEmptySchedule = (
    <div className="px-2 py-3 w-full min-h-[3rem] bg-gray-200 border-2 border-var-primary-300 rounded-md">
      <p className="text-base font-semibold text-center">
        + 버튼을 눌러 일정을 추가 하세요!
      </p>
    </div>
  );
  return (
    <div className="flex flex-col" onPointerDown={(e) => e.stopPropagation()}>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <SortableContext items={schedulesData.map((item) => item.id)}>
          <div className="flex flex-col gap-3">
            {schedulesData.length > 0
              ? [...schedulesData]
                  .sort((a, b) => a.order - b.order)
                  .map((schedule) => {
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
        </SortableContext>
      </DndContext>
      <ScheduleAddContainer boardId={boardId} />
    </div>
  );
};

export default ScheduleContainer;
