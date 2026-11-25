let circleStartSize = 1;
let maxCircleSize = 100;

let maxGrowthRate = 2;

let numCircles = 10

let circles = [];

let canvasWidth = 800;
let canvasHeight = 600;

class Circle {
    constructor(x, y, diameter, growthRate, maxSize) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.growthRate = growthRate;
        this.maxSize = maxSize;
    }
}


function setup() {
    createCanvas(canvasWidth, canvasHeight);

    for (let i = 0; i < numCircles; i++) {
        let x = Math.random() * canvasWidth;
        let y = Math.random() * canvasHeight;
        let growthRate = Math.random() * maxGrowthRate;
        let maxSize = Math.random() * maxCircleSize;
        let size = circleStartSize;
        circles.push(
            new Circle(x, y, size, growthRate, maxCircleSize)
        );
    }

}

function draw() {
    background(220);

    circles.forEach((c => {
        circle(c.x, c.y, c.diameter)
        c.diameter = (c.diameter + c.growthRate);

        if (c.diameter >= c.maxSize) {
            let x = Math.random() * canvasWidth; 
           let y = Math.random() * canvasHeight;
           c.x = x;
           c.y = y;
           c.diameter=circleStartSize;
        }
        

    }));

    // circle(200, 200, circleSize);
    // circle(400, 200, circleSize);
    // circle(400, 600, circleSize);
    // circleSize = (++circleSize % 100)

}
