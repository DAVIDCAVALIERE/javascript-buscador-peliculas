const apiKey = 'TU API KEY';
let urlBase = "https://api.themoviedb.org/3/search/movie";
let urlImg = "https://image.tmdb.org/t/p/w200";

document.getElementById("searchButton").addEventListener("click", searchMovies);
let resultContainer = document.getElementById("results");

function searchMovies() {
  resultContainer.innerHTML = "Cargando...";
   let searchInput = document.getElementById("searchInput").value;
   fetch(`${urlBase}?api_key=${apiKey}&query=${searchInput}`)
     .then((response) => response.json())
     .then((response) => displayMovies(response.results))
     .catch((error) => console.error("Error:", error));
}

function displayMovies(movies) {
    resultContainer.innerHTML = '';

    if (movies.length === 0) {
        resultContainer.innerHTML = "<p> No se encontraron resultados <p/>";
        return;
    }

    movies.forEach((movie) => {
      let movieDiv = document.createElement("div");
      movieDiv.classList.add("movie");

      let title = document.createElement('h2');
      title.textContent = movie.title;

      let releaseDate = document.createElement('p');
      releaseDate.textContent = `La fecha de lanzamiento fue: ${movie.release_date}`;

      let overview = document.createElement("p");
      overview.textContent = movie.overview;

      let poster = document.createElement("img");
      let posterPath = urlImg + movie.poster_path;
      poster.src = posterPath;

      let voteAverage = document.createElement('p');
      voteAverage.textContent = `Stars: ${movie.vote_average.toFixed(2)}`;

      movieDiv.appendChild(poster);
      movieDiv.appendChild(title);
      movieDiv.appendChild(releaseDate);
      movieDiv.appendChild(voteAverage);
      movieDiv.appendChild(overview);

      resultContainer.appendChild(movieDiv);
    });
}
