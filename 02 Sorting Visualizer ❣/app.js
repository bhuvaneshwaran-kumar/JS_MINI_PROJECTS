// Selecting HTML DOM Elements.
const sortingOuter = document.querySelector('.sortingOuter')
const numberElements = [...sortingOuter.querySelectorAll('#numberElements')]

// function that returns random number in a given Range.
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

let randomHeight = []; // array of random and unique number in a given range.
while (randomHeight.length < numberElements.length) {
    var r = Math.floor(randomNumber(200, sortingOuter.offsetHeight - 10)) + 1;
    if (randomHeight.indexOf(r) === -1) randomHeight.push(r);
}

// set the height of each number elements.
numberElements.forEach((numElem, index) => {
    numElem.style.height = `${randomHeight[index]}px`
})

function sleep(milliseconds) { // block the callStack for the given value in argument.
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function BubbleSort() {
    for (let i = 0; i < sortingOuter.children.length - 1; i++) {

        sortingOuter.children[i].style.backgroundColor = 'orange'

        for (let j = i + 1; j < sortingOuter.children.length; j++) {

            sortingOuter.children[j].style.backgroundColor = 'yellow'


            // if left Elements is greaterThan or Equal to Right Element the swap.
            if (sortingOuter.children[i].offsetHeight >= sortingOuter.children[j].offsetHeight) {

                sortingOuter.children[i].style.backgroundColor = 'green'
                sortingOuter.children[j].style.backgroundColor = 'green'

                await sleep(300)

                //Core logic Start 🔥🔥🔥🔥..
                //decide where the right element should be inserted.
                let beforeNode, afterNode
                beforeNode = sortingOuter.children[i].nextElementSibling

                if (beforeNode === sortingOuter.children[j]) {
                    beforeNode = sortingOuter.children[i]
                }
                if (!beforeNode) {
                    afterNode = sortingOuter.children[j].previousElementSibling
                }

                //Temp Right Element.
                let temp = sortingOuter.children[j]
                //Replacing the Left Elem with the Right Elem.
                sortingOuter.replaceChild(sortingOuter.children[i], sortingOuter.children[j])

                if (beforeNode) {
                    beforeNode.before(temp)
                }
                if (afterNode) {
                    afterNode.after(temp)
                }
                // core Logic End -🚀🚀🚀.

                sortingOuter.children[i].style.backgroundColor = 'orange'
                sortingOuter.children[j].style.backgroundColor = 'yellow'

            }
            await sleep(50)
            sortingOuter.children[j].style.backgroundColor = ''
        }
        sortingOuter.children[i].style.backgroundColor = ''
    }

}

BubbleSort()





