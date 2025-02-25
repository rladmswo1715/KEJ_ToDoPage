import { createContext, useContext, useEffect, useState } from "react";
import { getTodoList } from "@/utils/indexedDB";
import { IBoard } from "@/types/board";

interface TodoListContextType {
  list: IBoard[];
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
    console.log("getTodoList::", data);
    setList(data);
  };

  useEffect(() => {
    refetchList();
  }, []);

  return (
    <TodoListContext.Provider value={{ list, refetchList }}>
      {children}
    </TodoListContext.Provider>
  );
};

export const useTodoListContext = () => {
  const context = useContext(TodoListContext);
  if (!context) throw new Error("컨텍스트 에러");
  return context;
};
