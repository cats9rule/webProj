import { Pice } from "./pice.js";

export class Sto{

    constructor(id, broj, meniRef, oznaka){
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

        this.pica.push(pice);

        // treba update prikaz
        let t = document.querySelector(".Racun" + this.oznaka + "-" + this.broj);
        t.innerHTML += pice.naziv + " - " + pice.cena + "<br>"; 
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

        const racun = document.createElement("p");

        let id = "Racun" + this.oznaka + "-" + this.broj; // za lociranje elementa na stranici
        racun.classList.add(id);

        this.kontejner.appendChild(racun);

        const forma = document.createElement("form");
        forma.classList.add("forma");
        this.kontejner.appendChild(forma);

        const sel = document.createElement("select");
        id = "naruciSelect" + this.oznaka + "-" + this.broj; // za lociranje elementa na stranici
        sel.classList.add(id);
        forma.appendChild(sel);

        let stavka;

        this.meniRef.stavke.forEach( pice => {
            stavka = document.createElement("option");
            stavka.classList.add("stavkaMeni");

            stavka.value = pice.cena;
            stavka.name = pice.naziv;
            stavka.innerHTML = pice.naziv;
            sel.add(stavka);
        });

        sel.onclick=(event) => {
            let identity = ".btnNaruci" + this.oznaka + "-" + this.broj; // za lociranje elementa na stranici
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
        id = "btnNaruci" + this.oznaka + "-" + this.broj; // za lociranje elementa na stranici
        btnD.classList.add(id);
        btnD.setAttribute('disabled', true);

        btnD.onclick = (event) =>{
            let s = document.querySelector(".naruciSelect" + this.oznaka + "-" + this.broj); // za lociranje elementa na stranici
            let piceid = this.meniRef.stavke[s.selectedIndex].id;
            let picepostoji = 0;

            this.pica.forEach( pice => {
                if(pice.id == piceid && picepostoji == 0){
                    // pice postoji, treba azurirati broj pica u bazi
                    fetch("https://localhost:5001/Kafeterija/DodajJosJednoPice/" + this.id + "/" + piceid, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        }
                        })
                        .then(p => {
                            if (p.ok) {
                                alert("Pice na stolu, jos jedno.");

                            }
                            else if(p.status == 406){
                                alert("Pice na stolu nije nadjeno.");
                            }
                            else{
                                alert("Greska pri upisu.");
                            }
                        });
                    picepostoji++;
                }
            });
            if(picepostoji == 0){
                // ako pice ne postoji na datom stolu, treba ga dodati
                fetch("https://localhost:5001/Kafeterija/DodajPiceNaSto/" + this.id + "/" + piceid, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "piceID": piceid,
                        "brojPica": 1,
                        "stoID": this.id
                    })
                })
                .then(p => {
                    if (p.ok) {
                        alert("Pice na stolu.");

                    }
                    else {
                        alert("Greška prilikom upisa.");
                    }
                });
            }
            
            this.dodajPice(this.meniRef.stavke[s.selectedIndex]);
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
            fetch("https://localhost:5001/Kafeterija/IzbrisiPicaSaStola/" + this.id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify ({
                    
                })
            })
            .then(p => {
                if(p.ok){ 

                    /* Ako je brisanje pica sa stola u bazi proslo ok,
                    azurira se prikaz na stranici. */
                    
                    this.plati();
                    btnP.setAttribute('disabled', true);
                    btnP.parentNode.parentNode.style.backgroundColor = "rgb(140, 194, 255)";
                }
                else alert("Greska prilikom placanja.");
            }
            );
        }
        btnDiv.appendChild(btnP);

        fetch("https://localhost:5001/Kafeterija/PreuzmiPicaZaSto/" + this.id).then(p => {
                p.json().then(data => {

                    /* Za svako pice koje je prethodno naruceno za sto,
                    dodaje se ispis na stolu onoliko puta koliko je to pice naruceno. */

                    data.forEach(naruceno => {
                        let temp;

                        this.meniRef.stavke.forEach(s => {
                            if(s.id == naruceno.piceID){
                                temp = s;
                            }
                        });

                        for(let i = 0; i < naruceno.brojPica; i++){
                            this.pica.push(new Pice(temp.naziv, temp.cena, temp.id));
                            console.log("Pice na stolu: " + temp.naziv);
                            racun.innerHTML += temp.naziv + " - " + temp.cena + "<br>";
                        }
                        let b = document.querySelector(".btnPlati" + this.oznaka + "-" + this.broj);
                        b.removeAttribute('disabled');
                        b.parentNode.parentNode.style.backgroundColor = "rgb(252, 193, 137)";
                    });
                }); 
            });

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
        delete s.options[index];
    }

    updateStavkaMeniSto(index, stavka){
        let s = document.querySelector(".naruciSelect" + this.oznaka + "-" + this.broj);
        s.options[index].name = stavka.name;
        s.options[index].value = stavka.value;
        s.options[index].innerHTML = stavka.innerHTML;
    }
}