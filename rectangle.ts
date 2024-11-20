export interface Movable{
    move(dx: number, dy: number) : void;
}


export class Point implements Movable{
    x: number;
    y: number;

    constructor(x: number, y: number){
        if(typeof x !== 'number' || isNaN(x) || typeof y !== 'number' || isNaN(y)) {
            throw new Error(`Invalid coordinates: x=${x}, y=${y}`)
        }

        this.x = x;
        this.y = y;
    }

    move(dx: number, dy: number): void {
        this.x += dx;
        this.y += dy;
    }

    rotate(angle: number, origin: Point): void {
        const radians = angle * (Math.PI / 180);
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);

        const translatedX = this.x - origin.x;
        const translatedY = this.y - origin.y;

        const rotatedX = translatedX * cos - translatedY * sin;
        const rotatedY = translatedX * sin + translatedY * cos;

        this.x = rotatedX + origin.x;
        this.y = rotatedY + origin.y;
    }

}


export class Rectangle implements Movable{
    topLeft: Point;
    topRight: Point;
    btmLeft: Point;
    btmRight: Point;

    constructor(topLeft: Point, topRight: Point, btmLeft: Point, btmRight: Point) {
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.btmLeft = btmLeft;
        this.btmRight = btmRight;
    }

    move(dx: number, dy: number ): void {
        this.topLeft.move(dx,dy);
        this.topRight.move(dx, dy);
        this.btmLeft.move(dx, dy);
        this.btmRight.move(dx, dy);
    }

    getArea(): number {
        const width = Math.abs(this.topRight.x - this.topLeft.x);
        const height = Math.abs(this.topLeft.y - this.btmRight.y);
        return width * height;
    }

    rotate(angle: number): void {
        const origin = this.topLeft;

        this.topRight.rotate(angle, origin);
        this.btmLeft.rotate(angle, origin);
        this.btmRight.rotate(angle, origin);
    }

    scale(factor: number): void {
        const centerX = (this.topLeft.x + this.btmRight.x) / 2;
        const centerY = (this.topLeft.y + this.btmRight.y) / 2;
    
        const scalePoint = (point: Point, centerX: number, centerY: number, factor: number) => {
            point.x = centerX + (point.x - centerX) * factor;
            point.y = centerY + (point.y - centerY) * factor;
        };
    
        scalePoint(this.topLeft, centerX, centerY, factor);
        scalePoint(this.topRight, centerX, centerY, factor);
        scalePoint(this.btmLeft, centerX, centerY, factor);
        scalePoint(this.btmRight, centerX, centerY, factor);
    }

    getPerimeter(): number {
        const width = Math.abs(this.topRight.x - this.topLeft.x);
        const height = Math.abs(this.topLeft.y - this.btmLeft.y);
        return 2 * (width + height);
    }

}

export class Square extends Rectangle {
    constructor(topLeft: Point, sideLength: number) {
        if (sideLength <= 0 || isNaN(sideLength)) {
            throw new Error('Side length must be a positive number')
        }

        const topRight = new Point(topLeft.x + sideLength, topLeft.y);
        const btmLeft = new Point(topLeft.x, topLeft.y - sideLength);
        const btmRight = new Point(topLeft.x + sideLength, topLeft.y - sideLength);
        
        super(topLeft, topRight, btmLeft, btmRight);
    }

    move(dx: number, dy: number): void {
        super.move(dx, dy);
    }

    rotate(angle: number): void {
        super.rotate(angle);
    }

    scale(factor: number): void {
        super.scale(factor);
    }
}