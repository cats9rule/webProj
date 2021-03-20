import { Meni } from "./meni.js";
import { Sto } from "./sto.js";

export class Kafeterija{
    
    constructor(brStolova){
        this.brStolova = parseInt(brStolova);
        this.meni = new Meni(this);
        this.kontejner = null;

        this.stolovi = [];
        for(let i=0;i<this.brStolova;i++){
            this.stolovi.push(new Sto(i, this.meni));
        }
    }

    crtajKafeteriju(host){
        let naslov = document.createElement("h1");
        naslov.classList.add("naslov");
        naslov.innerHTML = "Kafeterija";
        host.appendChild(naslov);
        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("kafeterija");
        var temp = "wtf";
        this.kontejner.classList.add(temp);
        host.appendChild(this.kontejner);

        this.meni.prikaziMeni(this.kontejner);
        const sala = document.createElement("div");
        sala.classList.add("salaStolovi");
        this.kontejner.appendChild(sala);

        this.stolovi.forEach((sto) => {
            sto.crtajSto(sala);
        });
    }

    dodajStavkuSto(stavka){
        this.stolovi.forEach((sto) => {
            sto.addStavkaMeniSto(stavka);
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