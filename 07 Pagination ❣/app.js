
const paginationNav = document.querySelector('.pagination-nav')
const pageNumberElm = paginationNav.querySelectorAll('.page-number')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
let currentPage = 1



// ----Function.
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

}

// ----Event Listeners.

paginationNav.addEventListener('click', HandleClickPage)