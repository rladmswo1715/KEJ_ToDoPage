import { MdOutlineModeEdit, MdOutlineDeleteForever } from "react-icons/md";
import BoardTitleContainer from "./BoardTitleContainer";

const BoardList = () => {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col p-4 bg-gray-200 min-w-[28rem] min-h-[40rem] rounded-lg gap-6">
        <BoardTitleContainer />

        <div className="flex flex-col">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="px-2 py-3 w-[90%] min-h-[3rem] bg-white rounded-md">
                <p className="text-base font-medium">코딩하기</p>
              </div>
              <div className="flex items-center gap-1">
                <button>
                  <MdOutlineModeEdit />
                </button>
                <button>
                  <MdOutlineDeleteForever />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center border-2 border-var-primary-300 w-[28rem] h-[40rem] rounded-lg">
        <span className="text-black/40 font-medium">
          등록된 보드가 없어요..!
        </span>
      </div>
    </div>
  );
};

export default BoardList;
