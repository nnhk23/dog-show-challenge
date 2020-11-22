const URL = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
    addDogsToTable()
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
        editBtn.dataset.id = dog.id
        editBtn.addEventListener('click', () => editDogInfo(dog))
        
        btnHolder.appendChild(editBtn)
        row.append(dogName, dogBreed, dogSex, btnHolder)
        table.appendChild(row)
    })
}

function editDogInfo(dog) {
    const form = document.querySelector('#dog-form')
    const nameField = document.querySelectorAll('input')[0]
    const breedField = document.querySelectorAll('input')[1]
    const sexField = document.querySelectorAll('input')[2]
    
    nameField.value = dog.name
    breedField.value = dog.breed
    sexField.value = dog.sex

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        e.target.dataset.id = dog.id
        submitEditedDog(e, dog)      
    })
}

function submitEditedDog(e, dog) {  
    const nameField = document.querySelectorAll('input')[0]
    const breedField = document.querySelectorAll('input')[1]
    const sexField = document.querySelectorAll('input')[2]
    const table = document.querySelector('tbody')
    const id = e.target.dataset.id

    const dogObj = {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
        },
        body: JSON.stringify({
            name: dog.name = nameField.value,
            breed: dog.breed = breedField.value,
            sex: dog.sex = sexField.value
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