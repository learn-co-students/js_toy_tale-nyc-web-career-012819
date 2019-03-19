function fetchToys() {
  return fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(json => showToys(json))
}

function showToys(toys) {
  for (toy of toys) {
    toyContainer.innerHTML += `
      <div class="card">
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p>${toy.likes} Likes</p>
        <button class="like-btn" data-id="${toy.id}">Like <3</button>
      </div>
    `
  }
}

function postToy(event) {
  fetch("http://localhost:3000/toys", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: `${toyForm.elements.name.value}`,
      image: `${toyForm.elements.image.value}`,
      likes: 0
    })
  })
}

function likeHandler(event) {
  if (event.target.tagName === "BUTTON") {
    const likesPTag = event.target.previousElementSibling
    const likes = parseInt(likesPTag.innerText.split(" ")[0])

    fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: `${likes + 1}`
      })
    })

    likesPTag.innerText = `${likes + 1} Likes`
  }


}

const addBtn = document.querySelector('#new-toy-btn')
const formContainer = document.querySelector('.container')
const toyForm = formContainer.firstElementChild
const toyContainer = document.querySelector("#toy-collection")
let addToy = false

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    formContainer.style.display = 'block'
  } else {
    formContainer.style.display = 'none'
  }
})

toyForm.addEventListener("submit", postToy)

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  toyContainer.addEventListener("click", likeHandler)
})