import {modelOptions, prop, Ref} from "@typegoose/typegoose";
import SedziaZadania from "./SedziaZadaniaModel";

class Test {
    @prop({required: true})
    public daneWejsciowe!: string

    @prop({required: true})
    public daneWyjsciowe!: string

    @prop({required: true})
    public limitCzasowy!: number

}

@modelOptions({ schemaOptions: { collection: 'zadania' } })
export default class Zadanie {
    @prop({ref: `SedziaZadania`})
    public sedzia?: Ref<SedziaZadania>

    @prop({required: true})
    public tresc!: string

    @prop({required: true})
    public nazwa!: string

    @prop({required: true})
    public numer!: number

    @prop({required: true, default: [], type: [Test]})
    public testy!: Test[]
}
