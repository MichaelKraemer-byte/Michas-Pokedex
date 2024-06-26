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


async function goNextPokemon() {
    let showContainer = document.getElementById('showContainer');
    if (currentPokemon['id'] == 1025) {
    let POKE_Response = await fetch(BASE_URL + `/1/`);
    currentPokemon['pokemonData'] = await POKE_Response.json();
    } else {
    let POKE_Response = await fetch(BASE_URL + `/${(parseFloat(currentPokemon['id'])) + 1 }/`);
    currentPokemon['pokemonData'] = await POKE_Response.json();
    }
    let POKE_ResponseToJson = currentPokemon['pokemonData'];

    fillOutCurrentPokemonJSON(POKE_ResponseToJson);
    console.log(currentPokemon);

    showContainer.innerHTML = /*html*/`
        <div class="${currentPokemon['types'][0]} cardShow "> 
            <div class="titleContainer">
                <h2 class="capitalize showH2">${currentPokemon['name']}</h2>
                <h2 class="whiteLetters">#${currentPokemon['id']}</h2>
            </div>
            <img class="showImg glitter" src="${POKE_ResponseToJson['sprites']['other']['official-artwork']['front_default']}" alt="${currentPokemon['name']}-Picture">
            <div id="${currentPokemon['name']}DescriptionContent">
                <div id="${currentPokemon['name']}FirstStatsPage" class="statsContainer">
                    
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
                <div id="${currentPokemon['name']}SecondStatsPage" class="secondStatsContainer d-none">
                    <div class="descriptionContainer">
                        <h3 class="whiteLetters">Abilities:</h3>
                        <div class="baseInfoContainer whiteLetters">
                            ${currentPokemon['abilities'].map(ability => `<div><i class="type capitalize">${ability}</i></div>`).join('')}
                        </div>
                        <h3 class="whiteLetters">Types:</h3>
                        <div class="baseInfoContainer whiteLetters">
                            ${currentPokemon['types'].map(type => `<div class="type"><i class="capitalize">${type}</i><img class="baseTypeImg" src="img/${type}.png"></div>`).join('')}
                        </div>
                        <button onclick="firstStatsPage('${currentPokemon['name']}')" id="firstStatsPageButton" class="arrowButtonLeft">
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


async function goBackPokemon() {
    let showContainer = document.getElementById('showContainer');
    if (currentPokemon['id'] == 1) {
    let POKE_Response = await fetch(BASE_URL + `/1025/`);
    currentPokemon['pokemonData'] = await POKE_Response.json();
    } else {
    let POKE_Response = await fetch(BASE_URL + `/${(parseFloat(currentPokemon['id'])) - 1 }/`);
    currentPokemon['pokemonData'] = await POKE_Response.json();
    }
    let POKE_ResponseToJson = currentPokemon['pokemonData'];

    fillOutCurrentPokemonJSON(POKE_ResponseToJson);
    console.log(currentPokemon);

    showContainer.innerHTML = /*html*/`
        <div class="${currentPokemon['types'][0]} cardShow "> 
            <div class="titleContainer">
                <h2 class="capitalize showH2">${currentPokemon['name']}</h2>
                <h2 class="whiteLetters">#${currentPokemon['id']}</h2>
            </div>
            <img class="showImg glitter" src="${POKE_ResponseToJson['sprites']['other']['official-artwork']['front_default']}" alt="${currentPokemon['name']}-Picture">
            <div id="${currentPokemon['name']}DescriptionContent">
                <div id="${currentPokemon['name']}FirstStatsPage" class="statsContainer">
                    
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
                <div id="${currentPokemon['name']}SecondStatsPage" class="secondStatsContainer d-none">
                    <div class="descriptionContainer">
                        <h3 class="whiteLetters">Abilities:</h3>
                        <div class="baseInfoContainer whiteLetters">
                            ${currentPokemon['abilities'].map(ability => `<div><i class="type capitalize">${ability}</i></div>`).join('')}
                        </div>
                        <h3 class="whiteLetters">Types:</h3>
                        <div class="baseInfoContainer whiteLetters">
                            ${currentPokemon['types'].map(type => `<div class="type"><i class="capitalize">${type}</i><img class="baseTypeImg" src="img/${type}.png"></div>`).join('')}
                        </div>
                        <button onclick="firstStatsPage('${currentPokemon['name']}')" id="firstStatsPageButton" class="arrowButtonLeft">
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
                <h2 class="whiteLetters showNumber">#${POKE_ResponseToJson['id']}</h2>
            </div>
            <img class="baseImg" src="${POKE_ResponseToJson['sprites']['other']['official-artwork']['front_default']}" alt="">
            <div class="descriptionContainer">
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
            <div class="cardFooter whiteLetters">
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

    document.body.classList.add("remove-scrolling");
    document.getElementById('shadowContainer').classList.remove('d-none');
    document.getElementById('shadowLayer').classList.remove('d-none');
    document.getElementById('shadowLayer').classList.add('d-block');
    showContainer = document.getElementById('showContainer');
    showContainer.classList.remove('d-none');
    showContainer.classList.add('d-block');

    let hpInPercent = (POKE_ResponseToJson['stats'][0]['base_stat'] / 255) * 100;
    let attackInPercent = (POKE_ResponseToJson['stats'][1]['base_stat'] / 190) * 100;
    let defenseInPercent = (POKE_ResponseToJson['stats'][2]['base_stat'] / 230) * 100;
    let specialAttackInPercent = (POKE_ResponseToJson['stats'][3]['base_stat'] / 194) * 100;
    let specialDefenseInPercent = (POKE_ResponseToJson['stats'][4]['base_stat'] / 230) * 100;
    let speedInPercent = (POKE_ResponseToJson['stats'][5]['base_stat'] / 180) * 100;

    fillOutCurrentPokemonJSON(POKE_ResponseToJson);

    showContainer.innerHTML = /*html*/`
        <div class="${types[0]} cardShow "> 
            <div class="titleContainer">
                <h2 class="capitalize showH2">${pokemonName}</h2>
                <h2 class="whiteLetters">#${POKE_ResponseToJson['id']}</h2>
            </div>
            <img class="showImg glitter loaded" src="${POKE_ResponseToJson['sprites']['other']['official-artwork']['front_default']}" alt="${pokemonName}">
            <div id="${pokemonName}DescriptionContent">
                <div id="${pokemonName}FirstStatsPage" class="statsContainer">
                    
                    <div class="statsBarContainer">
                        <p class="statsCategory capitalize">${POKE_ResponseToJson['stats'][0]['stat']['name']}:</p>
                        <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="" aria-valuemin="0" aria-valuemax="100">
                            <div class="Hp-color glitterStats" style="width: ${hpInPercent}%;">
                                <p class="statsNumber">${POKE_ResponseToJson['stats'][0]['base_stat']}</p>
                            </div>
                        </div>
                    </div>

                    <div class="statsBarContainer">
                        <p class="statsCategory capitalize">${POKE_ResponseToJson['stats'][1]['stat']['name']}:</p>
                        <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="" aria-valuemin="0" aria-valuemax="100">
                            <div class="Attack-color glitterStats" style="width: ${attackInPercent}%;">
                                <p class="statsNumber">${POKE_ResponseToJson['stats'][1]['base_stat']}</p>
                            </div>
                        </div>
                    </div>

                    <div class="statsBarContainer">
                        <p class="statsCategory capitalize">${POKE_ResponseToJson['stats'][2]['stat']['name']}:</p>
                        <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="" aria-valuemin="0" aria-valuemax="100">
                            <div class="Defense-color glitterStats" style="width: ${defenseInPercent}%;">
                                <p class="statsNumber">${POKE_ResponseToJson['stats'][2]['base_stat']}</p>
                            </div>
                        </div>
                    </div>
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
                        <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="" aria-valuemin="0" aria-valuemax="100">
                            <div class="Special-Attack-color glitterStats" style="width: ${specialAttackInPercent}%;">
                                <p class="statsNumber">${POKE_ResponseToJson['stats'][3]['base_stat']}</p>
                            </div>
                        </div>
                    </div>

                    <div class="statsBarContainer">
                        <p class="statsCategory capitalize">${POKE_ResponseToJson['stats'][4]['stat']['name']}:</p>
                        <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="" aria-valuemin="0" aria-valuemax="100">
                            <div class="Special-Defense-color glitterStats" style="width: ${specialDefenseInPercent}%;">
                                <p class="statsNumber">${POKE_ResponseToJson['stats'][4]['base_stat']}</p>
                            </div>
                        </div>
                    </div>

                    <div class="statsBarContainer">
                        <p class="statsCategory capitalize">${POKE_ResponseToJson['stats'][5]['stat']['name']}:</p>
                        <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="" aria-valuemin="0" aria-valuemax="100">
                            <div class="Speed-color glitterStats" style="width: ${speedInPercent}%;">
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

    // Neue Pokemon anzeigen
    renderNewPokemon(newPokemonNames);
}


async function renderNewPokemon(pokemonNames) {
    let content = document.getElementById('content');
    let fragment = document.createDocumentFragment();

    // Daten für jedes neue Pokemon abrufen und anzeigen
    for (let i = 0; i < pokemonNames.length; i++) {
        const pokemonId = listedPokemon.length - pokemonNames.length + i + 1; // Basis auf der Anzahl der bereits vorhandenen Pokémon
        const pokemonResponse = await fetch(`${BASE_URL}/${pokemonId}`);
        const pokemonData = await pokemonResponse.json();

        let abilities = pokemonData['abilities'].map(ability => ability.ability.name);
        let types = pokemonData['types'].map(type => type.type.name);
        let cries = pokemonData['cries']['latest'];
        let pokeWeight = pokemonData['weight'] / 10;

        let pokemonCard = document.createElement('div');
        pokemonCard.classList.add('card', types[0]);
        pokemonCard.id = pokemonNames[i];
        pokemonCard.onclick = function() {
            showPokemon(pokemonNames[i], pokemonData, abilities, types, cries, pokeWeight);
        };
        pokemonCard.innerHTML = /*html*/`
            <div class="titleContainer">
                <h2 class="capitalize whiteLetters">${pokemonNames[i]}</h2>
                <h2 class="whiteLetters">#${pokemonData['id']}</h2>
            </div>
            <img class="baseImg" src="${pokemonData['sprites']['other']['official-artwork']['front_default']}" alt="${pokemonNames[i]}">
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
        fragment.appendChild(pokemonCard); 
    }
    content.appendChild(fragment); 
    document.getElementById('loadingCircle').style.display = 'none';
    document.getElementById('moreButton').style.display='block';
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


