// DOM OPERATIONS
const password = document.querySelector('.password');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const error = document.querySelector('.error');

function countFrequences(char = '') {
    if (typeof char !== 'string') return {
        letter: 0,
        integer: 0,
        specialChar: 0
    };

    const result = {
        letter: 0,
        integer: 0,
        specialChar: 0
    };

    // Regular Expressions
    const regexLetter = /[a-zA-Z]/;
    const regexInteger = /[0-9]/;
    const regexSpecial = /[!@#$%^&*()_+\-={}[\]|\\:;"'<>,.?/~]/;

    for (let caractere of char) {
        if (regexLetter.test(caractere)) {
            result.letter++;
        } else if (regexInteger.test(caractere)) {
            result.integer++;
        } else if (regexSpecial.test(caractere)) {
            result.specialChar++;
        }
    }

    return result;
}

function generatePassword(length) {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const number = '0123456789';
    const upper = lower.toUpperCase();
    const specialchar = '!@#$%^&*()_+-={}[]|\\:;"\'<>,.?/~';
    const allChar = lower + upper + number + specialchar;

    let password = '';
    let freq;

    do {
        password = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allChar.length);
            password += allChar[randomIndex];
        }

        freq = countFrequences(password); 

    } while (
        freq.integer < 3 ||
        freq.letter < 5 ||
        freq.specialChar < 2
    );

    return password;
}

generateBtn.addEventListener('click', () => {
    const length = document.getElementById('length').value;
    if (length < 12) {
        error.textContent = "The minimal length is 12.";
        return
    }
    error.textContent = ""
    password.textContent = generatePassword(length);
    })

copyBtn.addEventListener('click', async () => {
    try {
        console.log(password.textContent);
        await navigator.clipboard.writeText(password.textContent);
        console.log('Mot de passe copié ✔');
    } catch (err) {
        console.error('Erreur de copie ❌', err);
    }
});
