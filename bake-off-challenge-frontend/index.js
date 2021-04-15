// your code here!
console.log("🥧")

// Deliverable 1

// Global Variables
const bakesContainer = document.querySelector('#bakes-container')
const newBakeForm = document.querySelector('#new-bake-form')
// 

function renderOneDessert(dessertObj) {
    // console.log(dessertObj)
    const dessertLi = document.createElement('li')
    dessertLi.dataset.id = dessertObj.id
    dessertLi.className = 'item'
    // console.log(dessertLi)
    dessertLi.innerHTML = dessertObj.name
    // console.log(dessertLi)
    bakesContainer.append(dessertLi)
}

function renderAllDesserts() {
    fetch('http://localhost:3000/bakes')
        .then(resp => resp.json())
        .then(dessertArr => {
            dessertArr.forEach(bakeObj => {
                renderOneDessert(bakeObj)
            })

            renderDessertOnPage(dessertArr[0])
        })
}

renderAllDesserts()

// Deliverable 2

function renderDessertOnPage (dessertObject) {
    const detailDiv = document.querySelector('#detail')
    // detailDiv.dataset.id = dessertObject.id
    // console.log(detailDiv)
    detailDiv.innerHTML = `
    <img src=${dessertObject.image_url} alt=${dessertObject.name}>
    <h1>${dessertObject.name}</h1>
    <p class="description">
      ${dessertObject.description}
    </p>
    <form id="score-form" data-id='${dessertObject.id}'>
      <input value='${dessertObject.score}'type="number" name="score" min="0" max="10" step="1">
      <input type="submit" value="Rate">
    </form>`
}


bakesContainer.addEventListener('click', (event) => {
    // if (event.target.matches("item"))
        fetch(`http://localhost:3000/bakes/${event.target.dataset.id}`)
            .then(resp => resp.json())
            .then(renderDessertOnPage)
})

// Deliverable 3

newBakeForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const name = event.target.name.value
    const imageUrl = event.target.image_url.value
    const description = event.target.description.value

    const newBakeObj = {
        name,
        imageUrl,
        description
    }

    fetch(`http://localhost:3000/bakes`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newBakeObj)
    })
        .then(resp => resp.json())
        .then(bakeObj => {
            renderDessertOnPage(bakeObj)
        })
})