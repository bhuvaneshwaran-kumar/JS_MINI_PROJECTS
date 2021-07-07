const bookmarkCollection = document.querySelector(".bookmark-collection");
const bookmarkForm = document.querySelector(".form")
const messageElm = document.querySelector(".message")

let bookmarkLocal = [];

//Retrive The bookmark in Local Storage if not present set an empty [] then return.
function retriveBookmarkLocal() {
    let arr = localStorage.getItem('JSMINI_bookmarks')
    arr = JSON.parse(arr)
    if (arr === null) {
        localStorage.setItem('JSMINI_bookmarks', JSON.stringify([]))
        arr = []
    }
    return arr
}

//validate a URL
function validateURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}


// CB-function when user click bookmark_Iteam div.
let trottlingTimer = true;
function performOnBookmarkItem(e) {
    if (trottlingTimer) {
        trottlingTimer = false;
        const targetElm = e.target
        console.log(targetElm)
        if (targetElm.classList.contains('remove-bookmark-item')) {
            const removeParentElm = targetElm.parentNode
            removeParentElm.classList.add('remove')
            console.log(removeParentElm)
            const removeIndex = [...bookmarkCollection.children].indexOf(removeParentElm)
            setTimeout(() => {
                removeBookmarkInLocalStorage(removeIndex)
                bookmarkCollection.removeChild(removeParentElm)
                trottlingTimer = true
            }, 500)
        } else if (targetElm.classList.contains('bookmark-name')) {
            window.open(targetElm.getAttribute('data-url'));
        }
    }
}

let timer // display the error and success message form 2s
function showMessage(hasError, element, message) {
    clearTimeout(timer)
    element.classList.add('active')
    element.textContent = message
    if (hasError) {
        element.classList.add('error')
    }

    timer = setTimeout(() => {
        element.classList.remove('active')
        element.classList.remove('error')
    }, 2000)
}

// when user submits the form.
function formSubmit(e) {
    e.preventDefault()
    const formName = bookmarkForm.formName.value
    let formUrl = bookmarkForm.formUrl.value

    if (formName.trim() === '') return showMessage(true, messageElm, "BookMark Name is must required.")

    if (formUrl.trim() === '') return showMessage(true, messageElm, "BookMark URL is must required.")

    if (!formUrl.includes('https://', 'http://'))
        formUrl = `https://${formUrl}`

    if (!validateURL(formUrl)) {
        showMessage(true, messageElm, "URL is not valid")
        return bookmarkForm.formUrl.value = ""
    }

    addBookmarkToLocalStorage(formName, formUrl)
    appendUrlElm(formName, formUrl)

    bookmarkForm.formName.value = ''
    bookmarkForm.formUrl.value = ''
    showMessage(false, messageElm, "Successfully added the bookmark.")

}

// creates a respective element with the class list.
function createElemet(element, classItems = []) {
    const Element = document.createElement(element)

    classItems.forEach((elm) => {
        Element.classList.add(elm)
    })

    return Element
}

//append the URL element to the bookmarkCollection element.
function appendUrlElm(formName, formUrl) {
    const bookmarkItemElm = createElemet('div', ['bookmark-item'])
    const bookmarkNameElm = createElemet('p', ['bookmark-name'])
    const removeBookmarkElm = createElemet('p', ['remove-bookmark-item'])


    bookmarkNameElm.textContent = formName
    bookmarkNameElm.setAttribute('data-url', formUrl)
    removeBookmarkElm.textContent = '❌'

    bookmarkItemElm.appendChild(bookmarkNameElm)
    bookmarkItemElm.appendChild(removeBookmarkElm)

    bookmarkCollection.prepend(bookmarkItemElm)


}

//add||prepend the bookmark to the localStorage
function addBookmarkToLocalStorage(formName, formUrl) {
    bookmarkLocal = [...bookmarkLocal, { name: formName, url: formUrl }]
    localStorage.setItem('JSMINI_bookmarks', JSON.stringify(bookmarkLocal))
}

//remover the bookmark in localStorage using index
function removeBookmarkInLocalStorage(index) {

    bookmarkLocal = bookmarkLocal.filter((data, dataIndex) => {
        if (index !== dataIndex) return data
    })

    localStorage.setItem('JSMINI_bookmarks', JSON.stringify(bookmarkLocal))
}




// AddEventListener.
bookmarkCollection.addEventListener("click", performOnBookmarkItem)
bookmarkForm.addEventListener('submit', formSubmit)



// Initial call to render url elements in bookmark collection.
bookmarkLocal = retriveBookmarkLocal()
if (bookmarkLocal.length === 0)
    appendUrlElm('bhuvan', 'https://bhuvan.com')
else
    bookmarkLocal.forEach(data => appendUrlElm(data.name, data.url))


