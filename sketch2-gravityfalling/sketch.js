
const canvasWidth = 800;
const canvasHeight = 600;

let circleCurrX = canvasWidth / 2;
let circleCurrY = 150;

const circleColor = [255,0,0]
const circleSize = 50

const timeStep = 0.001;
const scale = 50; // 100 pixels per meter

const maxVelocity = 3000;


let t = 0; // time since start in seconds
let velocity = 1
let acceleration = 9.8 * scale


// deltaTime is the number of milliseconds since the previous frame.

let circles = [];
const numCircles = 10;
class Circle {
    constructor(x, y, diameter, color) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.color = color;
    }
}


function setup() {
    createCanvas(canvasWidth, canvasHeight);

    for (let i = 0; i < numCircles; i++) {
        let x = Math.random() * canvasWidth;
        let y = Math.random() * canvasHeight;
        let circleColor = randomColor();
        circles.push(
            new Circle(x, y, circleSize, circleColor)
        );
    }

}

function draw() {
    background(220);

    doStep();
    velocity = (acceleration*t)%maxVelocity;

    circles.forEach((c => {
        stepCircle(c, velocity)
    }))


    

    // y = time * rate

}

function drawCircle(x, y, size, color) {
    fill(color)
    circle(x, y, size)
}

function stepCircle(circle, velocity) {
    circle.y = (circle.y + (deltaTime / 1000) * velocity) % canvasHeight;
    drawCircle(circle.x, circle.y, circle.diameter, circle.color)
}

function doStep() {
    t += deltaTime / 1000;
}


function randomColor() {
    return [Math.random()*255, Math.random()*255, Math.random()*255];
}