import { openDB } from "idb";

export const initDB = async () => {
  return openDB("EJTodo", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("Board")) {
        db.createObjectStore("Board", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("Schedule")) {
        db.createObjectStore("Schedule", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

export const addBoard = async (title: string) => {
  const db = await initDB();
  return db.add("Board", { title });
};

export const updateBoard = async (id: number, newTitle: string) => {
  const db = await initDB();
  const board = await db.get("Board", id);

  if (board) {
    board.title = newTitle;
    return db.put("Board", board);
  }
};

export async function deleteBoard(boardId: number) {
  const db = await initDB();
  await db.delete("Board", boardId);
}

export const addSchedule = async (
  boardId: number,
  title: string,
  description: string,
  date: string
) => {
  const db = await initDB();
  return db.add("Schedule", { boardId, title, description, date });
};

export async function getSchedulesByBoard() {
  const db = await initDB();
  const allSchedules = await db.getAll("Board");
  return allSchedules;
}
