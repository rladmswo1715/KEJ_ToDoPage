"use client";

import { TodoListProvider } from "@/contexts/TodoListContext";
import AddBoard from "./AddBoard";
import BoardList from "./BoardList";

const BoardSection = () => {
  return (
    <TodoListProvider>
      <section className="flex items-start gap-10">
        <BoardList />
        <AddBoard />
      </section>
    </TodoListProvider>
  );
};

export default BoardSection;
