import { IBoard } from "@/types/board";
import { ISchedule } from "@/types/schedule";
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

  const boards = await db.getAll("Board");
  const newOrder = boards.length + 1;

  return db.add("Board", { title, order: newOrder });
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
  const schedules = await db.getAll("Schedule");

  const lastOrder = schedules
    .filter((item) => item.boardId === boardId)
    .reduce((max, item) => Math.max(max, item.order), 1);

  return db.add("Schedule", { boardId, content, order: lastOrder + 1 });
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

export const getTodoList = async () => {
  const db = await initDB();
  const boards = await db.getAll("Board");
  const schedules = await db.getAll("Schedule");

  return boards.map((board) => ({
    ...board,
    schedules: schedules.filter((schedule) => schedule.boardId === board.id),
  }));
};

export const saveBoardOrder = async (newBoard: IBoard[]) => {
  const db = await initDB();
  const tx = db.transaction("Board", "readwrite");
  const store = tx.objectStore("Board");

  for (let i = 0; i < newBoard.length; i++) {
    const board = { ...newBoard[i], order: i };
    await store.put(board);
  }

  await tx.done;
};

export const saveScheduleOrder = async (
  boardId: number,
  newSchedules: ISchedule[]
) => {
  const db = await initDB();
  const tx = db.transaction("Schedule", "readwrite");
  const store = tx.objectStore("Schedule");

  const existingSchedules = await store.getAll();
  existingSchedules.forEach(async (schedule) => {
    if (schedule.boardId === boardId) {
      await store.delete(schedule.id);
    }
  });

  for (let i = 0; i < newSchedules.length; i++) {
    const schedule = { ...newSchedules[i], order: i };
    await store.put(schedule);
  }

  return tx.done;
};
