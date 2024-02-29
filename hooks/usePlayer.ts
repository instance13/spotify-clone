import { create } from "zustand";

interface PlayerStore {
  ids: string[]; // various songs in a playlist! 
  activeId?: string; // the current song playing
  setId: (id: string) => void; // change song playing
  setIds: (ids: string[]) => void; // change playlist ?
  reset: () => void; // stop
};

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activeId: undefined }),
}));

export default usePlayer;