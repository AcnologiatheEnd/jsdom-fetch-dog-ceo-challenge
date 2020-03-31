console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  var breeds; //declare breeds as a global variable so you can access it when calling it within arguments of functions that are called back wtihin other functions like triggerFilter() (read about hoisting)

function fetchDogs() {
    fetch(imgUrl)
   .then(resp => resp.json())
   .then(renderDogs); //note that you don't even have to use argument or specify that should be called on the json converison of the response, implicit in named fucntion renderDogs - to be explicit follow pattern in fetchBreeds
}

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
   renderBreeds(breeds);
  });
}

function renderBreeds(breeds){
  const ul = document.getElementById('dog-breeds')
  //if you don't remove the li child elements then the search results will get appended to the full list that was renedered when renderbreeds called upon Dom content load
  while (ul.firstChild) {
    ul.firstChild.remove();
    }
    
    //you have to use for..in loop as opposed to forEach because the value of message in this example is a nested object and forEach only works with arrays. Also with for..in you only get access to index/keys of the object, which is fine here because the data we want is stored in the keys
    for (const breed in breeds) {
      const li = document.createElement("li");
      li.innerText = breed;
      console.log(breed);
      ul.append(li);
      li.addEventListener('click', changeColor);
  }

}