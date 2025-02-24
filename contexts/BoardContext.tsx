import { createContext, useContext, useState, useEffect } from "react";
import { getSchedulesByBoard } from "@/utils/indexedDB";
import { IBoard } from "@/types/board";

interface BoardContextType {
  list: IBoard[];
  refetchList: () => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [list, setList] = useState<IBoard[]>([]);

  const refetchList = async () => {
    const boardList = await getSchedulesByBoard();
    setList(boardList);
  };

  useEffect(() => {
    refetchList();
  }, []);

  return (
    <BoardContext.Provider value={{ list, refetchList }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) throw new Error("컨텍스트에러");
  return context;
};
