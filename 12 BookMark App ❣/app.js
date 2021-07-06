const bookmarkCollection = document.querySelector(".bookmark-collection");




// function
function performOnBookmarkItem(e) {
    const targetElm = e.target
    console.log(targetElm)
    if (targetElm.classList.contains('remove-bookmark-item')) {
        const removeParentElm = targetElm.parentNode
        removeParentElm.classList.add('remove')
        console.log(removeParentElm)
        setTimeout(() => {
            bookmarkCollection.removeChild(removeParentElm)
        }, 500)
    } else if (targetElm.classList.contains('bookmark-name')) {
        window.open('https://google.com', 'blank');
    }
}









// AddEventListener.
bookmarkCollection.addEventListener("click", performOnBookmarkItem)