//Variaveis para pegar elementos HTML
const $searchButton = document.getElementById("search-button");
const $overlay = document.getElementById("modal-overlay");
const $movieName = document.getElementById("movie-name");
const $movieYear = document.getElementById("movie-year");
const $movieList = document.getElementById("movie-list");

let movieList = JSON.parse(localStorage.getItem("movieList")) ?? [];

//Função backEnd para API
async function searchButtonClickHendle() {
  try {
    let url = `http://www.omdbapi.com/?apikey=${keyApi}&t=${movieNameParamenterGenarator()}&y=${movieYearParamenterGenarator()}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log("data:", data);

    if (data.Error) {
      throw new Error("Filme não encontrado");
    }

    createModel(data);
    $overlay.classList.add("open");
  } catch (error) {
    notie.alert({ type: "error", text: error.message });
  }
}

//Função tratamento de dados nome
function movieNameParamenterGenarator() {
  if ($movieName.value === "") {
    throw new Error("O nome do filme deve ser informado");
  } else {
    return $movieName.value.trim().replaceAll(" ", "+");
  }
}

//Função tratamento de dados ano
function movieYearParamenterGenarator() {
  if ($movieYear.value === "") {
    return "";
  }
  if (
    $movieYear.value.length !== 4 ||
    $movieYear.value < 0 ||
    Number.isNaN(Number($movieYear.value))
  ) {
    throw new Error("Ano do filme invalido");
  } else {
    return $movieYear.value;
  }
}

function addToList(movieObject) {
  movieList.push(movieObject);
}

function isMovieAlreadyOnList(id) {
  function doesThisIdBeLongToThisMovie(movieObject) {
    return movieObject.imdbID === id;
  }
  return Boolean(movieList.find(doesThisIdBeLongToThisMovie));
}

function updateUI(movieObject) {
  $movieList.innerHTML += ` 
  <article id="movie-card-${movieObject.imdbID}">
          <img
            src=${movieObject.Poster}
            alt="Poster de ${movieObject.Title}."
          />
          <button onclick="{removeFilmFromList('${movieObject.imdbID}')}"><i class="bi bi-trash"></i>Remover</button>
        </article>`;
}

function removeFilmFromList(id) {
  notie.confirm({
    text: "Deseja remover o filme da lista ?",
    submitText: "Sim",
    calcelText: "Não",
    position: "top",
    submitCallback: function removeMovie() {
      movieList = movieList.filter((movie) => movie.imdbID !== id);
      document.getElementById(`movie-card-${id}`).remove();
      updateLocalStorage();
    },
  });
}

function updateLocalStorage() {
  localStorage.setItem("movieList", JSON.stringify(movieList));
}

for (const movieInfo of movieList) {
  updateUI(movieInfo);
}

$searchButton.addEventListener("click", searchButtonClickHendle);
