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

let listedPokemon = [];


let currentPokemon = {
        pokemonData: '',
        id: '',
        name: '',
        types: [],
        abilities: [],
        cries: '',
        weight: '',
        hpInPercent: '',
        attackInPercent: '',
        defenseInPercent: '',
        specialAttackInPercent: '',
        specialDefenseInPercent: '',
        speedInPercent: '',
}


async function changePokemon(direction) {
    let showContainer = document.getElementById('showContainer');
    let id = parseInt(currentPokemon.id); // Konvertiere die ID in eine Zahl
    if (direction === 'next') {
        id = (id == 1025) ? 1 : id + 1;
    } else if (direction === 'back') {
        id = (id == 1) ? 1025 : id - 1;
    }

    let POKE_Response = await fetch(`${BASE_URL}/${id}/`);
    let POKE_ResponseToJson = await POKE_Response.json();
    
    fillOutCurrentPokemonJSON(POKE_ResponseToJson);

    showContainer.innerHTML = renderPokemonDetailsForNextOrBack(POKE_ResponseToJson);
}

function renderPokemonDetailsForNextOrBack(POKE_ResponseToJson) {
    return /*html*/`
        <div class="${currentPokemon.types[0]} cardShow "> 
            <div class="showTitleContainer">
                <h2 class="capitalize showH2">${currentPokemon.name}</h2>
                <h2 class="whiteLetters">#${currentPokemon.id}</h2>
            </div>
            <img class="showImg glitter" src="${currentPokemon['pokemonData']['sprites']['other']['official-artwork']['front_default']}" alt="${currentPokemon.name}-Picture">
            <div id="${currentPokemon.name}DescriptionContent">
                <div id="${currentPokemon.name}FirstStatsPage" class="statsContainer">
                    <div class="statsBarContainer">
                        <p class="statsCategory capitalize">${POKE_ResponseToJson['stats'][0]['stat']['name']}:</p>
                        <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="" aria-valuemin="0" aria-valuemax="100">
                            <div class="Hp-color glitterStats" style="width: ${currentPokemon['hpInPercent']}%;">
                                <p class="statsNumber">${POKE_ResponseToJson['stats'][0]['base_stat']}</p>
                            </div>
                        </div>
                    </div>

                    <div class="statsBarContainer">
                        <p class="statsCategory capitalize">${POKE_ResponseToJson['stats'][1]['stat']['name']}:</p>
                        <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="" aria-valuemin="0" aria-valuemax="100">
                            <div class="Attack-color glitterStats" style="width: ${currentPokemon['attackInPercent']}%;">
                                <p class="statsNumber">${POKE_ResponseToJson['stats'][1]['base_stat']}</p>
                            </div>
                        </div>
                    </div>

                    <div class="statsBarContainer">
                        <p class="statsCategory capitalize">${POKE_ResponseToJson['stats'][2]['stat']['name']}:</p>
                        <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="" aria-valuemin="0" aria-valuemax="100">
                            <div class="Defense-color glitterStats" style="width: ${currentPokemon['defenseInPercent']}%;">
                                <p class="statsNumber">${POKE_ResponseToJson['stats'][2]['base_stat']}</p>
                            </div>
                        </div>
                    </div>

                    <button onclick="secondStatsPage('${currentPokemon.name}')" class="arrowButton">
                        <div class="halfCircle"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 17l5-5-5-5v10z"/>
                        </svg>
                        <div class="stripe"></div>
                    </button>
                    
                    <div class="statsBarContainer">
                        <p class="statsCategory capitalize">${POKE_ResponseToJson['stats'][3]['stat']['name']}:</p>
                        <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="" aria-valuemin="0" aria-valuemax="100">
                            <div class="Special-Attack-color glitterStats" style="width: ${currentPokemon['specialAttackInPercent']}%;">
                                <p class="statsNumber">${POKE_ResponseToJson['stats'][3]['base_stat']}</p>
                            </div>
                        </div>
                    </div>

                    <div class="statsBarContainer">
                        <p class="statsCategory capitalize">${POKE_ResponseToJson['stats'][4]['stat']['name']}:</p>
                        <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="" aria-valuemin="0" aria-valuemax="100">
                            <div class="Special-Defense-color glitterStats" style="width: ${currentPokemon['specialDefenseInPercent']}%;">
                                <p class="statsNumber">${POKE_ResponseToJson['stats'][4]['base_stat']}</p>
                            </div>
                        </div>
                    </div>

                    <div class="statsBarContainer">
                        <p class="statsCategory capitalize">${POKE_ResponseToJson['stats'][5]['stat']['name']}:</p>
                        <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="" aria-valuemin="0" aria-valuemax="100">
                            <div class="Speed-color glitterStats" style="width: ${currentPokemon['speedInPercent']}%;">
                                <p class="statsNumber">${POKE_ResponseToJson['stats'][5]['base_stat']}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="${currentPokemon.name}SecondStatsPage" class="secondStatsContainer d-none">
                    <div class="descriptionContainer">
                        <h3 class="whiteLetters">Abilities:</h3>
                        <div class="baseInfoContainer whiteLetters">
                            ${currentPokemon.abilities.map(ability => `<div><i class="type capitalize">${ability}</i></div>`).join('')}
                        </div>
                        <h3 class="whiteLetters">Types:</h3>
                        <div class="baseInfoContainer whiteLetters">
                            ${currentPokemon.types.map(type => `<div class="type"><i class="capitalize">${type}</i><img class="baseTypeImg" src="img/${type}.png"></div>`).join('')}
                        </div>
                        <button onclick="firstStatsPage('${currentPokemon.name}')" id="firstStatsPageButton" class="arrowButtonLeft">
                            <div class="halfCircleLeft"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path d="M15 17l-5-5 5-5v10z"/>
                            </svg>
                            <div class="stripeLeft"></div>
                        </button>
                    </div>
                    <div class="cardFooter whiteLetters">
                        <div>
                            <button class="soundButton" onclick="playSound('${currentPokemon.cries}')"><img class="soundPNG" src="img/sound.png"></button>
                        </div>
                        <p class="pokeWeight">Weight: <b> ${currentPokemon.weight} kg</b></p>
                    </div>
                </div>
            </div>
        </div>`;
}


