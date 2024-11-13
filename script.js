const arr = [1,2,3,4,5,6];

//ZADANIE2

console.log("Tablica: ", arr);
console.log("Dlugosc tablicy: ", arr.length);

arr.pop();

console.log("Dlugosc tablicy: ", arr.length);
console.log("Tablica: ", arr);

//ZADANIE3

function modArr(arr, position, value){

    const newArr = [...arr];

        if(position === 0){
            newArr.unshift(value);
        } else if(position === 1) {
            newArr.push(value);
        } else {
            console.error("error")
            return arr;
        }

    return newArr
}

const arr1 = modArr(arr,1,6)
console.log(arr1);
const arr2 = modArr(arr,0,6)
console.log(arr2);

const text = "1.2.3.4.5.6.7.8.9";
console.log(text);

//ZADANIE4

function squareNum(string){
    const num = string
    .split('.')
    .map(x => Math.pow(Number(x), 2));

    return num.join('.');
}

const x = squareNum(text);
console.log(x)

//ZADANIE5

const poleKwadratu = (a) => a * a;

let a = poleKwadratu(5);
let b = poleKwadratu(50);

console.log(a);
console.log(b);

//ZADANIE6

const students = ["Olek", "Janek", "Stefan", "Tymek", "Sławek"];

function losStudent(tab){
    let length = tab.length;
    let index = Math.floor(Math.random(2)*length);

    return tab[index];
}

let osoba = losStudent(students);

console.log(osoba)

//ZADANIE7

function losujLiczby(ilosc, czas) {
    let i = 0;

    function losuj() {
        if (i < ilosc) {
            let liczba = Math.round(Math.random() * 1000);
            console.log('Liczba', i+1 ,': ', liczba);
            i++;
            setTimeout(losuj,czas)
        }
    }

    losuj();

  }

losujLiczby(8,1500)

//ZADANIE 7

function connect(imie){
    setInterval(() => console.log(imie), 3000);
}

connect('Adrian');
