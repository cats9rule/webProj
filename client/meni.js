import { Pice } from "./pice.js";

export class Meni{

    constructor(k){

        this.kontejner = null;

        this.kafeterijaRef = k;


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
        //console.log("stavka");

        let naz = document.querySelector(".nazivPica");
        let cena = document.querySelector(".cenaPica");
        let s = new Pice(naz.value,parseInt(cena.value));
        this.stavke.push(s);
        
        let l = document.querySelector(".stavkeSelect");
        console.log(l);

        let b = this.stavke.length;
        for(let i=0; i<b ;i++){
            l.options[i] = null;
        }

        let stavka;
        this.stavke.forEach( (s, index) => {
            stavka = document.createElement("option");
            stavka.classList.add("stavkaMeni");
            stavka.value = s.Cena;
            stavka.name = s.Naziv;
            stavka.innerHTML = s.Naziv;
            l.add(stavka);
        });
        // stavka = document.createElement("option");
        // stavka.classList.add("stavkaMeni");
        // stavka.value = cena.value;
        // stavka.name = naz.value;
        // stavka.innerHTML = naz.value;
        // l.add(stavka);
        
        //l.add(stavka);
        alert(stavka.name);
        console.log(l);

        this.kafeterijaRef.dodajStavkuSto(stavka.name, parseInt(stavka.cena), this.stavke);
    }

    obrisiStavku(){
        let lista = document.querySelector(".stavkeSelect");
        let index = lista.options.selectedIndex;
        console.log(index);
        let p = lista.options[index];
        lista.removeChild(lista.options[index]);
        this.stavke = this.stavke.filter(s=>s.Naziv!==p.name
            && s.Cena!==p.value);
        console.log(this.stavke);

        this.kafeterijaRef.ukloniStavkuSto(index);
    }

    izmeniStavku(){
        let naz = document.querySelector(".nazivPica");
        let cena = document.querySelector(".cenaPica");

        let lista = document.querySelector(".stavkeSelect");
        let index = lista.options.selectedIndex;
        console.log(index);
        let p = lista.options[index];
        this.stavke[index].Naziv = p.name = naz.value;
        this.stavke[index].Cena = p.value = cena.value;
        p.innerHTML = naz.value;

        this.kafeterijaRef.azurirajStavkuSto(index, p);
    }

    prikaziMeni(host){
        if(!host){
            throw new Exception("Host element za meni ne postoji!");
        }

        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("meni");
        host.appendChild(this.kontejner);
        let meniTekst = document.createElement("h2");
        meniTekst.innerHTML = "Meni";
        this.kontejner.appendChild(meniTekst);

        this.crtajFormu(this.kontejner);
    }

    crtajFormu(host){
        if(!host){
            throw new Exception("Host element za stavke menija ne postoji!");
        }

        // let kontejner = document.createElement("div");
        // kontejner.classList.add("stavkeForma");
        // host.appendChild(kontejner);

        const forma = document.createElement("form");
        forma.classList.add("forma");
        host.appendChild(forma);

        const sel = document.createElement("select");
        sel.classList.add("stavkaMeni");
        sel.classList.add("stavkeSelect");
        sel.setAttribute('multiple', true);
        sel.size = 10;
        forma.appendChild(sel);

        let stavka;
        this.stavke.forEach( (s, index) => {
            stavka = document.createElement("option");
            stavka.classList.add("stavkaMeni");
            stavka.value = s.Cena;
            stavka.name = s.Naziv;
            stavka.innerHTML = s.Naziv;
            sel.add(stavka);
        });
        // pri odabiru stavke, odgovarajuca polja dobijaju adekvatne vrednosti
        sel.onchange=(event) => {
            let i = sel.selectedIndex;
            if(i >= 0) {
                let naz = document.querySelector(".nazivPica");
                naz.value = sel.options[i].name;
                naz = document.querySelector(".cenaPica");
                naz.value = sel.options[i].value;
            }
        }



        /* Naziv i cena stavke */
        let p = document.createElement("label");
        //p.classList.add("polje");
        p.name = "naziv"
        p.innerHTML = "Naziv: ";
        forma.appendChild(p);

        let inp = document.createElement("input");
        inp.classList.add("polje");
        inp.type = "text";
        inp.name = "naziv";
        let id = "nazivPica";
        inp.classList.add(id);
        
        p.appendChild(inp);

        p = document.createElement("label");
        //p.classList.add("polje");
        p.name = "cena";
        p.innerHTML = "Cena: ";
        forma.appendChild(p);

        inp = document.createElement("input");
        inp.classList.add("polje");
        inp.type = "number";
        inp.name = "cena";
        id = "cenaPica";
        inp.classList.add(id);
        p.appendChild(inp);

        

        /* Dugmad za dodavanje, izmenu i brisanje stavki iz menija */


        const btnDodaj = document.createElement("input");
        btnDodaj.classList.add("dugme");
        btnDodaj.type = "button";
        btnDodaj.value = "Dodaj stavku";    

        btnDodaj.onclick=(event) => {
            this.dodajStavku();
        }
        forma.appendChild(btnDodaj);

        const btnIzmeni = document.createElement("input");
        btnIzmeni.classList.add("dugme");
        btnIzmeni.type = "button";
        btnIzmeni.value = "Izmeni stavku";
        forma.appendChild(btnIzmeni);

        btnIzmeni.onclick=(event) => {
            this.izmeniStavku();
        }

        const btnObrisi = document.createElement("input");
        btnObrisi.classList.add("dugme");
        btnObrisi.type = "button";
        btnObrisi.value = "Obrisi stavku";
        forma.appendChild(btnObrisi);

        btnObrisi.onclick=(event) => {
            this.obrisiStavku();
        }

    }
}