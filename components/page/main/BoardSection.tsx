"use client";

import AddBoard from "./AddBoard";
import BoardList from "./BoardList";

const BoardSection = () => {
  return (
    <section className="flex items-start gap-10">
      <BoardList />
      <AddBoard />
    </section>
  );
};

export default BoardSection;
