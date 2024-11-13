//ZADANIE 8
function isEven(numbers) {
    return numbers.filter(number => number % 2 !== 0);
}

module.exports = {
    isEven : isEven
};

