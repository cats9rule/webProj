import { Narudzbina } from "./narudzbina.js";
import { Pice } from "./pice.js";

export class Sto{

    constructor(broj, meniRef){
        this.broj = broj;
        this.narudzbina = new Narudzbina();
        this.kontejner = null;
        this.meniRef = meniRef; 
    }

    dodajPice(pice){
        let p = new Pice(pice.name, pice.value);
        this.narudzbina.dodajPice(p);
        // treba update prikaz
        let t = document.querySelector(".Racun"+this.broj);
        t.innerHTML += p.Naziv + "<br>"; 
    }

    plati(){
        let t = document.querySelector(".Racun"+this.broj);
        console.log(t.innerHTML);
        t.innerHTML = "";
        return this.narudzbina.platiRacun();
    }

    crtajSto(host){
        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("sto");
        host.appendChild(this.kontejner);

        const broj = document.createElement("label");
        broj.innerHTML = this.broj;
        this.kontejner.appendChild(broj);

        const naruceno = document.createElement("p");
        //naruceno.classList.add("tekst");
        let id = "Racun" + this.broj;
        naruceno.classList.add(id);
        this.kontejner.appendChild(naruceno);



        const forma = document.createElement("form");
        forma.classList.add("forma");
        this.kontejner.appendChild(forma);

        const sel = document.createElement("select");
        id = "naruciSelect"  + this.broj;
        sel.classList.add(id);
        forma.appendChild(sel);

        let stavka;
        this.meniRef.stavke.forEach( (s, index) => {
            stavka = document.createElement("option");
            stavka.value = s.Cena;
            stavka.name = s.Naziv;
            stavka.innerHTML = s.Naziv;
            sel.appendChild(stavka);
        });
        // pri odabiru stavke, odgovarajuca polja dobijaju adekvatne vrednosti
        sel.onchange=(event) => {
            let identity = ".btnDodajN" + this.broj;
            btnD = document.querySelector(identity);
            console.log(btnD);
            console.log(sel.selectedIndex);
            if(sel.selectedIndex >= 0){
                btnD.removeAttribute("disabled");
            }
            else{
                btnD.setAttribute('disabled', true);
            }
        }

        const btnDiv = document.createElement("div");
        btnDiv.classList.add("dugmadMeni");
        this.kontejner.appendChild(btnDiv);

        let btnD = document.createElement("button");
        btnD.classList.add("dugme");
        btnD.innerHTML = "Dodaj";
        id = "btnDodajN" + this.broj;
        console.log(id);
        btnD.classList.add(id);
        btnD.setAttribute('disabled', true);
        btnD.onclick = (event) =>{
            let s = document.querySelector(".naruciSelect" + this.broj);
            this.dodajPice(s.options[s.selectedIndex]);
            let b = document.querySelector(".btnPlatiN" + this.broj);
            b.removeAttribute('disabled');
        }
        btnDiv.appendChild(btnD);

        let btnP = document.createElement("button");
        btnP.innerHTML = "Plati";
        id = "btnPlatiN" + this.broj;
        btnP.classList.add(id);
        btnP.setAttribute('disabled', true);
        btnP.classList.add("dugme");
        btnP.onclick = (event) => {
            this.plati();
            btnP.setAttribute('disabled', true);
        }
        btnDiv.appendChild(btnP);

    }

    addStavkaMeniSto(stavka){
        let s = document.querySelector(".naruciSelect" + this.broj);
        let stav = document.createElement("option");
        stav.name = s.name;
        stav.value = s.value;
        stav.innerHTML = s.innerHTML;
        s.appendChild(stavka);
    }
    removeStavkaMeniSto(index){
        let s = document.querySelector(".naruciSelect" + this.broj);
        s.removeChild(s.options[index]);
    }
    updateStavkaMeniSto(index, stavka){
        let s = document.querySelector(".naruciSelect" + this.broj);
        s.options[index].name = stavka.name;
        s.options[index].value = stavka.value;
        s.options[index].innerHTML = stavka.innerHTML;
    }
}