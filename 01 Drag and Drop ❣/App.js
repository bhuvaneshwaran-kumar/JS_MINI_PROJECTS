const itemContainers = document.querySelectorAll('.item-container')
const items = document.querySelectorAll('.item')
const favorites = document.querySelector('.favorites')

// Checks if the favorites list container is Full.
const checkFavouriteIsFull = () => {
    let itemsLength = [...favorites.querySelectorAll('.item')].length
    return (itemsLength < 2) ? true : false
}

//Add and Remove the dragging class in items, in order to reduce the opacity of dragging element.
items.forEach((item) => {
    item.addEventListener('dragstart', () => item.classList.add('dragging'))
    item.addEventListener('dragend', () => item.classList.remove('dragging'))
})


//Both the containers listen to the dragover event. 
itemContainers.forEach((container) => {

    container.addEventListener('dragover', (e) => {
        e.preventDefault()
        const dragging = document.querySelector('.dragging')
        const afterElement = getDragAfterElement(container, e.clientY)
        console.log(afterElement)



        if (container === favorites && !checkFavouriteIsFull())
            return


        if (afterElement == null) {
            container.appendChild(dragging)
        } else {
            container.insertBefore(dragging, afterElement)
        }

        console.log('varan perandi.🔥')
    })

})


// returns the closest element.
function getDragAfterElement(container, mousePositionY) {

    //Select all the element in container except dragging item.
    const items = [...container.querySelectorAll('.item:not(.dragging)')]


    return items.reduce((closest, child) => {

        //The Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.

        const { top, height } = child.getBoundingClientRect()
        const offSet = mousePositionY - top - height / 2

        // if the offset is negative and it is gretor than the previous offset
        if (offSet < 0 && offSet > closest.offSet) {
            return { offSet: offSet, element: child }
        } else {
            return closest
        }

    }, { offSet: Number.NEGATIVE_INFINITY }).element //returns only the element in the object.


}

// A short distance measured perpendicularly from a main survey line is called offset .