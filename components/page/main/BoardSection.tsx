"use client";

import { BoardProvider } from "@/contexts/BoardContext";
import AddBoard from "./AddBoard";
import BoardList from "./BoardList";

const BoardSection = () => {
  return (
    <BoardProvider>
      <section className="flex items-start gap-10">
        <BoardList />
        <AddBoard />
      </section>
    </BoardProvider>
  );
};

export default BoardSection;
