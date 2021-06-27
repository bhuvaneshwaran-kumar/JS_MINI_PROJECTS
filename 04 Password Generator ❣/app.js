const passwordGeneratorForm = document.querySelector('form')
const snackBar = document.querySelector('.snackbar')

// Storing the ASCII codes in an respective individual array.
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBERS_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOLS_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(arrayFromLowToHigh(58, 64)).concat(arrayFromLowToHigh(91, 96)).concat(arrayFromLowToHigh(123, 126))
// function used to loop through the characterSet sequence.
function arrayFromLowToHigh(low, high) {
    const array = []
    for (let i = low; i <= high; i++) {
        array.push(i)
    }
    return array
}


// Sync the values in lengthRange and lengthNumber
passwordGeneratorForm.lengthNumber.addEventListener('input', syncCharacterAmount)
passwordGeneratorForm.lengthRange.addEventListener('input', syncCharacterAmount)
function syncCharacterAmount(e) {
    const value = e.target.value
    passwordGeneratorForm.lengthNumber.value = value
    passwordGeneratorForm.lengthRange.value = value
}


// copies the generated password to the clipboard.
passwordGeneratorForm.copyBtn.addEventListener('click', copyToClipBoard)
function copyToClipBoard(e) {
    e.preventDefault()
    let password = passwordGeneratorForm.generatedPassword.value
    password = password.trim()
    if (password === '') return
    let timer
    navigator.clipboard.writeText(password).then(() => {
        snackBar.classList.add('snackbar-active')
        timer = setTimeout(() => {
            snackBar.classList.remove('snackbar-active')
        }, 1500)
    }).catch(() => console.log('not able to copy.'))
    clearTimeout(timer)
}

//Core logic Start 🔥🔥🔥🔥..

// When user Hit's the generatePassword button.
function generatePassword(characterLenght, includeUpperCase, includeNumbers, includeSymbols) {
    let characterSet = LOWERCASE_CHAR_CODES
    if (includeUpperCase) characterSet.push(...UPPERCASE_CHAR_CODES)
    if (includeNumbers) characterSet.push(...NUMBERS_CHAR_CODES)
    if (includeSymbols) characterSet.push(...SYMBOLS_CHAR_CODES)

    const passwordCharacter = []
    for (let i = 0; i < characterLenght; i++) {
        let characterCode = characterSet[Math.floor(Math.random() * characterSet.length)]
        passwordCharacter.push(String.fromCharCode(characterCode))//convert char code to actual char.
    }

    return passwordCharacter.join('')


}

passwordGeneratorForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let includeUpperCase = passwordGeneratorForm.uppercase.checked
    let includeNumbers = passwordGeneratorForm.numbers.checked
    let includeSymbols = passwordGeneratorForm.symbols.checked
    let characterLenght = passwordGeneratorForm.lengthNumber.value
    let password = generatePassword(characterLenght, includeUpperCase, includeNumbers, includeSymbols)
    passwordGeneratorForm.generatedPassword.value = password
})




