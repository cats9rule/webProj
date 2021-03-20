import { Meni } from "./meni.js";
import { Sto } from "./sto.js";

const meni = new Meni();

meni.prikaziMeni(document.body);

const stolovi = document.createElement("div");

const sto = new Sto(1, 4, 5, meni);
sto.crtajSto(document.body);