const toyCollectionContainer = document.getElementById("toy-collection")
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyNameInput = document.getElementsByClassName("input-text")
const nameField = toyNameInput[0]
const imgField = toyNameInput[1]
const newToySubmit = document.querySelector(".add-toy-form").querySelector(".submit")
let likeButton;

function fetchToys(){
  return fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(renderToys)
  .then(function(){
     likeButton = document.querySelectorAll(".like-btn")
  })
  .then(function(){
    return addListner(likeButton)
  })
  return likeButton
}

function renderToys(toys){
  toys.forEach(function(toy){
    toyCollectionContainer.innerHTML +=
    `
    <div class="card">
    <h2>${toy["name"]}</h2>
    <img src=${toy["image"]} class="toy-avatar" />
    <p>${toy["likes"]} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>
    `

  })
}

function addListner(buttons){
  buttons.forEach(function(button){
    button.addEventListener("click", function(e){
      let likes = parseInt(e.target.parentNode.querySelector("p").innerText.slice(0,2))
      likes ++
      e.target.parentNode.querySelector("p").innerText = `${likes} likes`
    })
    })
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

function postData(url = ``, data = {}) {
  return fetch(url, {
    method: "POST",
    headers: {
            "Content-Type": "application/json",
        },
    body: JSON.stringify(data)
  })
  .then(response => response.json());
}

newToySubmit.addEventListener("click", function(){
  postData('http://localhost:3000/toys', ({name: `${nameField.value}`, image: `${imgField.value}`, likes: 0 }))
})



window.fetchToys()
