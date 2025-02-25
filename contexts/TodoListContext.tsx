import { createContext, useContext, useEffect, useState } from "react";
import { getTodoList } from "@/utils/indexedDB";
import { IBoard } from "@/types/board";

interface TodoListContextType {
  list: IBoard[];
  setList: React.Dispatch<React.SetStateAction<IBoard[]>>;
  refetchList: () => void;
}

const TodoListContext = createContext<TodoListContextType | undefined>(
  undefined
);

export const TodoListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [list, setList] = useState<IBoard[]>([]);

  const refetchList = async () => {
    const data = await getTodoList();
    setList(data.sort((a, b) => a.order - b.order));
  };

  useEffect(() => {
    refetchList();
  }, []);

  return (
    <TodoListContext.Provider value={{ list, setList, refetchList }}>
      {children}
    </TodoListContext.Provider>
  );
};

export const useTodoListContext = () => {
  const context = useContext(TodoListContext);
  if (!context) throw new Error("컨텍스트 에러");
  return context;
};
