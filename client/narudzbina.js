import { Pice } from "./pice.js";
import { Kafa } from "./kafa.js";

export class Narudzbina{

    constructor(){
        this.pica = {};
    }

    dodajPice(p){
        this.pica.push(p);
    }
    ukloniPice(index){
        if(index < this.pica.length() && index >= 0){
            this.pica.splice(index, 1);
        }
        else{
            alert("Indeks je van granica niza.");
        }
    }

    izracunajSumu(){
        let suma = 0;
        this.pica.foreach(  (pice) => {
            suma+= pice.cena;
        })
        console.log("Racun je: " + suma);
        return suma;
    }
}