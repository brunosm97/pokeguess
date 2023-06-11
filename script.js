const guessButton = document.getElementById('guess-button');
const guessInput = document.getElementById('pokemon');
let index = 0;
let selectedPokemon;
let correct = false;

// {"index":1,"name":"Bulbasaur","image_url":"http://serebii.net/xy/pokemon/001.png","types":["grass","poison"],
// "evolutions": [{"pokemon":2,"event":"level-16"}],"moves":[{"level":"—","name":"Tackle","type":"normal",
// "category":"physical","attack":"50","accuracy":"100","pp":"35","effect_percent":"--",
// "description":"A physical attack in which the user charges and slams into the target with its whole body."}

// é um pokemon do tipo grass e poison
// ele tem duas evoluções
// aprende tal move
// primeira letra do seu nome é B
// tem 9 letras no nome

const formatListItem = (element) => {
    element.style.backgroundColor = 'white';
    element.style.color = '#FF00B8';
    element.style.outline = '5px solid #FF00B8';
    guessInput.value = ''
}

const checkAnswer = () => {
    if (selectedPokemon.name.toLowerCase() === guessInput.value.toLowerCase()) {
        return true;
    }
    return false;
};

const showTips = (pokemon) => {
    if(checkAnswer() && index !== 'end') {
        index = 'correct';
    }

    const itens = document.getElementsByTagName("li");
    switch (index) {
        case 0:
            itens[index].textContent = `${pokemon.types}`;
            formatListItem(itens[index])
            index++;
            break;
        case 1:
            itens[index].textContent = generatePokemonEvolutionsString(pokemon);
            formatListItem(itens[index])
            index++;
            break;
        case 2:
            itens[index].textContent = pokemon.name[0];
            formatListItem(itens[index])
            index++;
            break;
        case 3:
            itens[index].textContent = pokemon.name.length;
            formatListItem(itens[index])
            index++;
            break;
        case 4:
            itens[index].innerText = '';
            const pokemonImage = document.createElement('img');
            pokemonImage.classList.add('hidden-pokemon');
            pokemonImage.setAttribute('src', pokemon.image_url);
            itens[index].appendChild(pokemonImage);
            formatListItem(itens[index])
            index = 'game-over'
            break;
        case 'game-over':
            guessButton.innerText = 'Play Again';
            guessInput.value = pokemon.name;
            guessInput.setAttribute('disabled', '');
            index = 'end';
            break;
        case 'correct':
            guessButton.innerText = 'Play Again';
            guessInput.value = pokemon.name;
            guessInput.setAttribute('disabled', '');
            guessInput.classList.add('correct');
            index = 'end';
            break;
        case 'end':
            resetGame();
            break;
    }
};

const getRandomPokemon = () => {
    let randomIndex = Math.floor(Math.random() * 151);
    return pokedex[randomIndex];
};

const resetGame = () => {
    window.location.reload();
};

const generatePokemonEvolutionsString = (pokemon) => {
    if (pokemon.evolutions.length === 0) {
        return 'No evolutions';
    }
    console.log(pokemon);
    return 'Has evolutions';
};

guessButton.addEventListener('click', () => {
    showTips(selectedPokemon);
});


window.onload = () => {
    selectedPokemon = getRandomPokemon();
}
