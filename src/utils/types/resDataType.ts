import { Timestamp } from "firebase/firestore";

export interface ResData{
    originalUrl: string | undefined;
    shortUrl: string;
    urlCreator: string;
    createdAt: Timestamp;
}


