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

export const updateBoard = async (boardId: number, newTitle: string) => {
  const db = await initDB();
  const board = await db.get("Board", boardId);

  if (board) {
    board.title = newTitle;
    return db.put("Board", board);
  }
};

export const deleteBoard = async (boardId: number) => {
  const db = await initDB();
  await db.delete("Board", boardId);

  const allSchedules = await db.getAll("Schedule");
  const schedulesToDelete = allSchedules.filter(
    (schedule) => schedule.boardId === boardId
  );

  const tx = db.transaction("Schedule", "readwrite");
  const store = tx.objectStore("Schedule");

  for (const schedule of schedulesToDelete) {
    store.delete(schedule.id);
  }

  return tx.done;
};

export const addSchedule = async (boardId: number, content: string) => {
  const db = await initDB();
  return db.add("Schedule", { boardId, content });
};

export const updateSchedule = async (
  scheduleId: number,
  newContent: string
) => {
  const db = await initDB();
  const schedule = await db.get("Schedule", scheduleId);

  if (schedule) {
    schedule.content = newContent;
    return db.put("Schedule", schedule);
  }
};

export const deleteSchedule = async (scheduleId: number) => {
  const db = await initDB();
  await db.delete("Schedule", scheduleId);
};

export const getBoard = async () => {
  const db = await initDB();
  const allSchedules = await db.getAll("Board");
  return allSchedules;
};

export const getSchedulesByBoard = async (boardId: number) => {
  const db = await initDB();
  const allSchedules = await db.getAll("Schedule");
  return allSchedules.filter((schedule) => schedule.boardId === boardId);
};
