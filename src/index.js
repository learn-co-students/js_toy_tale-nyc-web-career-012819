document.addEventListener('DOMContentLoaded', () => {
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const submit = document.querySelector('.submit')
// YOUR CODE HERE
// let toys = fetch("http://localhost:3000/toys")


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    submit.addEventListener('click', () => {
      const postData = {
        "name": document.querySelector('#firstt').value,
        "image": document.querySelector('#secondd').value,
        "likes": 0
      }
      fetch("http://localhost:3000/toys", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(postData),
      }).then(res => console.log(res))
    })
  } else {
    toyForm.style.display = 'none'
  }
})

window.addEventListener('load', () => {
  setTimeout(() => {
    const likeBtn = document.querySelectorAll('.like-btn')
    const cardd = document.querySelectorAll('.card')
    likeBtn.forEach(eachbtn => {
      eachbtn.addEventListener('click', (e) => {
        // const parent = document.querySelector('')
        // console.log(e.target.id);
        fetch("http://localhost:3000/toys")
        .then(resp => resp.json())
        .then(json => {
          // const isit = json
          //
          const theToy = json.filter(toy => toy.id === parseInt(e.target.id))[0]
          //   })
          // .then(filtered => )

          fetch(`http://localhost:3000/toys/${theToy.id}`,
          {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              "likes": ++theToy["likes"]
            })
          })
          .then(resp => resp.json())
          .then(json => {
          //   const findCardDiv = cardd.filter(card => card.querySelector('button').id === theToy.id)
          //   console.log(findCardDiv)
            document.getElementById(e.target.id).innerText = `${json.likes} likes`;
          })
        })
      })
    })
  }, 50)
  // toys.then(resp => resp.json())
  // .then(json => json )
  // const cardDivs = document.querySelectorAll('.card')
  //

})


// OR HERE!
  const toyCollDiv = document.querySelector('#toy-collection')
  // const submit
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(json => {
      // let id = 1
      json.forEach(toy => {
        toyCollDiv.innerHTML += `
        <div class="card">
          <h2>${toy["name"]}</h2>
          <img class="toy-avatar" src=${toy["image"]}>
          <p id=${toy.id}>${toy["likes"]} likes</p>
          <button id=${toy.id} class="like-btn">Like <3</button>
        </div>`
      })
    })

  // addBtn.addEventListener('click', () => {
  //   fetch("http://localhost:3000/toys", {
  //     method: 'POST',
  //   })
  // })
})
