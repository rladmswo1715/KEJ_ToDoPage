import Kebab from "@/components/common/kebab/Kebab";
import BoardTitleInput from "./BoardTitleInput";
import { useState } from "react";
import { deleteBoard } from "@/utils/indexedDB";
import { useBoardContext } from "@/contexts/BoardContext";

interface BoardTitleContainerProps {
  boardId: number;
  title: string;
}

const BoardTitleContainer = ({ title, boardId }: BoardTitleContainerProps) => {
  const [isTitleEditing, setTitleEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const { refetchList } = useBoardContext();

  const handleEditBoardClick = () => setTitleEditing((prev) => !prev);

  const handleDeleteBoard = async () => {
    await deleteBoard(boardId);
    refetchList();
  };

  const kebabOptions = [
    {
      key: "수정하기",
      clickEvent: handleEditBoardClick,
    },
    {
      key: "삭제하기",
      clickEvent: handleDeleteBoard,
    },
  ];

  return (
    <>
      {isTitleEditing ? (
        <BoardTitleInput
          type="edit"
          setCreateState={setTitleEditing}
          setTitleValue={setTitleValue}
          titleValue={titleValue}
          boardId={boardId}
        />
      ) : (
        <div className="flex justify-between items-center min-h-[3rem]">
          <span className="text-xl font-semibold">{title}</span>
          <Kebab itemOptions={kebabOptions} />
        </div>
      )}
    </>
  );
};

export default BoardTitleContainer;
