import {prop} from "@typegoose/typegoose";
import Druzyna from "./DruzynaModel";

export default class Ranking {
    @prop({required: true, default: false})
    public czyZamrozony!: boolean

    @prop({required: true, ref: Druzyna, default: []})
    public druzyny!: Druzyna[]
}
