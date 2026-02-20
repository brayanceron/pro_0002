import type { GenericModel } from "./GenericModel";

export type SongModel = {
    description: string,
    // gender_id: string,
    gender_id: string | GenericModel,
    goal: string,
    id: string,
    image: string,
    name: string,
    url: string,
    user_id: string,
}

export interface ExtendedGeneric {
    id : string,
    name : string,
    description : string,
    available : number,
    image : string,
    user_id : string,
    score : number,
}
interface ExtendedSenses extends ExtendedGeneric {
    goal : number,
}
export interface SongModelExtended extends SongModel {
    genders : ExtendedGeneric[],
    singers : ExtendedGeneric[],
    languages: ExtendedGeneric[],
    senses: ExtendedSenses [], 
}