import { Meni } from "./meni.js";
import { Pice } from "./pice.js";

export class Narudzbina{

    constructor(meniRef){
        this.pica = [];
        this.meniRef = meniRef;
    }

    dodajPice(p){
        this.pica.push(p);
    }
    ukloniPice(pice){
        this.pica.filter(p=> p.Naziv !== pice.Naziv && 
            p.Cena !== pice.Cena);
    }

    izracunajSumu(){
        let suma = 0;
        this.pica.foreach(  (pice) => {
            suma+= pice.cena;
        })
        console.log("Racun je: " + suma);
        return suma;
    }

    platiRacun(){
        let s = this.izracunajSumu();
        delete this.pica;
        this.pica = [];
        return s;
    }
}