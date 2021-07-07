const nameListElement = document.querySelector('.name-list')
const inputSearchElement = document.querySelector('#search-field')

const names = [
    "Annabell Helper",
    "Laure Cheng",
    "Bev Dudding",
    "Clinton Hampshire",
    "Millard Soderman",
    "Palmira Hotz",
    "Fredric Ulloa",
    "Renetta Steffes",
    "Martha Bachelder",
    "Alene Burchard",
    "Augustus Glatz",
    "Youlanda Cardona",
    "Garnett Brignac",
    "Buffy Vedder",
    "Mary Storms",
    "Ervin Salsman",
    "Marielle Rambin",
    "Rueben Cothren",
    "Monnie Whipple",
    "Jayson Sullivan",
];

names.sort()


function renderNames(nameList, searchValue = '') {
    let firstChar = ''
    let listElementInnerHTML = ""

    if (nameList.length == 0)
        return nameListElement.innerHTML = `<center><li>No User Exist.</li></center>`

    for (let name of nameList) {
        if (name[0] !== firstChar) {
            firstChar = name[0]
            listElementInnerHTML += `<h4>${firstChar.toUpperCase()}</h4>`
        }
        if (searchValue) {
            const startIndex = name.toLowerCase().indexOf(searchValue)
            const endIndex = startIndex + searchValue.length - 1

            let spanHighLightElm = ""

            for (let i = 0; i < name.length; i++) {
                if (i == startIndex)
                    spanHighLightElm += "<span>"
                spanHighLightElm += name[i]
                if (i == endIndex)
                    spanHighLightElm += "</span>"
            }

            listElementInnerHTML += `<li>${spanHighLightElm}</li>`
        } else {
            listElementInnerHTML += `<li>${name}</li>`
        }
    }

    nameListElement.innerHTML = listElementInnerHTML

}

function handleinputChange() {
    let searchValue = inputSearchElement.value.toLowerCase();
    let filterNameList = []
    for (let name of names) {
        const isNameContains = name.toLowerCase().indexOf(searchValue) >= 0
        if (isNameContains) filterNameList.push(name)
    }
    renderNames(filterNameList, searchValue)

}


// add an keyup eve listener to inputSearch field
inputSearchElement.addEventListener('keyup', handleinputChange)


//render for first time the page load.
renderNames(names)