async function getData() {
    document.getElementById('moreButton').style.display='none';
    BASE_Response = await fetch(BASE_URL + `?limit=${pokeAmount}&offset=0`);
    BASE_ResponseToJson = await BASE_Response.json();
    listedPokemon = BASE_ResponseToJson['results'].map(results => results.name);
    renderPokemon(BASE_ResponseToJson);
}


async function renderPokemon(BASE_ResponseToJson) {
    let content = document.getElementById('content');
    let pokemon = BASE_ResponseToJson['results'];
    let fragment = document.createDocumentFragment(); // Fragment wird hier erstellt und zu fragment definiert. Fragment ist quasi ein leeres Behaeltnis auf das so nach Definition mit einer Variabel zugegriffen werden kann.
    content.innerHTML = '';

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
        let pokeWeight = POKE_ResponseToJson['weight'] / 10;

        // Einzelnes HTML-Element erstellen
        let pokemonCard = document.createElement('div');
        pokemonCard.classList.add('card', types[0]);
        pokemonCard.id = pokemon[pokeIndex - 1]['name'];
        pokemonCard.onclick = function() {
            showPokemon(pokemon[pokeIndex - 1]['name'], POKE_ResponseToJson, abilities, types, cries, pokeWeight);
        };
        pokemonCard.innerHTML = /*html*/`
            <div class="titleContainer">
                <h2 class="capitalize whiteLetters">${pokemon[pokeIndex - 1]['name']}</h2>
                <h2 class="whiteLetters mobile-d-none">#${POKE_ResponseToJson['id']}</h2>
            </div>
            <img class="baseImg" src="${POKE_ResponseToJson['sprites']['other']['official-artwork']['front_default']}" alt="">
            <div class="mobile-d-none descriptionContainer">
                <h3 class="whiteLetters">Abilities:</h3>
                <div class="baseInfoContainer whiteLetters">
                    ${abilities.map(ability => `<div><i class="type capitalize">${ability}</i></div>`).join('')}
                    <!-- Hier passiert wieder mit map folgendes: Wir wandeln die Werte in dem array abilites in <p></p> Elemente um, 
                    Dann wandeln wir das Array mit diesen <p>-Elementen in einen einzelnen String um - mit .join(''). 
                    (In die Klammern von join koennten wir noch weitere Elemente einfuegen, wenn wir wollten...) -->
                </div>
                <h3 class="whiteLetters">Types:</h3>
                <div class="baseInfoContainer whiteLetters">
                    ${types.map(type => `<div class="type"><i class="capitalize">${type}</i><img class="baseTypeImg" src="img/${type}.png"></div>`).join('')}
                </div>
            </div>
            <div class="mobile-d-none cardFooter whiteLetters">
                <div>
                    <button class="soundButton" onclick="playSound('${cries}')"><img class="soundPNG" src="img/sound.png"></button>
                </div>
                <p class="pokeWeight">Weight: <b> ${pokeWeight} kg</b></p>
            </div>
        `;
        // wir erstellen lauter pokemonCarten die dann immer einzeln
        // dem fragment hinzugefuegt werden:
        fragment.appendChild(pokemonCard); // hinzufeugen der pokemonCard zum Fragment.
    }
    document.getElementById('loadingCircle').style.display='none';
    // zum Schluss fuegen wir das grosse aufgebaute Fragment zum DOM-Baum hinzu:
    content.appendChild(fragment); 
    document.getElementById('moreButton').style.display='block';
}


