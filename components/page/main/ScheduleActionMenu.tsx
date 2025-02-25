import { useTodoListContext } from "@/contexts/TodoListContext";
import { deleteSchedule } from "@/utils/indexedDB";
import { MdOutlineDeleteForever, MdOutlineModeEdit } from "react-icons/md";

interface ScheduleActionMenuProps {
  boardId: number;
  scheduleId: number;
  setEditState: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScheduleActionMenu = ({
  scheduleId,
  setEditState,
}: ScheduleActionMenuProps) => {
  const { refetchList } = useTodoListContext();

  const handleEditClick = () => setEditState(true);

  const handleDeleteClick = () => {
    if (!confirm("정말 삭제하시겠어요?")) return;

    deleteSchedule(scheduleId);
    refetchList();
  };

  const actionOptions = [
    {
      key: "edit",
      renderIcon: <MdOutlineModeEdit />,
      clickEvent: handleEditClick,
    },
    {
      key: "delete",
      renderIcon: <MdOutlineDeleteForever />,
      clickEvent: handleDeleteClick,
    },
  ];

  return (
    <div className="flex items-center gap-1">
      {actionOptions.map((option) => {
        return (
          <button type="button" key={option.key} onClick={option.clickEvent}>
            {option.renderIcon}
          </button>
        );
      })}
    </div>
  );
};

export default ScheduleActionMenu;
