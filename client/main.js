import { Kafeterija } from "./kafeterija.js";


// const kafeterija1 = new Kafeterija(10, 0);
// kafeterija1.crtajKafeteriju(document.body);

// const kafeterija2 = new Kafeterija(15, 1);
// kafeterija2.crtajKafeteriju(document.body);
let kafeterija;
fetch("https://localhost:5001/Kafeterija/PreuzmiKafeterije")
.then(p => {
                p.json().then(data => {
                    data.forEach(k => {
                        kafeterija = new Kafeterija(k.brojStolova, k.id, k.naziv);
                        kafeterija.crtajKafeteriju(document.body);
                    });
                }); 
            });

            fetch("https://localhost:5001/Kafeterija/PreuzmiMeni/1").then(p => {
                p.json().then(data => {
                    console.log(data);
                    });
                }); 