async function showPokemon(pokemonName, POKE_ResponseToJson, abilities, types, cries, weight) {
    fillOutCurrentPokemonJSON(POKE_ResponseToJson);
    setupAndManipulateDOM();
    const statPercentages = calculateStatPercentages(POKE_ResponseToJson);
    renderPokemonDetails(pokemonName, POKE_ResponseToJson, abilities, types, cries, weight, statPercentages);
}


function setupAndManipulateDOM() {
    document.body.classList.add("remove-scrolling"); 
    const shadowContainer = document.getElementById('shadowContainer');
    const shadowLayer = document.getElementById('shadowLayer');
    shadowContainer.classList.remove('d-none');
    shadowLayer.classList.remove('d-none');
    shadowLayer.classList.add('d-block');
    const showContainer = document.getElementById('showContainer');
    showContainer.classList.remove('d-none');
    showContainer.classList.add('d-block');
}


function calculateStatPercentages(POKE_ResponseToJson) {
    const stats = POKE_ResponseToJson['stats'];
    return {
        hpInPercent: (stats[0]['base_stat'] / 255) * 100,
        attackInPercent: (stats[1]['base_stat'] / 190) * 100,
        defenseInPercent: (stats[2]['base_stat'] / 230) * 100,
        specialAttackInPercent: (stats[3]['base_stat'] / 194) * 100,
        specialDefenseInPercent: (stats[4]['base_stat'] / 230) * 100,
        speedInPercent: (stats[5]['base_stat'] / 180) * 100
    };
}


