import {Document} from "mongoose";

export interface IOptionsLabel extends Document {
    label: string;
    selected: boolean;
    optionId: string;
}

export interface IOptions extends Document {
    name: string;
    type: string;
    optionCustomizations: IOptionsLabel[]

}