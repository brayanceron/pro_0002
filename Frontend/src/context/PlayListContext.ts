import { createContext } from "react";
import type { SongModelExtended } from "../models/SongModel"; // import type { SongModel } from "../models/SongModel";

export interface Base {
    playList: SongModelExtended[], // playList: SongModel[],
    generatedBy : any,
    orderBy : OrderByType | null,
    isLoading: boolean,
    error: Error | null,
    currentIndex: number,
}

export interface BaseOptional {
    playList?: SongModelExtended[], // playList?: SongModel[],
    generatedBy? : any,
    orderBy? : OrderByType | null,
    isLoading?: boolean,
    error?: Error | null,
    currentIndex?: number,
}

export type CriterionValues = 'genders' | 'singers' | 'languages' | 'senses' | 'name' | 'goal'
export type OrderByType = {
    selectedCriterian : CriterionValues | null,
    desc : boolean,
}

// export type PlayListContextType = {
export interface PlayListContextType extends Base {
    setPlayList: ({ playList, isLoading, error, currentIndex, generatedBy, orderBy }: BaseOptional) => void
    setCurrentIndex : (newIndex : number) => void
}

const defaultValues = {
    playList: [],
    generatedBy : [],
    orderBy : null, // orderBy : {},
    isLoading: false,
    error: null,
    setPlayList: (_: any) => { },
    currentIndex : -1,
    setCurrentIndex: (_: any) => { },
}

export const PlayListContext = createContext<PlayListContextType>(defaultValues);
// export const PlayListContext = createContext<PlayListContextType | null>(null);
// export const PlayListContext = createContext(null);