function renderPokemonDetails(pokemonName, POKE_ResponseToJson, abilities, types, cries, weight, statPercentages) {
    const showContainer = document.getElementById('showContainer');
    const currentPokemon = {
        name: pokemonName,
        abilities: abilities,
        types: types,
        cries: cries,
        weight: weight
    };

    showContainer.innerHTML = /*html*/`
    <div class="${types[0]} cardShow "> 
        <div class="titleContainer space-between">
            <h2 class="capitalize showH2">${pokemonName}</h2>
            <h2 class="whiteLetters showNumber">#${POKE_ResponseToJson['id']}</h2>
        </div>
        <img class="showImg glitter loaded" src="${POKE_ResponseToJson['sprites']['other']['official-artwork']['front_default']}" alt="${pokemonName}">
        <div id="${pokemonName}DescriptionContent">
            <div id="${pokemonName}FirstStatsPage" class="statsContainer">
                <div class="statsBarContainer">
                    <p class="statsCategory capitalize">${POKE_ResponseToJson['stats'][0]['stat']['name']}:</p>
                    <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="${statPercentages.hpInPercent}" aria-valuemin="0" aria-valuemax="100">
                        <div class="Hp-color glitterStats" style="width: ${statPercentages.hpInPercent}%;">
                            <p class="statsNumber">${POKE_ResponseToJson['stats'][0]['base_stat']}</p>
                        </div>
                    </div>
                </div>
                <div class="statsBarContainer">
                    <p class="statsCategory capitalize">${POKE_ResponseToJson['stats'][1]['stat']['name']}:</p>
                    <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="${statPercentages.attackInPercent}" aria-valuemin="0" aria-valuemax="100">
                        <div class="Attack-color glitterStats" style="width: ${statPercentages.attackInPercent}%;">
                            <p class="statsNumber">${POKE_ResponseToJson['stats'][1]['base_stat']}</p>
                        </div>
                    </div>
                </div>
                <div class="statsBarContainer">
                    <p class="statsCategory capitalize">${POKE_ResponseToJson['stats'][2]['stat']['name']}:</p>
                    <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="${statPercentages.defenseInPercent}" aria-valuemin="0" aria-valuemax="100">
                        <div class="Defense-color glitterStats" style="width: ${statPercentages.defenseInPercent}%;">
                            <p class="statsNumber">${POKE_ResponseToJson['stats'][2]['base_stat']}</p>
                        </div>
                    </div>
                </div>
                <!-- More stat bars -->
                <button onclick="secondStatsPage('${currentPokemon['name']}')" class="arrowButton">
                    <div class="halfCircle"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M9 17l5-5-5-5v10z"/>
                    </svg>
                    <div class="stripe"></div>
                </button>

                <div class="statsBarContainer">
                    <p class="statsCategory capitalize">${POKE_ResponseToJson['stats'][3]['stat']['name']}:</p>
                    <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="${statPercentages.specialAttackInPercent}" aria-valuemin="0" aria-valuemax="100">
                        <div class="Special-Attack-color glitterStats" style="width: ${statPercentages.specialAttackInPercent}%;">
                            <p class="statsNumber">${POKE_ResponseToJson['stats'][3]['base_stat']}</p>
                        </div>
                    </div>
                </div>
                <div class="statsBarContainer">
                    <p class="statsCategory capitalize">${POKE_ResponseToJson['stats'][4]['stat']['name']}:</p>
                    <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="${statPercentages.specialDefenseInPercent}" aria-valuemin="0" aria-valuemax="100">
                        <div class="Special-Defense-color glitterStats" style="width: ${statPercentages.specialDefenseInPercent}%;">
                            <p class="statsNumber">${POKE_ResponseToJson['stats'][4]['base_stat']}</p>
                        </div>
                    </div>
                </div>
                <div class="statsBarContainer">
                    <p class="statsCategory capitalize">${POKE_ResponseToJson['stats'][5]['stat']['name']}:</p>
                    <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="${statPercentages.speedInPercent}" aria-valuemin="0" aria-valuemax="100">
                        <div class="Speed-color glitterStats" style="width: ${statPercentages.speedInPercent}%;">
                            <p class="statsNumber">${POKE_ResponseToJson['stats'][5]['base_stat']}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="${pokemonName}SecondStatsPage" class="secondStatsContainer d-none">
                <div class="descriptionContainer">
                    <h3 class="whiteLetters">Abilities:</h3>
                    <div class="baseInfoContainer whiteLetters">
                        ${currentPokemon['abilities'].map(ability => `<div><i class="type capitalize">${ability}</i></div>`).join('')}
                    </div>
                    <h3 class="whiteLetters">Types:</h3>
                    <div class="baseInfoContainer whiteLetters">
                        ${currentPokemon['types'].map(type => `<div class="type"><i class="capitalize">${type}</i><img class="baseTypeImg" src="img/${type}.png"></div>`).join('')}
                    </div>
                    <button onclick="firstStatsPage('${pokemonName}')" id="firstStatsPageButton" class="arrowButtonLeft">
                        <div class="halfCircleLeft"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M15 17l-5-5 5-5v10z"/>
                        </svg>
                        <div class="stripeLeft"></div>
                    </button>
                </div>
                <div class="cardFooter whiteLetters">
                    <div>
                        <button class="soundButton" onclick="playSound('${currentPokemon['cries']}')"><img class="soundPNG" src="img/sound.png"></button>
                    </div>
                    <p class="pokeWeight">Weight: <b> ${currentPokemon['weight']} kg</b></p>
                </div>
            </div>
        </div>
    </div>    
`;
}


