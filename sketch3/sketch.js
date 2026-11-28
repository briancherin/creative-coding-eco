
const canvasWidth = 800;
const canvasHeight = 600;
const circleSize = 50;

class Circle {
    constructor(x, y, diameter, color) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.color = color;
    }
}

// keyframes must be in order by increasing t
// t is in seconds
const keyframes = [
    {
        t: 1,
        position: {
            x: canvasWidth/2,
            y: 50,
        }
    },
    {
        t: 3,
        position: {
            x: canvasWidth/2, 
            y: canvasHeight,
        }
    },
    {
        t: 5,
        position: {
            x: canvasWidth,
            y: canvasHeight,
        }
    },
    {
        t: 6,
        position: {
            x: 0, 
            y: 0,
        }
    }
];
let circleColor;
let currT = 0;
let currKeyframe = 0; // idx of first keyframe in the pair that's being interpolated 

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    circleColor = randomColor();
}

function draw() {
console.log(currKeyframe)
    background(220);

    let k1;
    let k2; 

    console.log("currKeyframe=" + currKeyframe)
    console.log("currT = " + currT)

    // before the first frame
    if (currKeyframe == 0 && currT <= keyframes[0].t) {
        k1 = keyframes[currKeyframe]
        k2 = keyframes[currKeyframe]
    }
    // after the last frame
    else if (currKeyframe == keyframes.length - 1 && currT > keyframes[currKeyframe].t) {
        k1 = keyframes[currKeyframe]
        k2 = keyframes[currKeyframe]
    }
    // between two frames
    else {
        // move onto the next kf if we are past this pair's limit (k2.t)
        if (currT >= keyframes[currKeyframe + 1].t) {
            currKeyframe++;
            return; // move to next iteration
        }
        // normal case
        k1 = keyframes[currKeyframe]
        k2 = keyframes[currKeyframe + 1]
    }

    drawFromKeyframes(currT, k1, k2);

    currT += deltaTime / 1000
}

function drawFromKeyframes(currT, k1, k2) {
    let currX;
    let currY;
    console.log(k1, k2)

    if (k2.t == k1.t) {
        currX = k1.position.x;
        currY = k2.position.y;
    } else {
        // how far between k1.t and k2.t is currT
        currX = k1.position.x + (k2.position.x - k1.position.x)*((currT - k1.t) / (k2.t - k1.t));
        currY = k1.position.y + (k2.position.y - k1.position.y)*((currT - k1.t) / (k2.t - k1.t));
    }

    drawCircle(currX, currY, circleSize, circleColor)
}

function drawCircle(x, y, size, color) {
    fill(color)
    circle(x, y, size)
}

function randomColor() {
    return [Math.random()*255, Math.random()*255, Math.random()*255];
}