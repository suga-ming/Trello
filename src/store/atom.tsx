import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "trelloLocal",
  storage: localStorage,
});

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    to_do: [],
    doing: [],
    done: [],
  },
  // effects_UNSTABLE: [persistAtom],
});
