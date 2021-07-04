const textContentElm = document.querySelector(".text-content");
const typeWriter = function (textElement, words, wait = 3000) {
    this.textElement = textElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

//type method
typeWriter.prototype.type = function () {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // get full text of the current word.
    const fullText = this.words[current];
    console.log(typeof fullText);
    if (this.isDeleting) {
        this.txt = fullText.substring(0, this.txt.length - 1)
    } else {
        this.txt = fullText.substring(0, this.txt.length + 1)
    }

    this.textElement.innerHTML = `<span class="txt">${this.txt}</span>`

    let typeSpeed = 100;

    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullText) {
        typeSpeed = this.wait
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 100;
    }

    setTimeout(() => this.type(), typeSpeed)

}

new typeWriter(textContentElm, ["Hi Dev's", "This is Bhuvan", "Exploring The js"], 2000)







// const textArr = textContentElm.textContent.split('')

// textContentElm.textContent = ""

// textArr.forEach((letter, index) => {
//     let span = document.createElement('span')
//     span.setAttribute('id', index)
//     span.textContent = letter
//     textContentElm.appendChild(span)
// })

// let index = 0
// let spans = [...textContentElm.querySelectorAll('span')]
// console.log(spans)
// let timer = setInterval(() => {
//     spans[index].classList.add('show')
//     index += 1
//     if (index === spans.length) {
//         clearInterval(timer)
//     }
// }, 50)