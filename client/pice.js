export class Pice{

    constructor(naziv, cena){
        this.naziv = naziv;
        this.cena = cena;
    }

    get Naziv(){
        return this.naziv;
    }
    set Naziv(value){
        this.naziv = value;
    }

    get Cena(){
        return this.cena;
    }
    set Cena(value){
        if (value>0){
            this.cena = value;
        }
        else alert("Ne moze se postaviti negativna cena!");
    }
}