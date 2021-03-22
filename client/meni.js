import { Pice } from "./pice.js";

export class Meni{

    constructor(k){

        this.id = 0;

        this.kontejner = null;

        this.kafeterijaRef = k;

        this.brojStavki = 4;


        this.stavke = [];

        fetch("https://localhost:5001/Kafeterija/PreuzmiPica").then(p => {
                p.json().then(data => {
                    data.forEach(pice => {
                        console.log(pice.naziv);
                        const kafa = new Pice(pice.naziv, pice.cena, pice.id); 
                        this.stavke.push(kafa);
                    });
                }); 
            });
    }

    dodajStavku(){
        //console.log("stavka");

        let naz = document.querySelector(".nazivPica");
        let cena = document.querySelector(".cenaPica");
        let s = new Pice(naz.value,parseInt(cena.value));

        console.log(s);
        
        
        let l = document.querySelector(".stavkeSelect");
        console.log(l);

        let index = this.brojStavki + 1;

        fetch("https://localhost:5001/Kafeterija/UpisiPice/" + index, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "naziv": naz.value,
                    "cena": cena.value
                })
            }).then(p => {
                if (p.ok) {
                    let stavka = document.createElement("option");
                    stavka.classList.add("stavkaMeni");
                    stavka.value = cena.value;
                    stavka.name = naz.value;
                    stavka.innerHTML = naz.value;
                    l.add(stavka);
        
                    alert(stavka.name);

                    this.stavke.push(s);
                    this.kafeterijaRef.dodajStavkuSto(stavka.name, parseInt(stavka.cena), this.brojStavki);
                }
                else if (p.status == 406) {
                    alert("Cena pica ne sme da bude negativna!");
                }
                else {
                    alert("Greška prilikom upisa.");
                }
            }).catch(p => {
                alert("Greška prilikom upisa.");
            });

        // let b = this.stavke.length;
        // for(let i=0; i<b ;i++){
        //     l.options[i] = null;
        // }

        // let stavka;
        // this.stavke.forEach( (s, index) => {
        //     stavka = document.createElement("option");
        //     stavka.classList.add("stavkaMeni");
        //     stavka.value = s.Cena;
        //     stavka.name = s.Naziv;
        //     stavka.innerHTML = s.Naziv;
        //     l.add(stavka);
        // });
        // let stavka = document.createElement("option");
        // stavka.classList.add("stavkaMeni");
        // stavka.value = cena.value;
        // stavka.name = naz.value;
        // stavka.innerHTML = naz.value;
        // l.add(stavka);
        
        // //l.add(stavka);
        // alert(stavka.name);
        // console.log(l);

        // this.kafeterijaRef.dodajStavkuSto(stavka.name, parseInt(stavka.cena), this.brojStavki);
    }

    obrisiStavku(){
        let lista = document.querySelector(".stavkeSelect");
        let index = lista.options.selectedIndex;
        console.log(index);
        let p = lista.options[index];
        let stavka = this.stavke[index];


        fetch("https://localhost:5001/Kafeterija/IzbrisiPice/" + stavka.id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify ({
                    "naziv": p.name,
                    "cena": p.value,
                })
            }).then(p => {
                if (p.ok)
                {
                    lista.removeChild(lista.options[index]);
                    this.stavke = this.stavke.filter(s=>s.Naziv!==p.name
                        && s.Cena!==p.value);
                    console.log(this.stavke);

                    this.kafeterijaRef.ukloniStavkuSto(index);
                }
                else
                {
                    alert("Doslo je do greske prilikom brisanja");
                }
        });   
    }

    izmeniStavku(index){
        let naz = document.querySelector(".nazivPica");
        let cena = document.querySelector(".cenaPica");

        let lista = document.querySelector(".stavkeSelect");
        //let index = lista.options.selectedIndex;

        console.log(index);
        let stavka = lista.options[index];

        console.log(stavka);

        let s = (this.stavke[index]);

        

        fetch("https://localhost:5001/Kafeterija/IzmeniPice/" + s.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify ({
                    "naziv": naz.value,
                    "cena": cena.value
                })
            }).then(p => {
                if (p.ok)
                {
                    this.stavke[index].Naziv = lista.options[index].name = naz.value;
                    this.stavke[index].Cena = lista.options[index].value = cena.value;
                    lista.options[index].innerHTML = naz.value;

                    this.kafeterijaRef.azurirajStavkuSto(index, stavka);
                }
                else
                {
                    alert("Doslo je do greske priliko azuriranja kolicine");
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

        fetch("https://localhost:5001/Kafeterija/PreuzmiPica").then(p => {
                p.json().then(data => {
                    data.forEach(pice => {
                        console.log(pice.naziv);
                        stavka = document.createElement("option");
                        stavka.classList.add("stavkaMeni");

                        //console.log(s.Naziv);

                        stavka.value = pice.cena;
                        stavka.name = pice.naziv;
                        stavka.innerHTML = pice.naziv;
                        sel.add(stavka);
                    });
                }); 
            });

        // this.stavke.forEach( (s, index) => {
        //     stavka = document.createElement("option");
        //     stavka.classList.add("stavkaMeni");

        //     //console.log(s.Naziv);

        //     stavka.value = s.Cena;
        //     stavka.name = s.Naziv;
        //     stavka.innerHTML = s.Naziv;
        //     sel.add(stavka);
        // });
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
            let lista = document.querySelector(".stavkeSelect");
            let i = lista.options.selectedIndex;
            this.izmeniStavku(i);
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