import { Meni } from "./meni.js";
import { Sto } from "./sto.js";

export class Kafeterija{
    
    constructor(k){
        /* Konstruktor prima objekat koji predstavlja kafeteriju, 
        informacije su povucene iz baze, u main-u. */
        
        this.id = k.id;
        this.brStolova = parseInt(k.brojStolova);
        this.meni = new Meni(this, k.meni);
        this.naziv = k.naziv;
        this.kontejner = null;
        this.stolovi = [];
        for(let i=0;i<this.brStolova;i++){
            this.stolovi.push(new Sto(k.stolovi[i].id, i, this.meni, this.id));
        }
    }

    crtajKafeteriju(host){
        let naslov = document.createElement("h1");
        naslov.classList.add("naslov");
        naslov.innerHTML = this.naziv;
        host.appendChild(naslov);
        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("kafeterija");
        host.appendChild(this.kontejner);

        this.meni.prikaziMeni(this.kontejner);
        const sala = document.createElement("div");
        sala.classList.add("salaStolovi");
        this.kontejner.appendChild(sala);

        this.stolovi.forEach((sto) => {
            sto.crtajSto(sala);
        });
    }

    dodajStavkuSto(){
        this.stolovi.forEach((sto) => {
            sto.addStavkaMeniSto();
        });
    }
    ukloniStavkuSto(index){
        this.stolovi.forEach((sto) => {
            sto.removeStavkaMeniSto(index);
        });
    }
    azurirajStavkuSto(index, stavka){
        this.stolovi.forEach((sto) => {
            sto.updateStavkaMeniSto(index, stavka);
        });
    }
}