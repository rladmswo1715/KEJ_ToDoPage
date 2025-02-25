import BoardTitleContainer from "./BoardTitleContainer";
import { useTodoListContext } from "@/contexts/TodoListContext";
import ScheduleContainer from "./ScheduleContainer";

const BoardList = () => {
  const { list } = useTodoListContext();

  return (
    <div className="flex gap-5 items-start">
      {list.length > 0 ? (
        list.map((listItem) => (
          <div
            key={listItem.id}
            className="flex flex-col p-4 mb-[12.5rem] bg-gray-200 min-w-[28rem] min-h-[4rem] rounded-lg gap-6"
          >
            <BoardTitleContainer boardId={listItem.id} title={listItem.title} />
            <ScheduleContainer
              boardId={listItem.id}
              schedulesData={listItem.schedules}
            />
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center border-2 border-var-primary-300 w-[28rem] h-[40rem] rounded-lg">
          <span className="text-black/40 font-medium">
            등록된 보드가 없어요..!
          </span>
        </div>
      )}
    </div>
  );
};

export default BoardList;
