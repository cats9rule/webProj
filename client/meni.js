import { Pice } from "./pice.js";

export class Meni{

    constructor(){

        this.kontejner = null;


        this.stavke = {};

        let pice = new Pice("Obicna voda", 0);
        this.stavke.push(pice);

        pice = new Pice("Kisela voda", 120);
        this.stavke.push(pice);
        
        pice = new Pice("Koka kola", 120);
        this.stavke.push(pice);
        
        pice = new Pice("Schweppes", 120);
        this.stavke.push(pice);
        
        pice = new Pice("Cockta", 120);
        this.stavke.push(pice);
        
        pice = new Pice("Cedevita", 150);
        this.stavke.push(pice);
        
        pice = new Pice("Vocni sok", 120);
        this.stavke.push(pice);

        pice = new Pice("Cedjeni sok", 180);
        this.stavke.push(pice);


        pice = new Pice("Espresso", 120);
        this.stavke.push(pice);

        pice = new Pice("Cappuccino", 130);
        this.stavke.push(pice);

        pice = new Pice("Macchiato", 130);
        this.stavke.push(pice);

        pice = new Pice("Mocha", 150);
        this.stavke.push(pice);

        pice = new Pice("White Mocha", 150);
        this.stavke.push(pice);

        pice = new Pice("Ice Mocha", 220);
        this.stavke.push(pice);

        pice = new Pice("Doppio", 210);
        this.stavke.push(pice);

        pice = new Pice("Ristretto", 120);
        this.stavke.push(pice);

        pice = new Pice("Latte", 180);
        this.stavke.push(pice);

        pice = new Pice("Ice Latte", 210);
        this.stavke.push(pice);

        pice = new Pice("Vanilla Latte", 200);
        this.stavke.push(pice);
    }

    dodajStavku(pice){
            stavke.push(pice);
    }

    obrisiStavku(pice){
        this.stavke.foreach( (stavka, index) => {
            if(stavka.naziv == pice.naziv){
                this.stavka.splice(index, 1);
                return;
            }
        });
    }

    prikaziMeni(host){
        if(!host){
            throw new Exception("Host element za meni ne postoji!");
        }

        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("meni");
        host.appendChild(this.kontejner);


        this.crtajFormu(this.kontejner);
        this.crtajStavke(this.kontejner);
    }

    crtajFormu(host){
        if(!host){
            throw new Exception("Host element za formu menija ne postoji!")
        }

        
    }
}