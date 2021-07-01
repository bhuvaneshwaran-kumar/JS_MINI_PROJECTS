
const paginationNav = document.querySelector('.pagination-nav')
const pageNumberElm = paginationNav.querySelectorAll('.page-number')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
let currentPage
const showUserData = document.querySelector('.users-data')
const loaderDiv = document.querySelector('.loader')



// ----Function. handels the click event hapens in pagination nav bar in bottom.
function HandleClickPage(e) {
    const targetElement = e.target
    if (targetElement.classList.contains('page-number')) {
        let targetElementNumber = parseInt(targetElement.getAttribute('data-number'))
        viewPage(targetElementNumber)
        return
    }
    if (targetElement.classList.contains('prev')) {
        if (currentPage === 1) return;

        const currentElem = [...pageNumberElm].reduce((prev, next) => {
            if (prev?.classList.contains('active')) return prev;
            if (next.classList.contains('active')) return next;

        })

        const currentPageNum = parseInt(currentElem.getAttribute('data-number')) - 1
        viewPage(currentPageNum)
        return
    }
    if (targetElement.classList.contains('next')) {
        if (currentPage === 5) return;

        const currentElem = [...pageNumberElm].reduce((prev, next) => {
            if (prev?.classList.contains('active')) return prev;
            if (next.classList.contains('active')) return next;

        })

        const currentPageNum = parseInt(currentElem.getAttribute('data-number')) + 1
        viewPage(currentPageNum)
        return
    }
}

function viewPage(pageNumber) {
    if (currentPage === pageNumber) return;
    currentPage = pageNumber;
    [...pageNumberElm].forEach((elm, index) => {
        if (index === pageNumber - 1) {
            return elm.classList.add('active')
        }
        elm.classList.remove('active')
    })
    showUserData.innerHTML = ''
    showUserDataInPage(pageNumber)
}

async function showUserDataInPage(pageNumber) {
    startLoader()
    const result = await fetch(`https://randomuser.me/api/?page=${pageNumber}&results=10&seed=abc`)
    const data = await result.json()
    const users = data.results
    users.forEach((user, index) => {
        let { country } = user.location
        let { title, first, last } = user.name
        let fullName = `${title}.${first + ' ' + last} `
        let { thumbnail } = user.picture

        const userDiv = document.createElement('div')
        const imgDiv = document.createElement('div')
        const imgElm = document.createElement('img')
        const detailDiv = document.createElement('div')
        const nameElm = document.createElement('p')
        const countryElm = document.createElement('p')

        userDiv.classList.add('user')
        imgDiv.classList.add('img')
        detailDiv.classList.add('detial')
        nameElm.classList.add('name')
        countryElm.classList.add('country')

        detailDiv.appendChild(nameElm)
        detailDiv.appendChild(countryElm)

        imgDiv.appendChild(imgElm)

        userDiv.appendChild(imgDiv)
        userDiv.appendChild(detailDiv)
        userDiv.setAttribute('id', index)

        imgElm.setAttribute('src', thumbnail)
        nameElm.textContent = fullName
        countryElm.textContent = country

        showUserData.appendChild(userDiv)

    })
    endLoader()
}


function startLoader() {
    showUserData.classList.remove('active')
    loaderDiv.classList.add('active')
}
function endLoader() {
    showUserData.classList.add('active')
    loaderDiv.classList.remove('active')

}


// ----Event Listeners.
paginationNav.addEventListener('click', HandleClickPage)
viewPage(1)