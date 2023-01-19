

console.log("js file connected");


let submitButton = document.getElementById('submit-button');



submitButton.addEventListener('click', async () => {
    // send a request to Express 
    // result is the response from the server
    // get element
    // let nameElement = document.getElementById('name-input')
    // // get value of element
    // let nameString = nameElement.value;

    let nameString = document.getElementById('name-input').value;
    let colorString = document.getElementById('color-input').value;
    let ageNumber = +document.getElementById('age-input').value;
    // using ternary operator here - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    let readyBool = document.getElementById('ready-bool').value === "true" ? true : false;

    // packing all our data in an object
    // same as 
    // nameString: nameString
    const fruit = {
        nameString,
        colorString,
        ageNumber,
        readyBool
    }

    let response = await fetch('/food/create_fruit', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        // to send JSON data over HTTP
        body: JSON.stringify(fruit)
    })

    let uploadStatusTag = document.getElementById('upload-status');
    console.log(response.status);

    if (response.status === 200) {
        console.log(response);
        console.log("upload complete!!!");
        uploadStatusTag.textContent = "Upload Completed";
        uploadStatusTag.style.color = "green";

    } else {
        console.log(response);
        console.log("upload failed");
        console.log;
        uploadStatusTag.textContent = "Upload Failed";
        uploadStatusTag.style.color = "red";

    }
    getData()

    // axios({
    //     method: "post",
    //     url: "'http://localhost:5000/create_fruit'",
    //     body: fruit
    // })

})

let containerElement = document.getElementById('fruit-name');
const getData = async () => {
    let data = await fetch("/food/fruits");
    console.log(data);
    data.json().then((parsedData) => {
        console.log(parsedData); // array of objects
        // map through and put in HTML
        // push each individual one,  or push an array of HTML 
        while (containerElement.firstChild) {
            containerElement.removeChild(containerElement.firstChild)
        }
        if (parsedData.length > 0) {
            let header = document.createElement('h3');
            header.textContent = 'Available Fruits';
            containerElement.appendChild(header)
        }
        parsedData.forEach((object) => {
            // if not ready to eat- red text
            let pTag = document.createElement("p"); // <p></p>
            pTag.textContent = object.name; // <p>apple</p>
            if (object.readyToEat !== true) {
                pTag.style.color = "red"
            } else {
                pTag.style.color = "green"
            }
            containerElement.appendChild(pTag);
        })
    })
}

if (location.reload) {
    getData()
}

let searchButton = document.getElementById('search-btn');

const searchItem = async () => {
    let itemName = document.getElementById('search-input').value.toLowerCase().trim();
    console.log(itemName);
    if (itemName !== '') {
        let response = await fetch(`/food/fruits/${itemName}`);
        let parseData = await response.json()

        while (containerElement.childNodes.length > 0) {
            containerElement.removeChild(containerElement.lastChild);
        }
        if (parseData.length > 0) {
            let header = document.createElement('h3');
            header.textContent = 'Fruits';
            containerElement.appendChild(header)
            parseData.forEach((object) => {
                // if not ready to eat- red text
                let name = document.createElement("p");
                let age = document.createElement('p');
                let readyToEat = document.createElement('p');// <p></p>
                name.textContent = 'Name : ' + object.name; // <p>Name : apple</p>
                age.textContent = 'Age : ' + object.age; //<p>Age : 4</p>
                readyToEat.textContent = 'Ready to eat : ' + object.readyToEat

                containerElement.appendChild(name);
                containerElement.appendChild(age);
                containerElement.appendChild(readyToEat)
            })

        }
        else {
            let message = document.createElement("h2");
            message.style.color = 'red'
            message.textContent = 'The fruit was not found.'
            containerElement.appendChild(message)
        }
    }

}
searchButton.addEventListener('click', searchItem)

let displayVeggiePageButton = document.getElementById('veggie-page-button');

displayVeggiePageButton.addEventListener('click', () => {
    // change HTML files (from index to display_food.html)
    window.location.href = "../display_veggies"
})

let homePageButton = document.getElementById('homepage-button');

homePageButton.addEventListener('click', () => {
    // change HTML files (from index to display_food.html)
    window.location.href = "../"
})