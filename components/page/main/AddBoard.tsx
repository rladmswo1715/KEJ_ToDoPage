import Button from "@/components/common/Button";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import BoardTitleInput from "./BoardTitleInput";

const AddBoard = () => {
  const [isCreating, setCreating] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");

  return (
    <>
      {isCreating ? (
        <BoardTitleInput
          type="create"
          setCreateState={setCreating}
          setTitleValue={setBoardTitle}
          titleValue={boardTitle}
        />
      ) : (
        <Button onClick={() => setCreating(true)}>
          <span>보드 생성</span>
          <AiOutlinePlusCircle size={24} color="orange" />
        </Button>
      )}
    </>
  );
};

export default AddBoard;
