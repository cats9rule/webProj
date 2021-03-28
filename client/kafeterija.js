import { Meni } from "./meni.js";
import { Sto } from "./sto.js";

export class Kafeterija{
    
    constructor(brStolova, id, naziv){
        this.id = id;
        this.brStolova = parseInt(brStolova);
        this.meni = new Meni(this, id);
        this.naziv = naziv;
        this.kontejner = null;
        this.stolovi = [];
        for(let i=0;i<this.brStolova;i++){
            this.stolovi.push(new Sto(i, this.meni, this.id));
        }
    }

    crtajKafeteriju(host){
        let naslov = document.createElement("h1");
        naslov.classList.add("naslov");
        naslov.innerHTML = "Kafeterija" + " " + (this.id+1);
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