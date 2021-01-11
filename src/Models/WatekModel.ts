import {prop, Ref} from "@typegoose/typegoose";
import Zadanie from "./ZadanieModel";
import Sesja from "./SesjaModel";
import Druzyna from "./DruzynaModel";
import SedziaZadania from "./SedziaZadaniaModel";

abstract class Post {
    @prop({required: true})
    public tresc!: string

    @prop({required: true})
    public wyslano!: Date
}

class Pytanie extends Post {
    @prop({required: true, ref: Druzyna})
    public autor!: Druzyna
}

class Odpowiedz extends Post {
    @prop({required: true, ref: SedziaZadania})
    public autor!: SedziaZadania
}

export default class Watek {
    @prop({required: true, ref: Zadanie})
    public zadanie!: Ref<Zadanie>

    @prop({required: true, ref: Sesja})
    public sesja!: Ref<Sesja>

    @prop({required: true})
    public temat!: string

    @prop({required: true})
    public zalozono!: Date

    @prop({ref: Pytanie, required: true, default: []})
    pytania: Pytanie[]

    @prop({ref: Odpowiedz, required: true, default: []})
    odpowiedzi: Odpowiedz[]
}

