const DOG_URL= 'http://localhost:3000/dogs'
const tBody= document.getElementById('table-body')

document.addEventListener('DOMContentLoaded', () => {

  renderDogs()
  addEditBtnListener()
  addFormListener()
})

function renderDogs(){
  fetch(`http://localhost:3000/dogs`)
    .then(res=>res.json())
    .then(json=>
    json.forEach(function(dog){
      addDog(dog)

    }))
}

function addDog(dog){
  tBody.innerHTML+=`<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id="${dog.id}">Edit</button></td></tr>`
}

function addEditBtnListener(){
  const tBody= document.getElementById('table-body')

  tBody.addEventListener('click',function(event){

    if(event.target.tagName==="BUTTON"){
    event.preventDefault()
    let sex=event.target.parentElement.previousElementSibling.innerText
    let breed=event.target.parentElement.previousElementSibling.previousElementSibling.innerText
    let name=event.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    let inputName=document.querySelector('input[name=name]')
    inputName.value=name
    inputName.dataset.id=event.target.dataset.id
    let inputBreed=document.querySelector('input[name=breed]')
    inputBreed.value=breed
    let inputSex=document.querySelector('input[name=sex]')
    inputSex.value=sex
  }
  })
}

function addFormListener(){
  let dogForm=document.getElementById('dog-form')
  let inputName=document.querySelector('input[name=name]')
  let inputBreed=document.querySelector('input[name=breed]')
  let inputSex=document.querySelector('input[name=sex]')
  dogForm.addEventListener('submit',function(){
    let dogId=document.getElementById('dog-form').children[0].dataset.id


    event.preventDefault()
    fetch(`${DOG_URL}/${dogId}`,{
      method: "PATCH",
      body:JSON.stringify({
        name:inputName.value,
        breed:inputBreed.value,
        sex:inputSex.value
      }),
      headers:{
        "Content-Type":"application/json",
        Accept: "application/json"
      }
    }).then(res=>res.json())
      .then(json =>changeDog(json))
  })
}

function changeDog(dog){
  let dogButton=document.querySelector(`button[data-id="${dog.id}"]`)
  dogButton.parentElement.previousElementSibling.innerText=dog.sex
  dogButton.parentElement.previousElementSibling.previousElementSibling.innerText=dog.breed
  dogButton.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText=dog.name
}
