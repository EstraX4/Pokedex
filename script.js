const pokeCard = document.querySelector("[data-poke-card]");
const pokeName = document.querySelector("[data-poke-name]");
const pokeImg = document.querySelector("[data-poke-img]");
const pokeImgContainer = document.querySelector("[data-poke-img-container]");
const pokeId = document.querySelector("[data-poke-id]");
const pokeTypes = document.querySelector("[data-poke-types]");
const pokeStats = document.querySelector("[data-poke-stats]");
const pokeImg2 = document.querySelector("[data-poke-img2]");

const typeColors = {
  electric: "#F9CF30",
  normal: "#AAA67F",
  fire: "#F57D31",
  water: "#6493EB",
  fairy: "#eb64d5",
  ice: "#AFEAFD",
  rock: "#999799",
  flying: "#7AE7C7",
  grass: "#74CB48",
  psychic: "#FB5584",
  ghost: "#70559B",
  bug: "#A7B723",
  poison: "#795663",
  ground: "#D2B074",
  dragon: "#1a113f",
  steel: "#B7B9D0",
  fighting: "#2F2F2F",
  default: "#2A1A1F",
  dark: "#2A1A1F",
};

const searchPokemon = (event) => {
  event.preventDefault();
  const { value } = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then((data) => data.json())
    .then((response) => renderPokemonData(response))
    .catch((err) => renderNotFound());
};

const renderPokemonData = (data) => {
  const sprite = data.sprites.front_default;
  const { stats, types } = data;

  pokeName.textContent = data.name;
  pokeImg.setAttribute("src", sprite);
  pokeId.textContent = `Nº ${data.id}`;
  setCardColor(types);
  renderPokemonTypes(types);
  renderPokemonStats(stats);
};

const setCardColor = (types) => {
  const colorOne = typeColors[types[0].type.name];
  const colorTwo = types[1]
    ? typeColors[types[1].type.name]
    : typeColors.default;
  pokeImg.style.background = ``;
  pokeImg.style.backgroundSize = " 5px 5px";
  pokeCard.style.background = `${colorOne}`;
  pokeImg2.style.opacity = "6";
  pokeImg2.style.position = "absolute";
  pokeImg2.style.width = "218px";
  pokeImg2.style.left = "16px";
  pokeImg2.style.bottom = "4px";
};

const renderPokemonTypes = (types) => {
  pokeTypes.innerHTML = "";
  types.forEach((type) => {
    const typeTextElement = document.createElement("div");

    typeTextElement.style.backgroundColor = typeColors[type.type.name];
    typeTextElement.textContent = type.type.name;
    pokeTypes.appendChild(typeTextElement);
  });
};

const renderPokemonStats = (stats) => {
  pokeStats.innerHTML = "";
  stats.forEach((stat) => {
    const statElement = document.createElement("div");
    const statElementName = document.createElement("div");
    const statElementAmount = document.createElement("div");
    statElementName.textContent = stat.stat.name;
    statElementAmount.textContent = stat.base_stat;
    statElement.appendChild(statElementName);
    statElement.appendChild(statElementAmount);
    pokeStats.appendChild(statElement);
  });
};

const renderNotFound = () => {
  pokeName.textContent = "";
  pokeImg.setAttribute("src", "poke-shadow.png");
  pokeImg2.style.opacity = "0";
  pokeImg2.style.position = "absolute";
  pokeImg.style.background = "";
  pokeTypes.innerHTML = "";
  pokeStats.innerHTML = "";
  pokeId.textContent = "";
};
