
const searchBtn = document.getElementById("search")
const movieRow = document.querySelector(".movies")
const loaderWrapper = document.getElementById("loader")
const inputSearch = document.querySelector(".search-input input")

let resultData = []



searchBtn.addEventListener("click",()=>{
    movieRow.innerHTML = ""

    loaderWrapper.classList.remove("loader-wrapper-hidden")

     fetch(`https://www.omdbapi.com/?apikey=8d8258de&s=${inputSearch.value}`)
        .then(res => {
            
            return res.json()})
        .then(data => {
             data.Search.forEach((movie)=>{
               
                fetch(`https://www.omdbapi.com/?apikey=8d8258de&i=${movie.imdbID}&plot=short`)
                    .then(res => res.json())
                    .then(data=> {
                        
                        resultData.push(data)
                        showResultMovie(data)
                        generateOverflowedTxt(data, readMoreBtntxt)
                      
                        
                    })
           
                        
                        })
                        
            })
            inputSearch.value = ""
        })
        
       
        movieRow.addEventListener("DOMSubtreeModified",()=>{
        loaderWrapper.classList.add("loader-wrapper-hidden")
           })

           
    
       


function showResultMovie(movie){
        
    
        movieRow.innerHTML +=  `<div class="movie-row" data-imdbid = ${movie.imdbID}>
        <img class="poster" src=${imgCheck(movie)} loading="lazy">
        <div class="movie-description" >
            
            <h3>${movie.Title}</h3>
            <sub class="star-icon"><img src="image/Icon.svg" width="15" height="15">${movie.imdbRating}</b></sub>
            
            <div class="movie-meta">
                <sub>${movie.Runtime}</sub>
                <sub>${movie.Genre}</sub>
                
                <sub><button class="watchlist-btn"><span class="material-symbols-rounded">
                add_circle
                </span>watchlist</button></sub>
            </div>
            
           <div class="movie-plot" data-imdbid = ${movie.imdbID}></div>
            
            
      
        </div>
    </div>
    <hr>`
  

    
}


const allDiv = document.querySelectorAll(".movie-plot")





// check if Plot need read more button and add it at the end of the last line
function generateOverflowedTxt(data,btnTxtArray){
   
    let item = document.querySelector(`[data-imdbid=${data.imdbID}].movie-plot`)
 
    item.innerHTML = `<p class="hide" data-imdbid = ${data.imdbID}>${data.Plot}</p>`

    let txt = item.querySelector("p")
    if(txt.scrollHeight>txt.clientHeight){
        for (let i=txt.innerText.length; i>=0; i--){
            if(txt.scrollHeight>txt.clientHeight){
            txt.textContent = `${txt.textContent.substring(0, txt.textContent.length-1)}`
            }else{return txt.innerHTML = `${txt.textContent.substring(0, txt.textContent.length -(btnTxtArray[0].length? btnTxtArray[0].length>=btnTxtArray[1].length:btnTxtArray[1].length)-50) }...<span>${btnTxtArray[0]}</span>`
   
        }   
    }
    } else{return txt.innerHTML = `<p class="hide" data-imdbid = ${data.imdbID}>${data.Plot}</p>`}   

}


const readMoreBtntxt = ["read more", "read less"]

//handling read more buttons 
window.addEventListener("click", (e)=>{

    if(e.target.innerText === readMoreBtntxt[0]) {
        e.target.parentElement.classList.remove("hide")
        e.target.parentElement.classList.add("show")
        e.target.parentElement.innerHTML = `${resultData.filter((movie)=>{return movie.imdbID === e.target.parentElement.dataset.imdbid})[0].Plot}<span>${readMoreBtntxt[1]}</span>`
        e.target.innerText = readMoreBtntxt[1]
    }
    else if(e.target.innerText === readMoreBtntxt[1]){
        e.target.parentElement.classList.remove("show")
        e.target.parentElement.classList.add("hide")
        e.target.parentElement.innerHTML = generateOverflowedTxt(resultData.filter((movie)=>{return movie.imdbID === e.target.parentElement.dataset.imdbid})[0],readMoreBtntxt)
        e.target.innerText = readMoreBtntxt[0]
    }

})



//check the movie poster availability 
function imgCheck(movie){
    if (movie.Poster === "N/A"){
        
        return "image/default-movie.jpg"
      
    }
    else{
       
        return movie.Poster
    }
}



// handeling the DOM >> search when "enter" press
inputSearch.addEventListener("keyup",(e)=>{
    if(e.key === 'Enter' || e.keyCode === 13){
        inputSearch.blur()
        searchBtn.click()
    }
})


// first check that we have loca storage > if yes > getItem > else > create one

if (!(JSON.parse(localStorage.getItem('myWatchlistArray')))){
    const myWatchlistArray = []
    localStorage.setItem('myWatchlistArray', JSON.stringify(myWatchlistArray))
}
 
    //handeling watchlist buttons and add certain movie to watchlist
    document.addEventListener("click",(e)=>{
            if(e.target.classList.value === "watchlist-btn"){
                let myWatchlistArray = JSON.parse(localStorage.getItem('myWatchlistArray'))
                if(!(myWatchlistArray.find((movie)=>{return movie.imdbID === e.target.parentElement.offsetParent.dataset.imdbid}))){
                    myWatchlistArray.push(resultData.filter((movie)=>{return movie.imdbID === e.target.parentElement.offsetParent.dataset.imdbid})[0])
                    e.target.disabled = true
                    localStorage.setItem('myWatchlistArray', JSON.stringify(myWatchlistArray))
                    
                } else{
                    e.target.disabled = true
                }
            }
            })
            

            
