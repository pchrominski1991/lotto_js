const digitsRef = document.querySelectorAll('section input');
const playRef = document.querySelector('#playBtn');
const resultsRef = document.querySelector('#results');


const randInt = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const isNotEmpty = (digits) => digits.every((digit) => digit !== '');
const isDigits = (digits) => digits
    .every((digit) => `${parseInt(digit)}`.length === digit.length
        && !isNaN(parseInt(digit)))

const isInRange = (digits) => digits.every((digit) => (1 <= digit && digit <= 49))

const isNotRedundant = (digits) => digits.every((digit, id, array) => !array.includes(digit, id + 1))

const drawDigits = (amount) => {
    const temp = [];

    while (temp.length < amount) {
        const digit = randInt(1, 49);
        if (!temp.includes(digit)) {
            temp.push(digit)
        }
    }

    return temp
}

const checkHits = (userDigits, drawnDigits) => userDigits.filter((item) => drawnDigits.includes(item))

const showResults = (hits) => {
    let message = '';

    if (hits.length === 0) {
        message += 'Spróbuj jeszcze raz. Na pewno wygrasz! 🏆';
    } else {
        message += `Wygrałeś! Trafiłeś ${hits.length} liczb. Twoje liczby to ${hits.join(', ')} 🤑`
    }

    resultsRef.innerText = message
}


playRef.addEventListener('click', () => {
    const digitsText = [...digitsRef].map((input) => input.value);

    if (isNotEmpty(digitsText)) {
        if (isDigits(digitsText)) {
            const digits = digitsText.map((item) => parseInt(item))
            if (isInRange(digits)) {
                if (isNotRedundant(digits)) {
                    const drawnDigits = drawDigits(digits.length);
                    const hits = checkHits(digits, drawnDigits);
                    showResults(hits)
                } else {
                    console.log('Some digits are redundant')
                }

            } else {
                console.log('Some digits are out of range 1-49')
            }

        } else {
            console.log('Not all inputs are digits')
        }
    } else {
        console.log('Fill all digits');
    }
})

function oneHundredMillionsGames() {
    const userDigits = [25, 21, 8, 4, 18, 37]

    let counter = 0

    for (let i = 0; i < 100000000; i++) {
        const drawn = drawDigits(6);
        const hits = checkHits(userDigits, drawn);
        if (hits.length === 6){
            counter++;
            console.log('Won!', counter);
        }
        if (i % 1000000 === 0){
            console.log(i, 'times')
        }
    }

    console.log(`Wygrałeś ${counter}. Wygrana: ${-100000000 * 3 + (counter * 3000000)} PLN`)
}