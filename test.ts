import { Point, Rectangle, Square } from "./rectangle";

const p1 = new Point(0, 10);
const p2 = new Point(10, 10);
const p3 = new Point(0, 0);
const p4 = new Point(10, 0);

const r1 = new Point(5, 5);
const r2 = new Point(5, 15);
const r3 = new Point(15, 5);
const r4 = new Point(15, 15);

const t1 = new Point(0,5);
const t2 = new Point(5,5);
const t3 = new Point(0,0);
const t4 = new Point(5,0);

const point = new Point(0,0)

const rect = new Rectangle(p1, p2, p3, p4);
const rect2 = new Rectangle(r1,r2,r3,r4);
const rect3 = new Rectangle(t1, t2, t3, t4);

const square = new Square(point, 5);

console.log(rect.getArea());

rect.move(5, -5);
console.log(rect.topLeft);
console.log(rect.getArea());

// ---

console.log("Before rotation: ")
console.log(rect);

rect.rotate(90);

console.log("After rotation: ")
console.log(rect);

// ---

console.log("Before scaling:")
console.log(rect2);

rect2.scale(2);

console.log("After scaling:")
console.log(rect2);

// ---

//const errorPoint = new Point(100, NaN);

// ---

console.log("New square")
console.log(square);

square.scale(2);
console.log("Square after rotation:")
console.log(square)

// ---

console.log(rect3.getPerimeter());
