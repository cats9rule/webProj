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
        let p = new Pice(pice.name, pice.value, pice.id);
        this.narudzbina.dodajPice(p);
        // treba update prikaz
        let t = document.querySelector(".Racun"+this.broj);
        t.innerHTML += p.naziv + "<br>"; 
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

        fetch("https://localhost:5001/Kafeterija/PreuzmiPica").then(p => {
                p.json().then(data => {
                    data.forEach(pice => {
                        //console.log(pice.naziv);
                        stavka = document.createElement("option");
                        stavka.classList.add("stavkaMeni");

                        stavka.value = pice.cena;
                        stavka.name = pice.naziv;
                        stavka.innerHTML = pice.naziv;
                        sel.add(stavka);
                    });
                }); 
            });

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
            console.log(b.parentNode.parentNode);
            b.parentNode.parentNode.style.backgroundColor = "rgb(252, 193, 137)";
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

            btnP.parentNode.parentNode.style.backgroundColor = "rgb(140, 194, 255)";
        }
        btnDiv.appendChild(btnP);

    }

    addStavkaMeniSto(){
        let s = document.querySelector(".naruciSelect" + this.broj);
        let stavka = document.createElement("option");

        let naz = document.querySelector(".nazivPica");
        let c = document.querySelector(".cenaPica");
        stavka.value = c.value;
        stavka.name = naz.value;
        stavka.innerHTML = naz.value;
        stavka.classList.add("stavkaMeni");
        s.appendChild(stavka);
    }
    removeStavkaMeniSto(index){
        let s = document.querySelector(".naruciSelect" + this.broj);
        s.options[index] = null
    }
    updateStavkaMeniSto(index, stavka){
        let s = document.querySelector(".naruciSelect" + this.broj);
        s.options[index].name = stavka.name;
        s.options[index].value = stavka.value;
        s.options[index].innerHTML = stavka.innerHTML;
    }
}