"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rectangle_1 = require("./rectangle");
var p1 = new rectangle_1.Point(0, 10);
var p2 = new rectangle_1.Point(10, 10);
var p3 = new rectangle_1.Point(0, 0);
var p4 = new rectangle_1.Point(10, 0);
var r1 = new rectangle_1.Point(5, 5);
var r2 = new rectangle_1.Point(5, 15);
var r3 = new rectangle_1.Point(15, 5);
var r4 = new rectangle_1.Point(15, 15);
var t1 = new rectangle_1.Point(0, 5);
var t2 = new rectangle_1.Point(5, 5);
var t3 = new rectangle_1.Point(0, 0);
var t4 = new rectangle_1.Point(5, 0);
var point = new rectangle_1.Point(0, 0);
var rect = new rectangle_1.Rectangle(p1, p2, p3, p4);
var rect2 = new rectangle_1.Rectangle(r1, r2, r3, r4);
var rect3 = new rectangle_1.Rectangle(t1, t2, t3, t4);
var square = new rectangle_1.Square(point, 5);
console.log(rect.getArea());
rect.move(5, -5);
console.log(rect.topLeft);
console.log(rect.getArea());
// ---
console.log("Before rotation: ");
console.log(rect);
rect.rotate(90);
console.log("After rotation: ");
console.log(rect);
// ---
console.log("Before scaling:");
console.log(rect2);
rect2.scale(2);
console.log("After scaling:");
console.log(rect2);
// ---
//const errorPoint = new Point(100, NaN);
// ---
console.log("New square");
console.log(square);
square.scale(2);
console.log("Square after rotation:");
console.log(square);
// ---
console.log(rect3.getPerimeter());
