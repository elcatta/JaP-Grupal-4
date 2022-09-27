const MOVIES_URL = "https://japceibal.github.io/japflix_api/movies-data.json"
const CONTAINER = document.getElementById("lista")
let search = document.getElementById("btnBuscar");
let searchInput = document.getElementById("inputBuscar");
let moviesArray, moviesList = [];


function commentRating(commentScore){
  let rating = "";
      for (let i = 0; i < 5; i++) {
          if (i < commentScore){
              rating += `<span class="fa fa-star checked"></span>`
          } else {
              rating += `<span class="fa fa-star"></span>`
          };
      }    
  return rating;
}


function genresAppender(generos){
  let genresString = "";
  for (let i = 0; i < generos.length; i++) {
    genresString += generos[i].name + " ";
  }
  return genresString
}

function searchFilter(){
  moviesList = moviesList.filter(item => 
  item.title.toLowerCase().includes(searchInput.value.toLowerCase()) || 
  item.tagline.toLowerCase().includes(searchInput.value.toLowerCase()) ||
  genresAppender(item.genres).toLowerCase().includes(searchInput.value.toLowerCase()) ||
  item.overview.toLowerCase().includes(searchInput.value.toLowerCase()))
}

function showMovies(){
  moviesList = moviesArray;
  CONTAINER.innerHTML = "";
  
  if (searchInput.value != ""){
    searchFilter()
    for (let i = 0; i < moviesList.length; i++) {
    let movie = moviesList[i];
    let fecha = new Date (movie.release_date);
    let anio = fecha.getFullYear();

    CONTAINER.innerHTML += 
    `
    <button class="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop${i}" aria-controls="offcanvasTop${i}"><p>${movie.title} <p>Calificacion: </p> `+ commentRating(movie.vote_average / 2) +`</p> <p>${movie.tagline}</p></button>

    <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop${i}" aria-labelledby="offcanvasTopLabel${i}">
      <div class="offcanvas-header">
        <h1 class="offcanvas-title" id="offcanvasTopLabel${i}">`+ movie.title+`</h1>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body" style="overflow:visible;">
        <p>`+ movie.overview +`</p>
        <hr>
        <div class="row">
          <div class="col-9">
          <p> `+ genresAppender(movie.genres) +`</p>
          </div>
          <div class="col-2">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">Dropdown button</button>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
            <li><p><strong>Year: </strong>`+anio+`</p></li>
            <li><p><strong>Runtime: </strong>`+movie.runtime+`</p></li>
            <li><p><strong>Budget: </strong>`+movie.budget+`</p></li>
            <li><p><strong>Revenue: $</strong>`+movie.revenue+`</p></li>
          </ul>
        </div>
        </div>
        </div>
      </div>
    </div>

    `
    }
  } 
}

let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(MOVIES_URL).then(function(resultObj){
      if (resultObj.status === "ok")
      {
          moviesArray = resultObj.data;  
      }
  });
});

search.addEventListener('click', function () {
  showMovies()
})

