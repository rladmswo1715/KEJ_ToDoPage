import { useTodoListContext } from "@/contexts/TodoListContext";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import SortableBoard from "./SortableBoard";
import { saveBoardOrder } from "@/utils/indexedDB";

const BoardList = () => {
  const { list, setList, refetchList } = useTodoListContext();

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = list.findIndex((item) => item.id === active.id);
    const newIndex = list.findIndex((item) => item.id === over.id);

    const newOrder = arrayMove(list, oldIndex, newIndex);
    setList(newOrder);

    await saveBoardOrder(newOrder);
    refetchList();
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext items={list.map((item) => item.id)}>
        <div className="flex gap-5 items-start">
          {list.length > 0 ? (
            list.map((listItem) => (
              <SortableBoard key={listItem.id} listItem={listItem} />
            ))
          ) : (
            <div className="flex justify-center items-center border-2 border-var-primary-300 w-[28rem] h-[40rem] rounded-lg">
              <span className="text-black/40 font-medium">
                등록된 보드가 없어요..!
              </span>
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default BoardList;
