class Controller {
  //When a new controller instance is created, it has a property that keeps track of
  //whether or not to show the add-toy-form
  constructor(){
    this.addToy = false
  }

  //Should toggle the display of the add-toy-form by toggling the addToy property of this instance
  toggleForm(){
    this.addToy = !this.addToy
    let toyContainer = document.querySelector('.container')
    if (this.addToy) {
      toyContainer.style.display = 'block'
      document.querySelector('.add-toy-form').addEventListener('submit', this.addNewToy)
    } else {
      toyContainer.style.display = 'none'
    }
  }

  //This should only be called once on load of the page
  fetchToys(){
    fetch(`http://localhost:3000/toys`)
    .then(response => response.json())
    .then(jsonData => {
      jsonData.forEach(toy => {
        let toyObj = new Toy(toy.id, toy.name, toy.image, toy.likes)
        toyObj.render()
      })
    })
  }

  //This should be called every time a new toy is created. It creates an instance of Toy
  //using the method call,  new Toy(id, name, image, likes)
  addNewToy(event){
    event.preventDefault()
    let name = document.querySelector('#name').value
    let image = document.querySelector('#image').value
    fetch(`http://localhost:3000/toys`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "image": image,
        "likes": 0
      })
    }).then(response => response.json())
    .then(jsonData => {
      let toyObj = new Toy(jsonData.id, jsonData.name, jsonData.image, 0)
      toyObj.render()
    })
  }
}
