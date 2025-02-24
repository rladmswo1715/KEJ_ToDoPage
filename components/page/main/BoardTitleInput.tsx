import Button from "@/components/common/Button";
import { ETitleSaveButtonText } from "@/types/enum";

interface AddBoardInputBoxProps {
  type: "create" | "edit";
  setCreateState: React.Dispatch<React.SetStateAction<boolean>>;
  setTitleValue: React.Dispatch<React.SetStateAction<string>>;
  titleValue: string;
}

const BoardTitleInput = ({
  type,
  setCreateState,
  setTitleValue,
  titleValue,
}: AddBoardInputBoxProps) => {
  const handleSaveClick = () => {
    setCreateState(false);
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
        className={`border-2 border-var-primary-300 rounded-lg text-xl focus:outline-none ${inputStyle()}`}
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
