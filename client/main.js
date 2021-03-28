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
                        //console.log(k);
                        kafeterija = new Kafeterija(k);
                        kafeterija.crtajKafeteriju(document.body);
                    });
                }); 
            });
