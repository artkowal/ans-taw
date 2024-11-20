"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square = exports.Rectangle = exports.Point = void 0;
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (typeof x !== 'number' || isNaN(x) || typeof y !== 'number' || isNaN(y)) {
            throw new Error("Invalid coordinates: x=".concat(x, ", y=").concat(y));
        }
        this.x = x;
        this.y = y;
    }
    Point.prototype.move = function (dx, dy) {
        this.x += dx;
        this.y += dy;
    };
    Point.prototype.rotate = function (angle, origin) {
        var radians = angle * (Math.PI / 180);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var translatedX = this.x - origin.x;
        var translatedY = this.y - origin.y;
        var rotatedX = translatedX * cos - translatedY * sin;
        var rotatedY = translatedX * sin + translatedY * cos;
        this.x = rotatedX + origin.x;
        this.y = rotatedY + origin.y;
    };
    return Point;
}());
exports.Point = Point;
var Rectangle = /** @class */ (function () {
    function Rectangle(topLeft, topRight, btmLeft, btmRight) {
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.btmLeft = btmLeft;
        this.btmRight = btmRight;
    }
    Rectangle.prototype.move = function (dx, dy) {
        this.topLeft.move(dx, dy);
        this.topRight.move(dx, dy);
        this.btmLeft.move(dx, dy);
        this.btmRight.move(dx, dy);
    };
    Rectangle.prototype.getArea = function () {
        var width = Math.abs(this.topRight.x - this.topLeft.x);
        var height = Math.abs(this.topLeft.y - this.btmRight.y);
        return width * height;
    };
    Rectangle.prototype.rotate = function (angle) {
        var origin = this.topLeft;
        this.topRight.rotate(angle, origin);
        this.btmLeft.rotate(angle, origin);
        this.btmRight.rotate(angle, origin);
    };
    Rectangle.prototype.scale = function (factor) {
        var centerX = (this.topLeft.x + this.btmRight.x) / 2;
        var centerY = (this.topLeft.y + this.btmRight.y) / 2;
        var scalePoint = function (point, centerX, centerY, factor) {
            point.x = centerX + (point.x - centerX) * factor;
            point.y = centerY + (point.y - centerY) * factor;
        };
        scalePoint(this.topLeft, centerX, centerY, factor);
        scalePoint(this.topRight, centerX, centerY, factor);
        scalePoint(this.btmLeft, centerX, centerY, factor);
        scalePoint(this.btmRight, centerX, centerY, factor);
    };
    Rectangle.prototype.getPerimeter = function () {
        var width = Math.abs(this.topRight.x - this.topLeft.x);
        var height = Math.abs(this.topLeft.y - this.btmLeft.y);
        return 2 * (width + height);
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(topLeft, sideLength) {
        if (sideLength <= 0 || isNaN(sideLength)) {
            throw new Error('Side length must be a positive number');
        }
        var topRight = new Point(topLeft.x + sideLength, topLeft.y);
        var btmLeft = new Point(topLeft.x, topLeft.y - sideLength);
        var btmRight = new Point(topLeft.x + sideLength, topLeft.y - sideLength);
        return _super.call(this, topLeft, topRight, btmLeft, btmRight) || this;
    }
    Square.prototype.move = function (dx, dy) {
        _super.prototype.move.call(this, dx, dy);
    };
    Square.prototype.rotate = function (angle) {
        _super.prototype.rotate.call(this, angle);
    };
    Square.prototype.scale = function (factor) {
        _super.prototype.scale.call(this, factor);
    };
    return Square;
}(Rectangle));
exports.Square = Square;
