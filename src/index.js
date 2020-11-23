const URL = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
    addDogsToTable()

    form = document.querySelector('#dog-form')
    form.addEventListener('submit', (e) => editDogForm(e))
})


function addDogsToTable() {
    fetch (URL)
    .then(resp => resp.json())
    .then(json => renderAllDogs(json))
}

function renderAllDogs(dogs) {
    dogs.forEach(dog => {
        const table = document.querySelector('tbody')
        const row = document.createElement('tr')
        const dogName = document.createElement('td')
        const dogBreed = document.createElement('td')
        const dogSex = document.createElement('td')
        const btnHolder = document.createElement('td')
        const editBtn = document.createElement('button')
    
        dogName.innerText = dog.name

        dogBreed.innerText = dog.breed

        dogSex.innerText = dog.sex

        editBtn.innerText = 'Edit'
        editBtn.addEventListener('click', () => editDogInfo(dog))
        
        btnHolder.appendChild(editBtn)
        row.append(dogName, dogBreed, dogSex, btnHolder)
        table.appendChild(row)
    })
}

function editDogInfo(dog) {
    const nameField = document.querySelectorAll('input')[0]
    const breedField = document.querySelectorAll('input')[1]
    const sexField = document.querySelectorAll('input')[2]
    
    nameField.value = dog.name
    breedField.value = dog.breed
    sexField.value = dog.sex
    form.dataset.id = dog.id
}

function editDogForm(event) {  
    event.preventDefault()
    const id = event.target.dataset.id   
    const name = event.target.name.value
    const breed = event.target.breed.value
    const sex = event.target.sex.value
    submitEditedDog(name, breed, sex, id)      
}


function submitEditedDog(name, breed, sex, id) {  
    const table = document.querySelector('tbody')

    const dogObj = {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
        },
        body: JSON.stringify({
            name: name,
            breed: breed,
            sex: sex
        })           
    }
    fetch(URL + `/${id}`, dogObj)
    .then(resp => resp.json())
    .then(dog => {
        table.innerHTML = ""
        addDogsToTable()
    }) 
    .catch((error) => console.log(error))
    
}