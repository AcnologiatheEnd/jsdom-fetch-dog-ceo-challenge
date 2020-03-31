const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  var breeds; //declare breeds as a global variable so you can access it when calling it within arguments of functions that are called back wtihin other functions like triggerFilter() (read about hoisting)

function fetchDogs() {
    fetch(imgUrl)
   .then(resp => resp.json())
   .then(renderDogs); 
}
//handles our image display
function renderDogs(json) {
  const main = document.getElementById('dog-image-container')
  const imageArray = json.message;
    imageArray.forEach(function(img){
    let imgEl = document.createElement('img')
    imgEl.src = img;
    main.appendChild(imgEl);
    });
  }
  
function fetchBreeds(){
 fetch(breedUrl)
 .then(resp => resp.json())
 .then(json => {
  breeds = json.message;
  });
}


 

 // listens for the letter change then pass the letter to the findMatch funcion along with breeds containing all the dog breeds
function triggerFilter(){
    let breedDropdown = document.getElementById('breed-dropdown')
    breedDropdown.addEventListener('change', function (event){
    let letterToSearch = breedDropdown.value;
    findMatch(letterToSearch, breeds)
  });
  }
//looks for all the breeds in the breed var then appends them to the searchResult object to be passed to renderBreeds function
  function findMatch(letterToSearch, breeds){
    const strg = String(letterToSearch)
    const searchResult = {}
    for (const key in breeds) {
      if (key.startsWith(strg)) { searchResult[key] = breeds[key];}
    }
    renderBreeds(searchResult);
    console.log(searchResult)
  }
//changes the color of the list items upon click
  function changeColor(e){
    e.target.classList.add('clicked');
  }
// creates and handles our list of breeds based on the data gathered from triggerFilter and FindMatch functions
  function renderBreeds(data){

    const ul = document.getElementById('dog-breeds')
    while (ul.firstChild) {
     ul.firstChild.remove();
     }
 
    for (let key in data) {
      let li = document.createElement("li");
      if (data[key].length >= 1) {
        li.innerText = key
        ul.appendChild(li)
        let ul2 =  document.createElement("ul");
         data[key].forEach(function(name){
          let li2 = document.createElement("li");
          li2.innerText = name;
          ul2.append(li2);
          li.append(ul2);
        });
 
      } else {
        li.innerText = key;
      }
 
      ul.appendChild(li);
    li.addEventListener('click', changeColor); //note you don't need argument or () to invoke function because it is described explicitly below
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    fetchBreeds();
    fetchDogs();
    triggerFilter();
  });
