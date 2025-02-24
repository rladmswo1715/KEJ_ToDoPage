import { useState } from "react";
import { MdAdd } from "react-icons/md";
import ScheduleEditor from "./ScheduleEditor";

interface ScheduleAddContainerProps {
  boardId: number;
}

const ScheduleAddContainer = ({ boardId }: ScheduleAddContainerProps) => {
  const [isCreating, setCreating] = useState(false);

  return (
    <>
      {isCreating ? (
        <ScheduleEditor
          type="create"
          boardId={boardId}
          setState={setCreating}
        />
      ) : (
        <button
          type="button"
          className="mx-auto mt-4"
          onClick={() => setCreating(true)}
        >
          <MdAdd className="hover:text-var-primary-500" size={28} />
        </button>
      )}
    </>
  );
};

export default ScheduleAddContainer;
