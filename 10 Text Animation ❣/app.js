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
typeWriter.prototype.type = function () { // prototype inheritance ❤*❤
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // get full text of the current word.
    const fullText = this.words[current];

    if (this.isDeleting) {
        this.txt = fullText.substring(0, this.txt.length - 1) // remove one letter from right.
    } else {
        this.txt = fullText.substring(0, this.txt.length + 1) // add the next letter to the right.
    }

    this.textElement.innerHTML = `<span class="txt">${this.txt}</span>` // append the span to textElement.

    let typeSpeed = 100; // deside the speed.

    if (this.isDeleting) {
        typeSpeed /= 2; // increase the delete speed.
    }

    if (!this.isDeleting && this.txt === fullText) {
        typeSpeed = this.wait // wait for the given time.
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 100;
    }

    setTimeout(() => this.type(), typeSpeed)

}

new typeWriter(textContentElm, ["Hi Dev's,", "This is Bhuvan.", "Exploring The JS..!"], 2000)