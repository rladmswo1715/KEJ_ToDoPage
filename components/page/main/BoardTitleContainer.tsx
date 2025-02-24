import Kebab from "@/components/common/kebab/Kebab";
import BoardTitleInput from "./BoardTitleInput";
import { useState } from "react";

const BoardTitleContainer = () => {
  const [isTitleEditing, setTitleEditing] = useState(false);
  const [titleValue, setTitleValue] = useState("zz");

  const handleEditBoardClick = () => setTitleEditing((prev) => !prev);

  const handleDeleteBoard = () => {
    console.log("보드 삭제");
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
        />
      ) : (
        <div className="flex justify-between items-center min-h-[3rem]">
          <span className="text-xl font-semibold">대기 중</span>
          <Kebab itemOptions={kebabOptions} />
        </div>
      )}
    </>
  );
};

export default BoardTitleContainer;
