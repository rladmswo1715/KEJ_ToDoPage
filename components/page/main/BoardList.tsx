import BoardTitleContainer from "./BoardTitleContainer";
import { useBoardContext } from "@/contexts/BoardContext";
import ScheduleContainer from "./ScheduleContainer";
import { ScheduleProvider } from "@/contexts/ScheduleContext";

const BoardList = () => {
  const { list } = useBoardContext();

  return (
    <div className="flex gap-5 items-start">
      {list.length > 0 ? (
        list.map((listItem) => (
          <ScheduleProvider key={listItem.id} boardId={listItem.id}>
            <div
              key={listItem.id}
              className="flex flex-col p-4 mb-[12.5rem] bg-gray-200 min-w-[28rem] min-h-[4rem] rounded-lg gap-6"
            >
              <BoardTitleContainer
                boardId={listItem.id}
                title={listItem.title}
              />
              <ScheduleContainer boardId={listItem.id} />
            </div>
          </ScheduleProvider>
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
