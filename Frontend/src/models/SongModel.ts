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