async function filterPokemon() {
    let search = document.getElementById('search').value.toLowerCase();
    let content = document.getElementById('content');
    
    // Prüfen, ob die Elemente gefunden wurden
    if (search == '') {
        // Fehlermeldung anzeigen
        renderFirst20PokemonWhenEmptyInput();
        return;
    }
    // Nur die Suche ausführen, wenn der Suchbegriff mindestens drei Zeichen hat
    if (search.length <= 2) {
        return;
    }
    content.innerHTML = '';
    document.getElementById('loadingCircle').style.display = 'flex';

    // Abfrage für das aktuelle Suchergebnis
    const searchResponse = await fetch(`${BASE_URL}?limit=1025&offset=0`);
    const searchData = await searchResponse.json();
    const allPokemonData = searchData.results.map(pokemon => pokemon.name);
    let filteredPokemon = allPokemonData.filter(name => name.includes(search));

    if (!filteredPokemon) {
        setTimeout(() => {
            document.getElementById('loadingCircle').style.display = 'none';
            content.innerHTML = /*html*/`
            <h3 class="whiteLetters">Unfortunately there was nothing found for your search, please try again.<br>Look for at least 3 letters...</h3>
        `;
        document.getElementById('moreButton').style.display='none';
        }, 2000);
        return;
    }

    // Filtern der Pokémon

    filteredPokemon = filteredPokemon.slice(0, 10);

    // Anzeigen der passenden Pokémon
    let fragment = document.createDocumentFragment();

    for (let name of filteredPokemon) {
        // Prüfen, ob das Pokémon bereits gerendert wurde
        if (!document.getElementById(name)) {
            const pokemonResponse = await fetch(`${BASE_URL}/${name}/`);
            const pokemonData = await pokemonResponse.json();

            let abilities = pokemonData['abilities'].map(ability => ability.ability.name);
            let types = pokemonData['types'].map(type => type.type.name);
            let cries = pokemonData['cries']['latest'];
            let pokeWeight = pokemonData['weight'] / 10;

            let pokemonCard = document.createElement('div');
            pokemonCard.classList.add('card', types[0]);
            pokemonCard.id = name;
            pokemonCard.onclick = function() {
                showPokemon(name, pokemonData, abilities, types, cries, pokeWeight);
            };
            pokemonCard.innerHTML = /*html*/`
                <div class="titleContainer">
                    <h2 class="capitalize whiteLetters">${name}</h2>
                    <h2 class="whiteLetters">#${pokemonData['id']}</h2>
                </div>
                <img class="baseImg" src="${pokemonData['sprites']['other']['official-artwork']['front_default']}" alt="${name}-picture">
                <div class="descriptionContainer">
                    <h3 class="whiteLetters">Abilities:</h3>
                    <div class="baseInfoContainer whiteLetters">
                        ${abilities.map(ability => `<div><i class="type capitalize">${ability}</i></div>`).join('')}
                    </div>
                    <h3 class="whiteLetters">Types:</h3>
                    <div class="baseInfoContainer whiteLetters">
                        ${types.map(type => `<div class="type"><i class="capitalize">${type}</i><img class="baseTypeImg" src="img/${type}.png"></div>`).join('')}
                    </div>
                </div>
                <div class="cardFooter whiteLetters">
                    <div>
                        <button class="soundButton" onclick="playSound('${cries}')"><img class="soundPNG" src="img/sound.png"></button>
                    </div>
                    <p class="pokeWeight">Weight: <b> ${pokeWeight} kg</b></p>
                </div>
            `;
            fragment.appendChild(pokemonCard);
        }
    }
    content.appendChild(fragment);
    document.getElementById('loadingCircle').style.display = 'none';
    document.getElementById('moreButton').style.display='none';
}