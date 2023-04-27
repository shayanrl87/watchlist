

const movieRow = document.querySelector(".movies")


let myWatchlistArray = JSON.parse(localStorage.getItem('myWatchlistArray'))

function showMovie(){
    movieRow.innerHTML = ""
    myWatchlistArray.forEach((movie)=>{
        showResultMovie(movie)
        
    
    })
}

function showResultMovie(movie){
        
        movieRow.innerHTML +=  `<div class="movie-row" data-imdbid = ${movie.imdbID}>
        <img class="poster" src=${imgCheck(movie)} loading="lazy">
        <div class="movie-description" >
            <div class= "movie-title">
            <h3>${movie.Title}</h3>
            <sub class="star-icon"><img src="/image/Icon.svg" width="15" height="15">${movie.imdbRating}</b></sub>
            </div>
            <div class="movie-meta">
                <sub>${movie.Runtime}</sub>
                <sub>${movie.Genre}</sub>
                
                <sub><button class="watchlist-btn-remove"><span class="material-symbols-outlined">
                do_not_disturb_on
                </span>remove</button></sub>
            </div>
            
           <div class="movie-plot" data-imdbid = ${movie.imdbID}>${movie.Plot}</div>
            
            
      
        </div>
    </div>
    <hr>`
  

    
}


function imgCheck(movie){
    if (movie.Poster === "N/A"){
        
        return "/image/default-movie.jpg"
      
    }
    else{
       
        return movie.Poster
    }
}


 
    
//handleing remove buttons and remove certion movie from local storage and the DOM    
document.addEventListener("click",(e)=>{
    if(e.target.classList.value === "watchlist-btn-remove"){
        e.target.disabled = true
        let targetMovie= myWatchlistArray.find((movie)=> {return movie.imdbID === e.target.offsetParent.dataset.imdbid})
        myWatchlistArray.splice(myWatchlistArray.indexOf(targetMovie),1)
        localStorage.setItem('myWatchlistArray', JSON.stringify(myWatchlistArray))
        showMovie()    
        }
    })
            


// show movies for the first time    
showMovie()   
        