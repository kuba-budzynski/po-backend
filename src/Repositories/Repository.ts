import {getModelForClass as getRepository} from "@typegoose/typegoose";
import Druzyna from "../Models/DruzynaModel";
import Sesja from "../Models/SesjaModel";
import Zadanie from "../Models/ZadanieModel";
import Rozwiazanie from "../Models/RozwiazanieModel";
import SedziaGlowny from "../Models/SedziaGlownyModel";
import SedziaZadania from "../Models/SedziaZadaniaModel";
import Watek from "../Models/WatekModel";
import Administrator from "../Models/AdministratorModel";
import Ranking from "../Models/RankingModel";

class RepositoryClass {
    AdministratorRepo =     getRepository(Administrator);
    RankingRepo =           getRepository(Ranking);
    SesjaRepo =             getRepository(Sesja);
    DruzynaRepo =           getRepository(Druzyna);
    ZadanieRepo =           getRepository(Zadanie);
    RozwiazanieRepo =       getRepository(Rozwiazanie);
    SedziaGlownyRepo =      getRepository(SedziaGlowny);
    SedziaZadaniaRepo =     getRepository(SedziaZadania);
    WatekRepo =             getRepository(Watek);
}

const Repository = new RepositoryClass()
export default Repository
