document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  const toyCollection = document.getElementById('toy-collection');
  let addToy = false;

  const API_URL = 'http://localhost:3000/toys';

  function renderToy(toy){
    //create a new Div and attach it to the DOM
    let toyDiv = document.createElement('div');
    toyDiv.className = "card";
    toyDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src='${toy.image}' class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button data-id='${toy.id}' class="like-btn">Like <3</button>
    <button data-id='${toy.id}' class="delete-btn">Delete X</button>
    `;
    toyCollection.appendChild(toyDiv);
  }


  function renderAll(toys){
    toyCollection.innerHTML = '';
    // For each toy render it to the DOM
    toys.forEach((toy) => {
      renderToy(toy)
    })
  }

  function displayToys(){
    fetch(API_URL)
    .then(function(resp){
      // resp in this case is the response from the server
      // This comes in the form of a promise object,
      // we must parse this into usable data
      return resp.json()
    })
    .then((toys) => {
      // toys is an array that is taken from the promise object that came in the response
      renderAll(toys);
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

  toyForm.addEventListener('click', (e) => {
    let toyName = document.getElementsByClassName("input-text")[0].value;
    let toyUrl = document.getElementsByClassName("input-text")[1].value;
    // data stores the data that is passed in by the user as an object
    data = {name: toyName, image: toyUrl, likes: 0}

    e.preventDefault();
    if (e.target.name === "submit") {
      fetch(`${API_URL}`, {
        // change the default method from GET to POST
        method: 'POST',
        // Tells the server we are sending in json
        headers: {
          "Content-Type": "application/json"
        },
        // sends the data from an object to a json
        body: JSON.stringify(data)
      }).then(resp => resp.json())
      .then(toy => renderToy(toy))
      //then we render the response from the API
    }
  })

  toyCollection.addEventListener('click', (e) => {
    //checks to see if the button is a like
    if (e.target.className === "like-btn") {
      // like stores the number from the innertext of the like amount
      let id = parseInt(e.target.dataset.id);
      let like = parseInt(e.target.previousElementSibling.innerText);
      like++;

      let data = {likes: like}

      e.target.previousElementSibling.innerText = `${like} likes`;

      fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
    } else if (e.target.className === "delete-btn"){
        let id = parseInt(e.target.dataset.id);

        fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(function(resp){
          return resp.json()
        })
        .then(data => {
          displayToys();
        })
    }
  })

displayToys();

})
