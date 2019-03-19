const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const url = 'http://localhost:3000/toys'
const toyCollectionDiv = document.querySelector('#toy-collection');
const addForm = document.querySelector('.add-toy-form');

//Fetch data
fetch(url)
.then(response => response.json())
.then(toys => {
  toys.forEach(toy => {
    renderToy(toy)
  })
})

//Functions
function renderToy(toy) {
  toyCollectionDiv.innerHTML += `
  <div class="card">
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p data-id="${toy.id}"> ${toy.likes} </p>
  <button class="like-btn" data-id="${toy.id}">Like <3</button>
  <button class="delete-btn" data-id="${toy.id}">Delete Toy</button>
  </div>
  `
}

//event listener
addForm.addEventListener('submit', event => {
  event.preventDefault();
  const toyInputs = document.querySelectorAll('.input-text');
  return fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: toyInputs[0].value,
      image: toyInputs[1].value,
      likes: 0
    })
  })
    .then(response => response.json())
    .then(toy => {
      renderToy(toy)
    })
})

toyCollectionDiv.addEventListener("click", event => {
  event.preventDefault;
  let parentNode = event.target.parentNode
  parentNode.remove();
  if (event.target.className === "delete-btn") {
    let deleteId = event.target.dataset.id;
    return fetch(`${url}/${deleteId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
    })
  }
})

toyCollectionDiv.addEventListener('click', event => {
  if (event.target.className === 'like-btn') {
    let likes = parseInt(event.target.previousElementSibling.innerText);
    likes++;
    event.target.previousElementSibling.innerText = likes;
    const likeId = event.target.dataset.id

    return fetch(`${url}/${likeId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: likes
      })
    })
  }
})

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
