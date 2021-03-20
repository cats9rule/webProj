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
        let t = document.getElementById("Racun"+this.broj);
        t.innerHTML += p.Naziv + "<br>"; 
    }

    plati(){
        let t = document.getElementById("Racun"+this.broj);
        console.log(t.innerHTML);
        t.innerHTML = "";
        return this.narudzbina.platiRacun();
    }

    crtajSto(host){
        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("sto");
        host.appendChild(this.kontejner);

        const broj = document.createElement("label");
        //broj.classList.add("brojStola");
        broj.innerHTML = this.broj;
        this.kontejner.appendChild(broj);

        const naruceno = document.createElement("p");
        //naruceno.classList.add("tekst");
        naruceno.id = "Racun" + this.broj;
        this.kontejner.appendChild(naruceno);



        const forma = document.createElement("form");
        //forma.classList.add("forma");
        this.kontejner.appendChild(forma);

        const sel = document.createElement("select");
        sel.id = "naruciSelect";
        //sel.classList.add(selekcijaMeni);
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
            btnD = document.getElementById("btnDodajN");
            console.log(sel.selectedIndex);
            if(sel.selectedIndex >= 0){
                btnD.removeAttribute("disabled");
            }
            else{
                btnD.setAttribute('disabled', true);
            }
        }

        const btnDiv = document.createElement("div");
        //btnDiv.classList.add("dugmadMeni");
        this.kontejner.appendChild(btnDiv);

        let btnD = document.createElement("button");
        //btnD.classList.add("dugme");
        btnD.innerHTML = "Dodaj";
        btnD.id = "btnDodajN";
        btnD.setAttribute('disabled', true);
        btnD.onclick = (event) =>{
            let s = document.getElementById("naruciSelect");
            this.dodajPice(s.options[s.selectedIndex]);
            let b = document.getElementById("btnPlatiN");
            b.removeAttribute('disabled');
        }
        btnDiv.appendChild(btnD);

        let btnP = document.createElement("button");
        btnP.innerHTML = "Plati";
        btnP.id = "btnPlatiN";
        btnP.setAttribute('disabled', true);
        //btnP.classList.add("dugme");
        btnP.setAttribute
        btnP.onclick = (event) => {
            this.plati();
            btnP.setAttribute('disabled', true);
        }
        btnDiv.appendChild(btnP);

    }

    updateMeniSto(stavka){
        let s = document.getElementById("naruciSelect");
        s.appendChild(stavka);
    }
    removeMeniSto(){}
}