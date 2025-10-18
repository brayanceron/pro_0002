import { createContext } from "react";
import type { SongModel } from "../models/SongModel";

export interface Base {
    playList: SongModel[],
    isLoading: boolean,
    error: Error | null,
    currentIndex: number,
}

export interface BaseOptional {
    playList?: SongModel[],
    isLoading?: boolean,
    error?: Error | null,
    currentIndex?: number,
}


// export type PlayListContextType = {
export interface PlayListContextType extends Base {
    setPlayList: ({ playList, isLoading, error, currentIndex }: BaseOptional) => void
    setCurrentIndex : (newIndex : number) => void
}

const defaultValues = {
    playList: [],
    isLoading: false,
    error: null,
    setPlayList: (_: any) => { },
    currentIndex : -1,
    setCurrentIndex: (_: any) => { },
}

export const PlayListContext = createContext<PlayListContextType>(defaultValues);
// export const PlayListContext = createContext<PlayListContextType | null>(null);
// export const PlayListContext = createContext(null);
