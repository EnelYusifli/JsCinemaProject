async function GetMovies(){
    let res= await fetch("https://api.tvmaze.com/shows")
    let data= await res.json();
    return data;
}
async function paginateAndDisplayMovies(movies) {
  const itemsPerPage = 20;
  const paginationContainer = "#pagination";

  async function paginate(items, itemsPerPage, paginationContainer) {
    let currentPage = 1;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    function showItems(page) {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, items.length);
      const parent = document.querySelector("#main");
      parent.innerHTML = "";
      for (let i = startIndex; i < endIndex; i++) {
        const movie = items[i];
        const movieHTML = `
          <div class="col-3">
            <div class="card" style="width:16.5rem; height: 42rem; margin:10px;">
              <img src="${movie["image"]["medium"]}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${movie["name"]}</h5>
                <p class="card-text">Premiere: ${movie["premiered"]}</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">IMDB Rating: ${movie["rating"]["average"]}</li>
                <li class="list-group-item">Genre: ${movie["genres"][0]}</li>
                <li class="list-group-item">Language: ${movie["language"]}</li>
              </ul>
              <div class="card-body">
                <a href="#" class="btn btn-success btn-sm"  onclick="window.location.href='${movie["officialSite"]}'; return false;">Go To Website</a> 
                <a href="#" class="btn btn-primary btn-sm"  onclick="window.location.href='detail.html?id=${movie["id"]}'; return false;">Go To Detail</a>
              </div>
            </div>
          </div>`;
          parent.innerHTML += movieHTML;
      }
    }

    async function setupPagination() {
      const pagination = document.querySelector(paginationContainer);
      pagination.innerHTML = "";
    
      for (let i = 1; i <= totalPages; i++) {
        const link = document.createElement("a");
        link.href = "#";
        link.innerText = i;
        link.classList.add("pagination-link"); 
        
        if (i === currentPage) {
          link.classList.add("active");
        }
    
        link.addEventListener("click", async (event) => {
          event.preventDefault();
          currentPage = i;
          showItems(currentPage);
          const currentActive = pagination.querySelector(".active");
          currentActive.classList.remove("active");
          link.classList.add("active");
        });
    
        pagination.appendChild(link);
      }
    }
    

    showItems(currentPage);
    await setupPagination();
  }

  await paginate(movies, itemsPerPage, paginationContainer);
}

async function fetchAndDisplayMovies() {
  try {
    const movies = await GetMovies();
    await paginateAndDisplayMovies(movies);
  } catch (error) {
    console.error('Error fetching and displaying movies:', error);
  }
}

fetchAndDisplayMovies();




document.querySelector("#search-input").addEventListener("keyup", async function() {
  var searchText = this.value.trim().toLowerCase();
  let messagesContainer = document.getElementById("search-messages");
  messagesContainer.innerHTML = "";

  if (searchText.trim() === "") {
    messagesContainer.innerHTML = "Search text cannot be null";
    return;
  }
  if (searchText.length < 3) {
    messagesContainer.innerHTML = "Minimum length is 3";
    return;
  }

  try {
    let movies = await GetMovies();
    const parent = document.querySelector("#main");
      parent.innerHTML = "";
    movies.forEach((movie) => {
      if (movie.name.toLowerCase().includes(searchText)) {
        const movieHTML = `
          <div class="col-3">
            <div class="card" style="width:16.5rem; height: 42rem; margin:10px;">
              <img src="${movie.image.medium}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${movie.name}</h5>
                <p class="card-text">Premiere: ${movie.premiered}</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">IMDB Rating: ${movie.rating.average}</li>
                <li class="list-group-item">Genre: ${movie.genres[0]}</li>
                <li class="list-group-item">Language: ${movie.language}</li>
              </ul>
              <div class="card-body">
              <a href="#" class="btn btn-success btn-sm"  onclick="window.location.href='${movie["officialSite"]}'; return false;">Go To Website</a>
              <a href="#" class="btn btn-primary btn-sm"  onclick="window.location.href='detail.html?id=${movie["id"]}'; return false;">Go To Detail</a>
              </div>
            </div>
          </div>`;
          parent.innerHTML += movieHTML;
      }
    });
    
    if (htmlContent === '') {
      messagesContainer.innerHTML = "No movies found";
      return;
    }

    messagesContainer.innerHTML = htmlContent;
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
});

