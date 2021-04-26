console.log(contenuti);

let numPreferiti=0, numOfferte=0;

let stellaPiena="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Red_star.svg/260px-Red_star.svg.png";
let stellaVuota="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Stellone_d%27Italia.svg/1200px-Stellone_d%27Italia.svg.png";

let main= document.getElementById("main");
let bloccoPreferiti= document.getElementById("bloccoPreferiti");
let avviso = document.getElementById("avviso");

bloccoPreferiti.classList.add("hide");
avviso.classList.add("hide");
/*
for(let i=0; i<contenuti.length; i++){
    let contenitore=document.createElement("div");
    let testo  = document.createElement("div");
    let titolo=document.createElement("h1");
    let link= document.createElement("a");
    let immagine=document.createElement("img");
    let descrizione=document.createElement("p");
    let mostra=document.createElement("button");
    let nascondi=document.createElement("button");
    let stella=document.createElement("img");

    contenitore.classList.add("offerta");
    testo.classList.add("testo");
    titolo.classList.add("titolo");
    descrizione.classList.add("corpo");
    mostra.classList.add("bottone");
    nascondi.classList.add("bottone");
    nascondi.classList.add("hide");
    immagine.classList.add("immagine");
    descrizione.classList.add("hide");
    stella.classList.add("stella");

    stella.src=stellaVuota;
    immagine.src=contenuti[i].immagine;
    titolo.textContent=contenuti[i].titolo;
    descrizione.textContent=contenuti[i].descrizione;
    link.href=contenuti[i].link;
    link.textContent="Link Offerta";
    mostra.textContent="Mostra Descrizione";
    nascondi.textContent="Nascondi Descrizione";

    mostra.addEventListener("click", mostraDescrizione);
    nascondi.addEventListener("click", nascondiDescrizione);
    stella.addEventListener("click", aggiungiPreferiti);

    testo.appendChild(link);
    testo.appendChild(titolo);
    testo.appendChild(descrizione);
    testo.appendChild(mostra);
    testo.appendChild(nascondi);
    contenitore.appendChild(immagine);
    contenitore.appendChild(testo);
    contenitore.appendChild(stella);

    main.appendChild(contenitore);
    numOfferte++;
}

 */

function mostraDescrizione(event){
    console.log("Ho cliccato")
    console.log(event.currentTarget);
    let descrizione= event.currentTarget.parentNode.childNodes[2];
    let nascondi= event.currentTarget.parentNode.childNodes[4];
    console.log(descrizione)
    descrizione.classList.remove("hide");
    event.currentTarget.classList.add("hide");
    nascondi.classList.remove("hide");

}

function nascondiDescrizione(event){

    console.log("Ho cliccato")
    console.log(event.currentTarget);
    let descrizione= event.currentTarget.parentNode.childNodes[2];
    let mostra= event.currentTarget.parentNode.childNodes[3];
    console.log(descrizione)
    descrizione.classList.add("hide");
    event.currentTarget.classList.add("hide");
    mostra.classList.remove("hide");
}

function aggiungiPreferiti(event){
    let offerta = event.currentTarget.parentNode;

    let preferiti = document.getElementById("preferiti");

    preferiti.appendChild(offerta);
    let stella =     offerta.childNodes[1];
    stella.src=stellaPiena;

    stella.removeEventListener("click", aggiungiPreferiti);
    stella.addEventListener("click", rimuoviPreferiti);

    numPreferiti++;
    numOfferte--;

    console.log(numPreferiti)
    if(numPreferiti==1)
        bloccoPreferiti.classList.remove("hide");

    if(numOfferte==0)
        avviso.classList.remove("hide");

}

function rimuoviPreferiti(event){

    let offerta = event.currentTarget.parentNode;

    let offerte = document.getElementById("main");

    let preferiti = document.getElementById("preferiti");



    offerte.appendChild(offerta);

    let stella =     offerta.childNodes[1];
    stella.src=stellaVuota;

    stella.removeEventListener("click", rimuoviPreferiti);
    stella.addEventListener("click", aggiungiPreferiti);

    numOfferte++;
    numPreferiti--;

    if(numPreferiti==0)
        bloccoPreferiti.classList.add("hide");

    if(numOfferte==1)
        avviso.classList.add("hide");
}


function ricerca(){

    let numRisultati=0;

    let offerte = document.getElementById("main")
    let ricerca = document.getElementById("ricerca");

    let testoRicerca=ricerca.value;                     //Prendiamo la sottostringa che vogliamo cercare nel titolo delle offerte

    for(let i=3; i<offerte.childNodes.length; i++){
        let offerta=offerte.childNodes[i];              //A turno controlliamo tutte le offerte presenti nella sezione Offerte di lavoro
        console.log(offerta)

        let blocco=offerta.childNodes[0];               //Prendiamo la parte testuale dell'offerta
        let titolo= blocco.childNodes[1].textContent;   //Prendiamo il titolo dell'offerta

        //Trasformiamo entrambe le stringhe in minuscolo in maniera tale da non essere Case Sensitive
        titolo= titolo.toLowerCase();
        testoRicerca= testoRicerca.toLowerCase();

        let result=titolo.indexOf(testoRicerca);        //Ritorna la posizione della sottostringa cercata nel titolo (Se non è presente ritorna -1)

        if(result==-1){
            console.log("Esito negativo")
            offerta.classList.add("hide");
        }
        else{
            console.log("Esito positvo")
            offerta.classList.remove("hide");
            numRisultati++;
        }

        if(numRisultati==0)
            avviso.classList.remove("hide");
        else
            avviso.classList.add("hide");
    }
}