function emptyCurrentPokemon(){
    currentPokemon = {
        pokemonData: '',
        id: '',
        name: '',
        types: [],
        abilities: [],
        cries: '',
        weight: '',
        hpInPercent: '',
        attackInPercent: '',
        defenseInPercent: '',
        specialAttackInPercent: '',
        specialDefenseInPercent: '',
        speedInPercent: '',
    }
}


function fillOutCurrentPokemonJSON(POKE_ResponseToJson) { 

    emptyCurrentPokemon();

    currentPokemon.pokemonData = POKE_ResponseToJson;
    currentPokemon.id = `${POKE_ResponseToJson['id']}`;
    currentPokemon.name = `${POKE_ResponseToJson['name']}`;
    currentPokemon.types.push(...(POKE_ResponseToJson['types'].map(type => type.type.name))); 
    currentPokemon.abilities.push(...(POKE_ResponseToJson['abilities'].map(ability => ability.ability.name))); 
    currentPokemon.cries = `${POKE_ResponseToJson['cries']['latest']}`;
    currentPokemon.weight = `${(POKE_ResponseToJson['weight'] / 10)}`;

    currentPokemon.hpInPercent = `${(POKE_ResponseToJson['stats'][0]['base_stat'] / 255) * 100}`;
    currentPokemon.attackInPercent = `${(POKE_ResponseToJson['stats'][1]['base_stat'] / 190) * 100})`;
    currentPokemon.defenseInPercent = `${(POKE_ResponseToJson['stats'][2]['base_stat'] / 230) * 100}`;
    currentPokemon.specialAttackInPercent = `${(POKE_ResponseToJson['stats'][3]['base_stat'] / 194) * 100}`;
    currentPokemon.specialDefenseInPercent = `${(POKE_ResponseToJson['stats'][4]['base_stat'] / 230) * 100})`;
    currentPokemon.speedInPercent = `${(POKE_ResponseToJson['stats'][5]['base_stat'] / 180) * 100}`;
}


function fillOutCurrentPokemonJSONWithoutEmptying(POKE_ResponseToJson) { 

    currentPokemon.pokemonData = `${POKE_ResponseToJson}`;
    currentPokemon.id = `${POKE_ResponseToJson['id']}`;
    currentPokemon.name = `${POKE_ResponseToJson['name']}`;
    currentPokemon.types.push(...(POKE_ResponseToJson['types'].map(type => type.type.name))); 
    currentPokemon.abilities.push(...(POKE_ResponseToJson['abilities'].map(ability => ability.ability.name))); 
    currentPokemon.cries = `${POKE_ResponseToJson['cries']['latest']}`;
    currentPokemon.weight = `${(POKE_ResponseToJson['weight'] / 10)}`;

    currentPokemon.hpInPercent = `${(POKE_ResponseToJson['stats'][0]['base_stat'] / 255) * 100}`;
    currentPokemon.attackInPercent = `${(POKE_ResponseToJson['stats'][1]['base_stat'] / 190) * 100})`;
    currentPokemon.defenseInPercent = `${(POKE_ResponseToJson['stats'][2]['base_stat'] / 230) * 100}`;
    currentPokemon.specialAttackInPercent = `${(POKE_ResponseToJson['stats'][3]['base_stat'] / 194) * 100}`;
    currentPokemon.specialDefenseInPercent = `${(POKE_ResponseToJson['stats'][4]['base_stat'] / 230) * 100})`;
    currentPokemon.speedInPercent = `${(POKE_ResponseToJson['stats'][5]['base_stat'] / 180) * 100}`;
}


