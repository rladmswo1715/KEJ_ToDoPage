import Button from "@/components/common/Button";
import { useBoardContext } from "@/contexts/BoardContext";
import { ETitleSaveButtonText } from "@/types/enum";
import { addBoard, updateBoard } from "@/utils/indexedDB";

interface AddBoardInputBoxProps {
  type: "create" | "edit";
  setCreateState: React.Dispatch<React.SetStateAction<boolean>>;
  setTitleValue: React.Dispatch<React.SetStateAction<string>>;
  titleValue: string;
  boardId?: number;
}

const BoardTitleInput = ({
  type,
  setCreateState,
  setTitleValue,
  titleValue,
  boardId,
}: AddBoardInputBoxProps) => {
  const { refetchList } = useBoardContext();

  const handleSaveClick = async () => {
    if (!titleValue.trim()) {
      alert("보드 제목을 입력해주세요.");
      return;
    }

    if (type === "create") await addBoard(titleValue);
    else if (type === "edit" && boardId) await updateBoard(boardId, titleValue);

    setCreateState(false);
    refetchList();
  };

  const handleCancelClick = () => {
    setTitleValue("");
    setCreateState(false);
  };

  const inputStyle = () => {
    switch (type) {
      case "create":
        return "px-4 py-2 w-[22.5rem]";
      case "edit":
        return "px-4 py-1 w-[20rem]";
      default:
        return "";
    }
  };

  return (
    <div className="flex gap-4">
      <input
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
        className={`shrink-0 border-2 border-var-primary-300 rounded-lg text-xl focus:outline-none ${inputStyle()}`}
        maxLength={16}
      />
      <div className="flex gap-2">
        <Button onClick={handleSaveClick}>{ETitleSaveButtonText[type]}</Button>
        {type === "create" && (
          <Button btnColor="gray" onClick={handleCancelClick}>
            취소
          </Button>
        )}
      </div>
    </div>
  );
};

export default BoardTitleInput;
