const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

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

// OR HERE!

//display all toys when loaded page
const toyCollectionDiv = document.getElementById('toy-collection');
let allToys;

fetch('http://localhost:3000/toys')
.then(res => res.json())
.then(toys => {
  allToys = toys
  toys.forEach(function(toy) {
    toyCollectionDiv.innerHTML +=
    `
    <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <button class="like-btn">Like <3</button>
    <p></p>
    </div>
    `;
  })
})

// create and submit new toy
const addToyForm = document.querySelector('.submit');

addToyForm.addEventListener('click', event => {
  event.preventDefault();
  let nameInput = document.querySelectorAll('.input-text')[0].value;
  let imgUrlInput = document.querySelectorAll('.input-text')[1].value;
  // values are stored
  if (nameInput === "" || imgUrlInput === "") {
    alert('no blank');
    // validation
  } else {
    alert('success')
    let obj = {name: nameInput, image: imgUrlInput}
    createNewToy(obj)
    document.querySelectorAll('.input-text')[0].value = '';
    document.querySelectorAll('.input-text')[1].value = '';
    // delete input values after success alert.
  }
})

function createNewToy(obj) {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(obj)
  })
  .then(response => response.json())
}

// increase likes
toyCollectionDiv.addEventListener('click', event => {
  if (event.target.className === 'like-btn') {
    let foundToy = allToys.find(function(toy) {
      return toy.image === event.target.previousElementSibling.src;
    })

    if (foundToy.likes) {
      ++foundToy.likes
      event.target.nextElementSibling.innerText = `${foundToy.likes}`;
      // display number of likes after like button;
      increaseLikes(foundToy);

    } else {
      foundToy.likes = 1
      event.target.nextElementSibling.innerText = `${foundToy.likes}`;
      // display number of likes after like button;
      increaseLikes(foundToy);
    }
  }
})

let displayLikes = document.createElement('p');

function increaseLikes(foundToy) {
  fetch(`http://localhost:3000/toys/${foundToy.id}`, {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({likes: foundToy.likes})
  })
  .then(res => res.json())
}
