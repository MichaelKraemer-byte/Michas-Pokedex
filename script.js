function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
}


let pokeAmount = "20";
let BASE_URL = `https://pokeapi.co/api/v2/pokemon`;

const colorClasses = ['grass', 'bug', 'fire', 'water', 'electric', 'normal', 'psychic', 'flying', 'poison', 'ground', 'rock', 'electric', 'fighting', 'ice', 'steel', 'dark', 'dragon', 'ghost', 'fairy'];

const pokemonColors = [
    ['grass', 'grass'],
    ['bug', 'bug'],
    ['fire', 'fire'],
    ['water', 'water'],
    ['electric', 'electric'],
    ['normal', 'normal'],
    ['psychic', 'psychic'],
    ['flying', 'flying'],
    ['poison', 'poison'],
    ['ground', 'ground'],
    ['rock', 'rock'],
    ['electric', 'electric'],
    ['fighting', 'fighting'],
    ['ice', 'ice'],
    ['steel', 'steel'],
    ['dark', 'dark'],
    ['dragon', 'dragon'],
    ['ghost', 'ghost'],
    ['fairy', 'fairy']
];

let allPokemon = [];

async function getData() {
    BASE_Response = await fetch(BASE_URL + `?limit=${pokeAmount}&offset=0`);
    BASE_ResponseToJson = await BASE_Response.json();
    allPokemon = BASE_ResponseToJson['results'].map(resutls => resutls.name);
    renderPokemon(BASE_ResponseToJson);
}

async function renderPokemon(BASE_ResponseToJson) {
    let content = document.getElementById('content');
    let pokemon = BASE_ResponseToJson['results'];
    let fragment = document.createDocumentFragment(); // Fragment wird hier erstellt und zu fragment definiert. Fragment ist quasi ein leeres Behaeltnis auf das so nach Definition mit einer Variabel zugegriffen werden kann.
    

    for (let pokeIndex = 1; pokeIndex <= parseFloat(pokeAmount); pokeIndex++) {
        POKE_Response = await fetch(BASE_URL + `/${pokeIndex}/`);
        let POKE_ResponseToJson = await POKE_Response.json();

        let abilities = POKE_ResponseToJson['abilities'].map(ability => ability.ability.name);
                 // .map() erstellt ein neues array. // dieses array wird als Variabel "abilities" defineirt.
         // .map() ist eine einfache moeglichkeit mit einer arrowfunction durch ein array zu iterieren.
         // Hierbei wird abilities = [Faehigkeitsname1, Faehigkeitsname2, Faehigkeitsname3 ...] bis es keine Faehigkeiten mehr gibt, 
         // aus "POKE_ResponseToJson['abilities']". 
         // "(ability => ability.ability.name)" ist wie folgt zu verstehen: 
         // Das erste ability ist der name der arrow function. 
         // Diese Function wird nach dem Arrow definiert. 
         // Diese function laeuft dann durch jedes Object, innerhalb von "POKE_ResponseToJson['abilities']" . Denn wir iterieren mit .map ja dadurch.
         // Dabei sucht es nach unserer Definition ability.ability.name. Das heisst: das zweite ability ist dabei einfach eine Variabel
         // fuer das jeweilige Objekt (JSON) - die Stelle im Array "POKE_ResponseToJson['abilities']". 
         // Diese Variabel wird einfach als Wort definiert, da wir diese nutzen um immer wieder durch das Array "POKE_ResponseToJson['abilities']" zu iterieren.
         // Und das dritte ability ist einfach der Schluessel "ability", gefolgt von einem weiteren JSON mit einem Schluesseln "name".
         // auf dieses 'name' greifen wir also mit .map immer wieder zu, und fuegen es unserem neuen Array abilities zu, bis es kein weiteres element name mehr gibt, dass wir hinzufuegen koennen.
        let types = POKE_ResponseToJson['types'].map(type => type.type.name);
        let cries = POKE_ResponseToJson['cries']['latest'];

        // Einzelnes HTML-Element erstellen
        let pokemonCard = document.createElement('div');
        pokemonCard.className = 'card';
        pokemonCard.id = pokemon[pokeIndex - 1]['name'];
        pokemonCard.innerHTML = /*html*/`
            <h2 class="capitalize whiteLetters">${pokemon[pokeIndex - 1]['name']}</h2>
            <img class="baseImg" src="${POKE_ResponseToJson['sprites']['other']['dream_world']['front_default']}" alt="">
            <div class="descriptionContainer">
                <h3 class="whiteLetters">Abilities:</h3>
                <div class="baseInfoContainer whiteLetters">
                    ${abilities.map(ability => `<div class="width-50-percent"><i class="type capitalize">${ability}</i></div>`).join('')}
                    <!-- Hier passiert wieder mit map folgendes: Wir wandeln die Werte in dem array abilites in <p></p> Elemente um, 
                    Dann wandeln wir das Array mit diesen <p>-Elementen in einen einzelnen String um - mit .join(''). 
                    (In die Klammern von join koennten wir noch weitere Elemente einfuegen, wenn wir wollten...) -->
                </div>
                <h3 class="whiteLetters">Types:</h3>
                <div class="baseInfoContainer whiteLetters">
                    ${types.map(type => `<div class="width-50-percent"><i class="type capitalize">${type}</i></div>`).join('')}
                </div>
                <div class="baseInfoContainer whiteLetters">
                    <button class="soundButton" onclick="playSound('${cries}')"><img class="soundPNG" src="img/sound.png"></button>
                </div>
            </div>
        `;
        // wir erstellen lauter pokemonCarten die dann immer einzeln
        // dem fragment hinzugefuegt werden:
        fragment.appendChild(pokemonCard); // hinzufeugen der pokemonCard zum Fragment.
    }
    document.getElementById('loadingCircle').style.display='none';
    // zum Schluss fuegen wir das grosse aufgebaute Fragment zum DOM-Baum hinzu:
    content.appendChild(fragment); 
    applyColors();
    renderMoreButton();
}

