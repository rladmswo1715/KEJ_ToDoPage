import Button from "@/components/common/Button";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import BoardTitleInput from "./BoardTitleInput";

const AddBoard = () => {
  const [isCreating, setCreating] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const inputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isCreating && inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isCreating]);

  return (
    <>
      {isCreating ? (
        <div ref={inputRef}>
          <BoardTitleInput
            type="create"
            setCreateState={setCreating}
            setTitleValue={setBoardTitle}
            titleValue={boardTitle}
          />
        </div>
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
