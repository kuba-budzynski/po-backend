import {prop} from "@typegoose/typegoose";
import {DaneLogowania} from "./utils/CommonUtils";

export default class Administrator {
    @prop({required: true})
    public daneLogowania!: DaneLogowania;
}
