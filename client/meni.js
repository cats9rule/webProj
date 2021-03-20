import { Pice } from "./pice.js";

export class Meni{

    constructor(){

        this.kontejner = null;


        this.stavke = [];

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

    dodajStavku(){
        console.log("stavka");

        let naz = document.getElementById("nazivPica");
        let cena = document.getElementById("cenaPica");
        let s = new Pice(naz.value,cena.value);
        this.stavke.push(s);
        alert(this.stavke[this.stavke.length-1]);

        //this.crtajFormu(this.kontejner);
        let lista = document.getElementById("stavkeSelect");
        let stavka = document.createElement("option");
        stavka.value = s.Cena;
        stavka.name = s.Naziv;
        stavka.innerHTML = s.Naziv;
        lista.appendChild(stavka);
    }

    obrisiStavku(){
        let lista = document.getElementById("stavkeSelect");
        let index = lista.options.selectedIndex;
        console.log(index);
        let p = lista.options[index];
        lista.removeChild(lista.options[index]);
        this.stavke = this.stavke.filter(s=>s.Naziv!==p.name
            && s.Cena!==p.value);
        console.log(this.stavke);
    }

    izmeniStavku(){
        let naz = document.getElementById("nazivPica");
        let cena = document.getElementById("cenaPica");

        let lista = document.getElementById("stavkeSelect");
        let index = lista.options.selectedIndex;
        console.log(index);
        let p = lista.options[index];
        this.stavke[index].Naziv = p.name = naz.value;
        this.stavke[index].Cena = p.value = cena.value;
    }

    prikaziMeni(host){
        if(!host){
            throw new Exception("Host element za meni ne postoji!");
        }

        this.kontejner = document.createElement("div");
        //this.kontejner.classList.add("meni");
        host.appendChild(this.kontejner);


        this.crtajFormu(this.kontejner);
    }

    crtajFormu(host){
        if(!host){
            throw new Exception("Host element za stavke menija ne postoji!");
        }

        let kontejner = document.createElement("div");
        //kontejner.classList.add("stavkeForma");
        host.appendChild(kontejner);

        let meniTekst = document.createElement("h2");
        meniTekst.innerHTML = "Meni";
        this.kontejner.appendChild(meniTekst);

        let forma = document.createElement("form");
        //forma.classList.add("forma");
        this.kontejner.appendChild(forma);

        let sel = document.createElement("select");
        sel.id = "stavkeSelect";
        sel.setAttribute('multiple', true);
        sel.size = 10;
        //sel.classList.add(selekcijaMeni);
        forma.appendChild(sel);

        let stavka;
        this.stavke.forEach( (s, index) => {
            stavka = document.createElement("option");
            stavka.value = s.Cena;
            stavka.name = s.Naziv;
            stavka.innerHTML = s.Naziv;
            sel.appendChild(stavka);
        });
        // pri odabiru stavke, odgovarajuca polja dobijaju adekvatne vrednosti
        sel.onchange=(event) => {
            let i = sel.selectedIndex;
            if(i >= 0) {
                let naz = document.getElementById("nazivPica");
                naz.value = sel.options[i].name;
                naz = document.getElementById("cenaPica");
                naz.value = sel.options[i].value;
            }
        }



        /* Naziv i cena stavke */
        let p = document.createElement("p");
        //p.classList.add("atributiStavke");
        p.innerHTML = "Naziv: ";
        forma.appendChild(p);

        let inp = document.createElement("input");
        //inp.classList.add("polje");
        inp.type = "text";
        inp.id = "nazivPica";
        p.appendChild(inp);

        p = document.createElement("p");
        //p.classList.add("atributiStavke");
        p.innerHTML = "Cena: ";
        forma.appendChild(p);

        inp = document.createElement("input");
        //inp.classList.add("polje");
        inp.type = "text";
        inp.id = "cenaPica";
        p.appendChild(inp);

        

        /* Dugmad za dodavanje, izmenu i brisanje stavki iz menija */

        let dugmad = forma;
        //stavka.classList.appendChild("dugmadMeni");

        const btnDodaj = document.createElement("input");
        //btnDodaj.classList.add("dugme");
        btnDodaj.type = "button";
        btnDodaj.value = "Dodaj stavku";    

        btnDodaj.onclick=(event) => {
            this.dodajStavku();
        }
        dugmad.appendChild(btnDodaj);

        const btnIzmeni = document.createElement("input");
        //btnIzmeni.classList.add("dugme");
        btnIzmeni.type = "button";
        btnIzmeni.value = "Izmeni stavku";
        dugmad.appendChild(btnIzmeni);

        btnIzmeni.onclick=(event) => {
            this.izmeniStavku();
        }

        const btnObrisi = document.createElement("input");
        //btnObrisi.classList.add("dugme");
        btnObrisi.type = "button";
        btnObrisi.value = "Obrisi stavku";
        dugmad.appendChild(btnObrisi);

        btnObrisi.onclick=(event) => {
            this.obrisiStavku();
        }

    }
}