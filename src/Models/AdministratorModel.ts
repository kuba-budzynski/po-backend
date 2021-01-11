import {User} from "./utils/CommonUtils";
import {modelOptions} from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: 'administratorzy' } })
export default class Administrator extends User { }