function secondStatsPage(pokemonName) {
    let firstPage = document.getElementById(`${pokemonName}FirstStatsPage`);
    firstPage.style.display = 'none';

    let secondPage = document.getElementById(`${pokemonName}SecondStatsPage`);
    secondPage.classList.remove('d-none');
}


function firstStatsPage(pokemonName) {
    let secondPage = document.getElementById(`${pokemonName}SecondStatsPage`);
    let firstPage = document.getElementById(`${pokemonName}FirstStatsPage`);

    secondPage.classList.add('d-none');
    firstPage.style.display = 'flex';
}


function resume(){
    document.body.classList.remove("remove-scrolling"); 
    document.getElementById('shadowContainer').classList.add('d-none');
    document.getElementById('shadowLayer').classList.remove('d-block');
    document.getElementById('shadowLayer').classList.add('d-none');
    showContainer.classList.remove('d-block');
    showContainer.classList.add('d-none');

    currentPokemon = {
        name: '',
        types: [],
        abilities: [],
        cries: '',
        weight: '',
    }
}


async function morePokemon() {
    document.getElementById('moreButton').style.display = 'none';
    document.getElementById('loadingCircle').style.display = 'flex';

    pokeAmount = Number(pokeAmount);
    pokeAmount += 20; // Erhöhe die Anzahl der anzuzeigenden Pokemon

    // Neue Pokemon-Daten abrufen
    const newPokemonResponse = await fetch(`${BASE_URL}?limit=20&offset=${listedPokemon.length}`);
    const newPokemonData = await newPokemonResponse.json();
    const newPokemonNames = newPokemonData.results.map(pokemon => pokemon.name);

    // Neue Pokemon-Daten zur Liste aller Pokemon hinzufügen
    listedPokemon.push(...newPokemonNames);

    // Neue Pokemon anzeigen, nachdem alle Daten vollständig geladen sind
    await renderNewPokemon(newPokemonNames);

    // Ladeanimation und Button anzeigen
    document.getElementById('loadingCircle').style.display = 'none';
    document.getElementById('moreButton').style.display = 'block';
}

async function renderNewPokemon(pokemonNames) {
    let content = document.getElementById('content');
    let fragment = document.createDocumentFragment();

    // Daten für jedes neue Pokemon abrufen und anzeigen
    for (let i = 0; i < pokemonNames.length; i++) {
        const pokemonId = listedPokemon.length - pokemonNames.length + i + 1; // Basis auf der Anzahl der bereits vorhandenen Pokémon
        const pokemonResponse = await fetch(`${BASE_URL}/${pokemonId}`);
        const pokemonData = await pokemonResponse.json();

        // Erstelle eine Karte für das Pokémon und füge sie dem Fragment hinzu
        let pokemonCard = createPokemonCard(pokemonNames[i], pokemonData);
        fragment.appendChild(pokemonCard);
    }

    // Füge das Fragment zum Content-Bereich hinzu
    content.appendChild(fragment);
}

