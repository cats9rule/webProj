import { Pice } from "./pice.js";

export class Sto{

    constructor(broj, meniRef, oznaka, id){
        this.id = id;
        this.oznaka = oznaka;
        this.broj = broj;
        this.kontejner = null;
        this.pica = [];
        this.meniRef = meniRef; 
    }

    ukloniPice(pice){
        this.pica.filter(p=> p.Naziv !== pice.Naziv && 
            p.Cena !== pice.Cena);
    }

    dodajPice(pice){
        let p = new Pice(pice.name, pice.value, pice.id);
        this.pica.push(p);
        //this.narudzbina.dodajPice(p);
        // treba update prikaz
        let t = document.querySelector(".Racun" + this.oznaka + "-" + this.broj);
        t.innerHTML += p.naziv + " - " + p.cena + "<br>"; 
    }

    plati(){
        let t = document.querySelector(".Racun" + this.oznaka + "-" + this.broj);
        t.innerHTML = "";
        let suma = 0;
        let str = "";
        this.pica.forEach(  (pice) => {
            suma+= parseInt(pice.cena);
            str+= pice.Naziv + " - " + pice.Cena + '\n';
        });
        str+= "Racun je: " + suma;
        alert(str);
        delete this.pica;
        this.pica = [];
    }

    crtajSto(host){
        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("sto");
        host.appendChild(this.kontejner);

        const broj = document.createElement("label");
        broj.innerHTML = (this.broj+1);
        this.kontejner.appendChild(broj);

        const naruceno = document.createElement("p");

        let id = "Racun" + this.oznaka + "-" + this.broj;
        naruceno.classList.add(id);
        this.kontejner.appendChild(naruceno);

        const forma = document.createElement("form");
        forma.classList.add("forma");
        this.kontejner.appendChild(forma);

        const sel = document.createElement("select");
        id = "naruciSelect" + this.oznaka + "-" + this.broj;
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
            let identity = ".btnNaruci" + this.oznaka + "-" + this.broj;
            btnD = document.querySelector(identity);
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
        btnD.innerHTML = "Naruci";
        id = "btnNaruci" + this.oznaka + "-" + this.broj;
        btnD.classList.add(id);
        btnD.setAttribute('disabled', true);
        btnD.onclick = (event) =>{
            let s = document.querySelector(".naruciSelect" + this.oznaka + "-" + this.broj);
            this.dodajPice(s.options[s.selectedIndex]);
            let b = document.querySelector(".btnPlati" + this.oznaka + "-" + this.broj);
            b.removeAttribute('disabled');
            b.parentNode.parentNode.style.backgroundColor = "rgb(252, 193, 137)";
        }
        btnDiv.appendChild(btnD);

        let btnP = document.createElement("button");
        btnP.innerHTML = "Plati";
        id = "btnPlati" + this.oznaka + "-" + this.broj;
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
        let s = document.querySelector(".naruciSelect" + this.oznaka + "-" + this.broj);
        let stavka = document.createElement("option");

        let naz = document.querySelector(".nazivPica" + this.oznaka);
        let c = document.querySelector(".cenaPica" + this.oznaka);
        stavka.value = c.value;
        stavka.name = naz.value;
        stavka.innerHTML = naz.value;
        stavka.classList.add("stavkaMeni");
        s.appendChild(stavka);
    }
    removeStavkaMeniSto(index){
        let s = document.querySelector(".naruciSelect" + this.oznaka + "-" + this.broj);
        s.options[index] = null
    }
    updateStavkaMeniSto(index, stavka){
        let s = document.querySelector(".naruciSelect" + this.oznaka + "-" + this.broj);
        s.options[index].name = stavka.name;
        s.options[index].value = stavka.value;
        s.options[index].innerHTML = stavka.innerHTML;
    }
}