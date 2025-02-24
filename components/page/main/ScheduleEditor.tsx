import Button from "@/components/common/Button";
import React, { useEffect, useRef, useState } from "react";
import { useScheduleContext } from "@/contexts/ScheduleContext";
import { addSchedule, updateSchedule } from "@/utils/indexedDB";

interface ScheduleEditorProps {
  type: "create" | "edit";
  boardId: number;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  scheduleId?: number;
  contentText?: string;
}

const ScheduleEditor = ({
  type,
  boardId,
  setState,
  scheduleId,
  contentText,
}: ScheduleEditorProps) => {
  const [text, setText] = useState(contentText || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { refetchSchedules } = useScheduleContext();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "3rem";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleSaveSchedule = async () => {
    if (!text.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    if (type === "create") {
      await addSchedule(boardId, text);
      setText("");
    } else if (type === "edit" && scheduleId) {
      await updateSchedule(scheduleId, text);
    }

    setState(false);
    refetchSchedules(boardId);
  };

  return (
    <div
      className={`flex justify-between items-center ${
        type === "create" && "mt-4"
      }`}
    >
      <textarea
        ref={textareaRef}
        className="px-2 py-3 w-[89%] h-[3rem] rounded-md resize-none overflow-hidden"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        className="px-1 py-2 text-xs text-var-primary-400"
        onClick={handleSaveSchedule}
      >
        저장
      </Button>
    </div>
  );
};

export default ScheduleEditor;
