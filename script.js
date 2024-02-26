async function GetMovies(){
    let res= await fetch("https://api.tvmaze.com/shows")
    let data= await res.json();
    return data;
}
window.onload=async ()=>{

    let movies=await GetMovies();
    let parent=document.getElementById("main");
    movies.forEach((movie) => {
       parent.innerHTML+=`<div class="col-3">
                    <div class="card" style="width:16.5rem; height: 42rem; margin:10px;">
                        <img src="${movie["image"]["medium"]}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${movie["name"]}</h5>
                          <p class="card-text">Premiere:${movie["premiered"]}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">IMDB Rating:${movie["rating"]["average"]}</li>
                          <li class="list-group-item">Genre:${movie["genres"][0]}</li>
                          <li class="list-group-item">Language: ${movie["language"]}</li>
                        </ul>
                        <div class="card-body">
                        <a href="#" class="btn btn-success btn-sm">Go To Website</a> 
                        <a href="#" class="btn btn-primary btn-sm">Go To Detail</a>
                        </div>
                    </div>
                </div>`
    });
}

// document.querySelector("#search-input").addEventListener("input", function() {
//   var searchText = this.value.trim();
//   console.log(searchText);
//   let movies = GetMovies();
//   let parent = document.getElementById("main");
//   parent.innerHTML="";
//   let htmlContent = '';

//   movies.forEach((movie) => {
//     if (movie.name.toLowerCase().includes(searchText.toLowerCase())){
//       htmlContent +=`<div class="col-3">
//                  <div class="card" style="width:16.5rem; height: 42rem; margin:10px;">
//                      <img src="${movie["image"]["medium"]}" class="card-img-top" alt="...">
//                      <div class="card-body">
//                        <h5 class="card-title">${movie["name"]}</h5>
//                        <p class="card-text">Premiere:${movie["premiered"]}</p>
//                      </div>
//                      <ul class="list-group list-group-flush">
//                        <li class="list-group-item">IMDB Rating:${movie["rating"]["average"]}</li>
//                        <li class="list-group-item">Genre:${movie["genres"][0]}</li>
//                        <li class="list-group-item">Language: ${movie["language"]}</li>
//                      </ul>
//                      <div class="card-body">
//                      <a href="#" class="btn btn-success btn-sm">Go To Website</a> 
//                      <a href="#" class="btn btn-primary btn-sm">Go To Detail</a>
//                      </div>
//                  </div>
//              </div>`
//              parent.innerHTML = htmlContent;
//     }
//   });
//  });
