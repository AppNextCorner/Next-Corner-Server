import { Document} from "mongoose"

export interface Ilocation extends Document {
    longitude: number;
    latitude: number;
}