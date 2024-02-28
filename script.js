async function GetMovies(){
    let res= await fetch("https://api.tvmaze.com/shows")
    let data= await res.json();
    return data;
}
const paginationContainer = "#pagination";
async function paginateAndDisplayMovies(movies) {
  const itemsPerPage = 20;

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
        <div class="card" style="min-width: 16.5rem; min-height: 42rem; margin: 10px;">
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
            <div class="card-body d-flex justify-content-center">
                <a href="#" class="btn btn-success btn-sm m-2" onclick="window.location.href='${movie["officialSite"]}'; return false;">Go To Website</a>
                <a href="#" class="btn btn-primary btn-sm m-2" onclick="window.location.href='detail.html?id=${movie["id"]}'; return false;">Go To Detail</a>
            </div>
        </div>
    </div>
    `;
          parent.innerHTML += movieHTML;
      }
      window.scrollTo({
        top: 0,
        behavior: 'smooth'})
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

let form=document.getElementById("submit-form")
let input=document.querySelector("#search-input")
let btn=document.querySelector("#search-btn")
let alert_length=document.querySelector("#alert-length")
let alert_empty=document.querySelector("#alert-empty")

form.onsubmit=function(e) {
  e.preventDefault();
  let length=input.value.trim().length;
  if (length==0) {
    alert_length.classList.add("d-none");
    alert_empty.classList.remove("d-none")
  }
  else if (length<3) {
    alert_empty.classList.add("d-none")
    alert_length.classList.remove("d-none");
  } else{
    btn.value="Go Back To HomePage"
    input.style.display="none";
    btn.onclick=function() {
      window.location.href = 'index.html';
      input.value="";
    }
  }
}

input.onblur=function() {
    alert_empty.classList.add("d-none")
    alert_length.classList.add("d-none");
}

input.onkeyup=function () {
  let length=input.value.trim().length;
  if (length==0) {
    alert_empty.classList.remove("d-none")
    alert_length.classList.add("d-none");
  }
  else if (length<3) {
    alert_length.classList.remove("d-none")
    alert_empty.classList.add("d-none");

  }
  else{
    alert_empty.classList.add("d-none");
    alert_length.classList.add("d-none");
  }
}

input.addEventListener("keyup", async function() {
  var searchText = this.value.trim().toLowerCase();
  if (input.value.trim()=="") {
    fetchAndDisplayMovies();
    return;
  }
  try {
    let movies = await GetMovies();
    const parent = document.querySelector("#main");
      parent.innerHTML = "";
      let moviesFound = false;
    movies.forEach((movie) => {
      if (movie.name.toLowerCase().includes(searchText)) {
        moviesFound = true;
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
              <div class="card-body d-flex justify-content-center">
              <a href="#" class="btn btn-success btn-sm m-2"  onclick="window.location.href='${movie["officialSite"]}'; return false;">Go To Website</a>
              <a href="#" class="btn btn-primary btn-sm m-2"  onclick="window.location.href='detail.html?id=${movie["id"]}'; return false;">Go To Detail</a>
              </div>
            </div>
          </div>`;
          parent.innerHTML += movieHTML;
   }
   const pagination = document.querySelector(paginationContainer);
   pagination.innerHTML = "";
  });
  if (!moviesFound) {
       parent.innerHTML=`<div class="no-movies-container">
       <p class="no-movies-message">No Movies Found</p>
       </div>
       `
   return;
  }
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
});
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
      duration: 1000,
      easing: 'ease',
      offset: 100,
      once: true
  });
});

