import {prop} from "@typegoose/typegoose";
import SedziaZadania from "./SedziaZadaniaModel";

class Test {
    @prop({required: true})
    public daneWejsciowe!: string

    @prop({required: true})
    public daneWyjsciowe!: string

    @prop({required: true})
    public limitCzasowy!: number

}

export default class Zadanie {
    @prop({ref: SedziaZadania})
    public sedzia?: SedziaZadania

    @prop({required: true})
    public tresc!: string

    @prop({required: true})
    public nazwa!: string

    @prop({required: true})
    public numer!: number

    @prop({required: true, ref: Test, default: []})
    public testy!: Test[]
}
