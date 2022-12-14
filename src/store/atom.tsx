import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

// export interface IToDoState {
//   id: number;
//   title: string;
//   toDos: ITodo[];
// }

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    to_do: [],
    doing: [],
    done: [],
  },
});

// export const toDoState = atom<IToDoState[]>({
//   key: "toDo",
//   default: [
//     {
//       id: 1, //boardId
//       title: "todo", //카테고리 제목
//       toDos: [], //해당 카테고리에 할일 들
//     },
//     {
//       id: 2,
//       title: "doing",
//       toDos: [],
//     },
//     {
//       id: 3,
//       title: "done",
//       toDos: [],
//     },
//   ],
//   effects_UNSTABLE: [persistAtom],
// });