function morePokemon() {
    let pokeAmount = parseFloat(pokeAmount);
    pokeAmount + 20;
    console.log(pokeAmount);
}

function renderMoreButton(){
    let moreButton = document.createElement('div');
    moreButton.innerHTML = /*html*/`
        <div>
            <button class="yellowButton" onclick="morePokemon()">See more Pokemon</button>
        </div>
    `;
    content.appendChild(moreButton);
}

function playSound(soundURL) {
    let AUDIO = new Audio(soundURL);
    AUDIO.play();
}

function applyColors() {
    let iElements = document.querySelectorAll('i');
    pokemonColors.forEach(([type, color]) => {
        applyColor(iElements, type, color);
    });
}

function applyColor(iElements, type, color) {
    iElements.forEach(element => {
        if (element.innerHTML.includes(type) && !colorClasses.some(c => element.closest('.card').classList.contains(c))) {
            // Die Bedingung besagt es muss zuerst sicher gestellt sein das der type vorhanden ist, der von der applyColor funktion mitgegeben wird.
            // && und wird sichergestellt, ob nicht schon eine Klasse mit einem Wert aus colorClasses in der Card existiert. 
            let card = element.closest('.card');
            card.classList.add(color);
            // Dann wird dieser card diese Klasse hinzugefuegt (die die Farbe bestimmt).
        }
    });
}

function filterPokemon(){
    let search = document.getElementById('search').value.toLowerCase();

    let cards = document.querySelectorAll('.card'); // Alle Karten sammeln

    cards.forEach(card => {
        if (search.length >= 3 && card.id.includes(search)) {
            card.style.display = "flex"; // Pokémon gefunden, Karte anzeigen
        } else if (search.length >= 3) {
            card.style.display = "none"; // Pokémon nicht gefunden, Karte ausblenden
        } if (search.length <= 2) {
            card.style.display = "flex";
        }
    });
}