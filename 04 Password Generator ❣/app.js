const passwordGeneratorForm = document.querySelector('form')
const snackBar = document.querySelector('.snackbar')


passwordGeneratorForm.lengthNumber.addEventListener('input', syncCharacterAmount)
passwordGeneratorForm.lengthRange.addEventListener('input', syncCharacterAmount)

// Sync the values in lengthRange and lengthNumber
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
        console.log('copied')
        snackBar.classList.add('snackbar-active')
        timer = setTimeout(() => {
            snackBar.classList.remove('snackbar-active')
        }, 1500)
    }).catch(() => console.log('not able to copy.'))
    clearTimeout(timer)
}