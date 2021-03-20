import { Meni } from "./meni.js";
import { Sto } from "./sto.js";

export class Kafeterija{
    
    constructor(brStolova){
        this.brStolova = parseInt(brStolova);
        this.meni = new Meni();
        this.kontejner = null;

        this.stolovi = [];
        for(let i=0;i<this.brStolova;i++){
            this.stolovi.push(new Sto(i, this.meni));
        }
    }

    crtajKafeteriju(host){
        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("kafeterija");
        host.appendChild(this.kontejner);

        this.meni.prikaziMeni(this.kontejner);
        const sala = document.createElement("div");
        sala.classList.add("salaStolovi");
        this.kontejner.appendChild(sala);

        this.stolovi.forEach((sto, index) => {
            sto.crtajSto(sala);
        });
    }
}