//On load of the page, we create a single controller object that is
//responsible or controlling the state and behavior of the app
document.addEventListener('DOMContentLoaded', function(){
  let controller = new Controller()
  document.querySelector('#new-toy-btn').addEventListener('click', controller.toggleForm.bind(controller))
  controller.fetchToys()
})
