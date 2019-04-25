//The Toy class should include properties and methods related to a single instance of a Toy object
class Toy {
  constructor(id, name, image, likes){
    this.id = id
    this.likes = likes
    this.name = name
    this.image = image
  }

  //Every Toy object instaniated should be able to render itself on the page
  render(){
    let container = document.querySelector('#toy-collection')
    let toyCard = document.createElement('div')
    toyCard.classList.add('card')
    toyCard.id = `toy-${this.id}`
    toyCard.innerHTML =
      `<h2>${this.name}</h2>
      <img src=${this.image} class="toy-avatar">
      <p><span class='like'>${this.likes}</span> Likes <p>`
    let button = document.createElement('button')
    button.innerHTML = `Like`
    button.addEventListener('click', this.likeToy.bind(this))
    button.dataset.toyId = this.id
    toyCard.appendChild(button)
    container.appendChild(toyCard)
  }

  //Every Toy object instaniated should be able to update its own like property and re-render it to the DOM
  likeToy() {
    this.likes++
    fetch(`http://localhost:3000/toys/${this.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "likes": this.likes
      })
    }).then(response => response.json())
    .then(jsonData => {
      document.getElementById(`toy-${this.id}`).querySelector('span').innerHTML = this.likes
    })
  }
}