/*------------------------------------  INTRODUZIONE API PUNTI VENDITA -------------------------------*/


function cercaLavoro(){

    console.log("Sono cercaLavoro");

    const off_api_endpoint = "https://api.adzuna.com/v1/api/jobs/gb/search/1";
    const id_off ="9b4f1f6e"
    const key_off = "6bc64f17550335b0a01114e32f9131b4";

    rest_url= off_api_endpoint + "?app_id=" + id_off + "&app_key=" + key_off;
//ora eseguiamo il fetch:
    fetch(rest_url).then(onResponse).then(onJson);

}

function meteo(){

    console.log("Sono meteo");

    const off_api_endpoint = "https://pfa.foreca.com/api/v1/location/search/Catania?lang=it";
    const id_off ="9b4f1f6e"
    const key_off = "ab1bbec222ad1050236a7b12851cb9f8";
    console.log(token_data)
    rest_url= off_api_endpoint + "?app_id=" + id_off + "&app_key=" + key_off;
//ora eseguiamo il fetch:
    const status = 'adoptable';
    fetch("https://pfa.foreca.com/api/v1/location/search/Catania?lang=it" + '&status=' + status,
        {
            headers: {
                'Authorization': "Bearer "+ token_data.access_token
            }
        }).then(onResponse).then(onJsonMeteo);

}

function onJsonMeteo(json){
    console.log(json)
    meteoCatania(json.locations[0].id);
}

function meteoCatania(citta){
    console.log(citta)

    console.log("Sono meteoCatania");

    console.log(token_data)
    //ora eseguiamo il fetch:
    const status = 'adoptable';
    fetch("https://pfa.foreca.com/api/v1/observation/latest/"+ citta + '&status=' + status,
        {
            headers: {
                'Authorization': "Bearer "+ token_data.access_token
            }
        }).then(onResponse).then(onJsonCitta);
}

function onJsonCitta(json){
    console.log(json)
    console.log(json.observations[0].temperature)
    let temperatura = document.getElementById("temperatura");
    temperatura.textContent=json.observations[0].temperature;
}

function onJson(json){
    console.log('JSON off ricevuto');
    console.log(json);

    const results = json.results
    for(result of results)
    {
        console.log(result+' questo e un result');
    }

    if(results.length === 0)
    {
        const errore = document.createElement("h1");
        const messaggio = document.createTextNode("Nessun risultato!");
        errore.appendChild(messaggio);
        library.appendChild(errore);
    }

    for(let i =0; i < json.results.length; i++) {
        let title = json.results[i].title;
        let description = json.results[i].description;
        let redirect_url = json.results[i].redirect_url;

        let titolo = document.createElement("h1");
        let descrizione = document.createElement("p");
        let link = document.createElement("a");
        let contenitore = document.createElement("div");
        let testo = document.createElement("div");
        let mostra = document.createElement("button");
        let nascondi = document.createElement("button");
        let stella = document.createElement("img");

        contenitore.classList.add("offerta");
        testo.classList.add("testo");
        titolo.classList.add("titolo");
        descrizione.classList.add("corpo");
        mostra.classList.add("bottone");
        nascondi.classList.add("bottone");
        nascondi.classList.add("hide");
        descrizione.classList.add("hide");
        stella.classList.add("stella");

        stella.src = stellaVuota;
        titolo.textContent = title;
        descrizione.textContent = description;
        link.href = redirect_url;
        link.textContent = "Link Offerta";
        mostra.textContent = "Mostra Descrizione";
        nascondi.textContent = "Nascondi Descrizione";

        mostra.addEventListener("click", mostraDescrizione);
        nascondi.addEventListener("click", nascondiDescrizione);
        stella.addEventListener("click", aggiungiPreferiti);


        testo.appendChild(link);
        testo.appendChild(titolo);
        testo.appendChild(descrizione);
        testo.appendChild(mostra);
        testo.appendChild(nascondi);
        contenitore.appendChild(testo);
        contenitore.appendChild(stella);



        main.appendChild(contenitore);
        numOfferte++;
    }
}

function onResponse(response){
    console.log('Risposta ricevuta');
    return response.json();
}
cercaLavoro();

//////////////////////////

// All'apertura della pagina, richiediamo il

const endpoint_token = 'https://pfa.foreca.com/authorize/token?'
let token_data;
let user="luca1996ct";
let password="tgIfdOxcFBCr";

rest_url= endpoint_token + "user=" + user + "&password=" + password;
//ora eseguiamo il fetch:
fetch(rest_url).then(onTokenResponse).then(getToken);
console.log(token_data)


function getToken(json)
{
    token_data = json;
    console.log(json)
    meteo();
}

function onTokenResponse(response) {
    return response.json();
}
