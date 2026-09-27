const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 600;

const keys = {};

document.addEventListener("keydown", function(event) {
    keys[event.key] = true;
    keys[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", function(event) {
    keys[event.key] = false;
    keys[event.key.toLowerCase()] = false;
});

const player = new Drone();

const trees = [
    { x: 200, y: 120 },
    { x: 300, y: 450 },
    { x: 700, y: 150 },
    { x: 800, y: 400 },
    { x: 900, y: 250 },
    { x: 600, y: 450 }
];

const obstacles = [
    new Obstacle(250, 320, 55, 30, "pothole"),
    new Obstacle(720, 320, 55, 30, "pothole"),
    new Obstacle(430, 470, 70, 25, "construction"),
    new Obstacle(780, 100, 70, 25, "construction")
];

function drawBackground() {

    ctx.fillStyle = "#6fa34a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#a8784f";
    ctx.fillRect(0, 300, canvas.width, 70);

    ctx.fillRect(100, 0, 70, canvas.height);

    ctx.fillStyle = "#3b9ddd";

    ctx.beginPath();

    ctx.ellipse(
        500,
        120,
        150,
        85,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();
}

function drawTrees() {

    for (let tree of trees) {

        ctx.fillStyle = "green";

        ctx.fillRect(
            tree.x - 6,
            tree.y,
            12,
            25
        );

        ctx.fillStyle = "brown";

        ctx.beginPath();

        ctx.arc(
            tree.x,
            tree.y - 5,
            25,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
}

function drawObstacles() {

    for (let obstacle of obstacles) {
        obstacle.draw();
    }
}

function drawDrone() {

    ctx.save();

    ctx.translate(player.x, player.y);

    ctx.fillStyle = "red";
    ctx.fillRect(-20, -10, 40, 20);

    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;

    ctx.beginPath();

    ctx.moveTo(-15, -7);
    ctx.lineTo(-28, -20);

    ctx.moveTo(15, -7);
    ctx.lineTo(28, -20);

    ctx.moveTo(-15, 7);
    ctx.lineTo(-28, 20);

    ctx.moveTo(15, 7);
    ctx.lineTo(28, 20);

    ctx.stroke();

    drawPropeller(-28, -20);
    drawPropeller(28, -20);
    drawPropeller(-28, 20);
    drawPropeller(28, 20);

    ctx.fillStyle = "black";

    ctx.beginPath();

    ctx.arc(
        0,
        10,
        5,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();
}

function drawPropeller(x, y) {

    ctx.fillStyle = "white";

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        7,
        0,
        Math.PI * 2
    );

    ctx.fill();
}

function drawHUD() {

    ctx.fillStyle = "white";
    ctx.fillRect(15, 15, 180, 55);

    ctx.fillStyle = "black";
    ctx.font = "18px Arial";

    ctx.fillText(
        "Battery: " + Math.round(player.battery) + "%",
        30,
        48
    );
}

function update() {
    player.move();
}

function draw() {

    drawBackground();
    drawTrees();
    drawObstacles();
    drawDrone();
    drawHUD();
}

function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();