function createPokemonCard(pokemonName, pokemonData) {
    let abilities = pokemonData['abilities'].map(ability => ability.ability.name);
    let types = pokemonData['types'].map(type => type.type.name);
    let cries = pokemonData['cries']['latest'];
    let pokeWeight = pokemonData['weight'] / 10;

    let pokemonCard = document.createElement('div');
    pokemonCard.classList.add('card', types[0]);
    pokemonCard.id = pokemonName;
    pokemonCard.onclick = function() {
        showPokemon(pokemonName, pokemonData, abilities, types, cries, pokeWeight);
    };
    pokemonCard.innerHTML = /*html*/`
        <div class="titleContainer">
            <h2 class="capitalize whiteLetters">${pokemonName}</h2>
            <h2 class="whiteLetters mobile-d-none">#${pokemonData['id']}</h2>
        </div>
        <img class="baseImg" src="${pokemonData['sprites']['other']['official-artwork']['front_default']}" alt="${pokemonName}">
        <div class="descriptionContainer">
            <h3 class="whiteLetters">Abilities:</h3>
            <div class="baseInfoContainer whiteLetters">
                ${abilities.map(ability => `<div><i class="type capitalize">${ability}</i></div>`).join('')}
            </div>
            <h3 class="whiteLetters">Types:</h3>
            <div class="baseInfoContainer whiteLetters">
                ${types.map(type => `<div><i class="type capitalize">${type}</i></div>`).join('')}
            </div>
            <div class="cardFooter whiteLetters">
                <div>
                    <button class="soundButton" onclick="playSound('${cries}')"><img class="soundPNG" src="img/sound.png"></button>
                </div>
                <p class="pokeWeight">Weight: <b> ${pokeWeight} kg</b></p>
            </div>
        </div>
    `;

    return pokemonCard;
}


function playSound(soundURL) {
    let AUDIO = new Audio(soundURL);
    AUDIO.play();
}


async function renderFirst20PokemonWhenEmptyInput(){
    let search = document.getElementById('search').value.toLowerCase();    
    if (search == '') {
    document.getElementById('content').innerHTML = '';
    let BASE_Response = await fetch(BASE_URL + `?limit=${pokeAmount}&offset=0`);
    let BASE_ResponseToJson = await BASE_Response.json();
    loadingCircle();
    renderPokemon(BASE_ResponseToJson)
    }
}


function loadingCircle() {
    document.getElementById('loadingCircle').style.display='flex';
}


// Die Filterfunktion
async function filterPokemon() {
    let search = document.getElementById('search').value.toLowerCase();
    let content = document.getElementById('content');

    if (search == '') {
        renderFirst20PokemonWhenEmptyInput();
        return;
    }

    if (search.length <= 2) {
        return;
    }

    content.innerHTML = '';
    document.getElementById('loadingCircle').style.display = 'flex';

    const filteredPokemon = await fetchFilteredPokemon(search);

    if (!filteredPokemon || filteredPokemon.length === 0) {
        setTimeout(() => {
            displayNoResultsMessage();
        }, 2000);
        return;
    }

    displayFilteredPokemon(filteredPokemon);

    document.getElementById('loadingCircle').style.display = 'none';
    document.getElementById('moreButton').style.display = 'none';
}

async function fetchFilteredPokemon(search) {
    const searchResponse = await fetch(`${BASE_URL}?limit=1025&offset=0`);
    const searchData = await searchResponse.json();
    const allPokemonData = searchData.results.map(pokemon => pokemon.name);
    return allPokemonData.filter(name => name.includes(search)).slice(0, 10);
}

function displayNoResultsMessage() {
    const content = document.getElementById('content');
    content.innerHTML = /*html*/`
        <h3 class="whiteLetters">Unfortunately there was nothing found for your search, please try again.<br>Look for at least 3 letters...</h3>
    `;
    document.getElementById('moreButton').style.display = 'none';
}

async function displayFilteredPokemon(filteredPokemon) {
    const content = document.getElementById('content');
    let fragment = document.createDocumentFragment();

    for (let name of filteredPokemon) {
        if (!document.getElementById(name)) {
            const pokemonData = await fetchPokemonData(name);
            if (!pokemonData) continue;
            fragment.appendChild(createPokemonCard(name, pokemonData));
        }
    }

    content.appendChild(fragment);
}

async function fetchPokemonData(name) {
    try {
        const pokemonResponse = await fetch(`${BASE_URL}/${name}/`);
        return await pokemonResponse.json();
    } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        return null;
    }
}