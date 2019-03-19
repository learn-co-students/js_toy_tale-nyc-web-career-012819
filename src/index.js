const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const url = 'http://localhost:3000/toys';
const toyContainer = document.getElementById('toy-collection');
const addToyForm = document.querySelector('.add-toy-form');
const nameSubmit = addToyForm[0];
const imageSubmit = addToyForm[1];
const createToy = addToyForm[2];

//const createToy = document.getElementById('submit');
// YOUR CODE HERE
let likeButton;

class Toy {
  constructor({name, image, likes, id}) {
    this.name = name;
    this.image = image;
    this.likes = likes;
    this.id = id;
  }
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

function postData(url="", data={}) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json());
}

createToy.addEventListener('click', function() {
  let toy = new Toy({name: nameSubmit.value, image: imageSubmit.value, likes: 0})
  postData(url, (toy))
})

function fetchData() {
  toyContainer.innerHTML = " ";
  fetch(url)
    .then(res => res.json())
    .then(json => {
      json.forEach(attributes => {
        let toy = new Toy(attributes)
        render(toy)
      })
    })
    .then(function() {
      likeButton = document.querySelectorAll('.like-btn')
  })
  .then(function() {
    return addListener(likeButton)
  })
  return likeButton;
}

// OR HERE!
function render(toy) {
  toyContainer.innerHTML += `
  <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>
   `
}

function addListener(buttons) {
  buttons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      let likes = parseInt(e.target.parentNode.querySelector('p').innerText.split(' ')[0]);
      likes++;
      parseInt(e.target.parentNode.querySelector('p').innerText = `${likes} likes`)
    })
  })
}

fetchData();
