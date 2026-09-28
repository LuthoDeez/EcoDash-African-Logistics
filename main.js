
// CANVAS


const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;




// GAME VARIABLES


let gameState = "start";
let deliveries = 0;
let score = 0;
let distance = 0;
const keys = {};



// HIGH SCORE


let highScore = localStorage.getItem("ecoDashHighScore");
if (highScore === null)
{
    highScore = 0;
}
highScore = Number(highScore);



// CREATE PLAYER


const player = new Drone();



// RIVER

const river = {

    x: 350,
    y: 0,

    width: 300,
    height: 220

};



// HOSPITAL


const hospital = {

    x: 850,
    y: 60,

    width: 110,
    height: 100

};




// TREES


const trees = [

    { x: 200, y: 120 },

    { x: 300, y: 450 },

    { x: 700, y: 150 },

    { x: 800, y: 400 },

    { x: 900, y: 250 },

    { x: 600, y: 450 }

];



// OBSTACLES


const obstacles = [

    new Obstacle(
        250,
        320,
        55,
        30,
        "pothole"
    ),


    new Obstacle(
        720,
        320,
        55,
        30,
        "pothole"
    ),


    new Obstacle(
        430,
        470,
        70,
        25,
        "construction"
    ),


    new Obstacle(
        780,
        100,
        70,
        25,
        "construction"
    )

];



// MEDICAL SUPPLIES


const medicalSupplies = [

    {
        x: 200,
        y: 400,

        width: 35,
        height: 35,

        collected: false
    },


    {
        x: 500,
        y: 350,

        width: 35,
        height: 35,

        collected: false
    },


    {
        x: 850,
        y: 500,

        width: 35,
        height: 35,

        collected: false
    }

];



// KEYBOARD CONTROLS


document.addEventListener(
    "keydown",
    function(event) {

        keys[event.key] = true;

        keys[event.key.toLowerCase()] = true;

        // Start game 
        if(event.key === "Enter" && gameState === "start"){
            gameState ="playing"
        }

        // Pause / unpause game
        if (event.key.toLowerCase() === "p") {

        if (gameState === "playing") {
        gameState = "paused";
          }

        else if (gameState === "paused") {
        gameState = "playing";
          }
}


        // Restart after losing or winning

        if (
            event.key === "Enter" &&
            (
                gameState === "gameOver" ||
                gameState === "missionComplete"
            )
        ) {

            restartGame();

        }

    }
);


document.addEventListener(
    "keyup",
    function(event) {

        keys[event.key] = false;

        keys[event.key.toLowerCase()] = false;

    }
);



// RESTART GAME


function restartGame() {

    gameState = "playing";
    deliveries = 0;
    score = 0;
    distance = 0;


    // Reset player position

    player.x = 120;

    player.y = 450;


    // Reset movement

    player.velocityX = 0;

    player.velocityY = 0;


    // Reset battery

    player.battery = 100;


    // Remove explosion

    player.exploded = false;


    // Reset medical supplies

    for (let supply of medicalSupplies) {

        supply.collected = false;

    }

}



// DRAW BACKGROUND


function drawBackground() {

    // Grass

    ctx.fillStyle = "#6fa34a";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Horizontal dirt road

    ctx.fillStyle = "#a8784f";

    ctx.fillRect(
        0,
        300,
        canvas.width,
        70
    );


    // Vertical dirt road
    ctx.fillRect(
        100,
        0,
        70,
        canvas.height
    );


    

    // Pond 

ctx.fillStyle = "lightblue";

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

function drawStartScreen() {

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    ctx.font = "50px Arial";
    ctx.fillText("ECODASH", canvas.width / 2, 250);

    ctx.font = "25px Arial";
    ctx.fillText(
        "Press ENTER to Start",
        canvas.width / 2,
        310
    );

    ctx.textAlign = "left";
}


function drawPauseScreen() {

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    ctx.font = "50px Arial";
    ctx.fillText(
        "PAUSED",
        canvas.width / 2,
        canvas.height / 2
    );

    ctx.font = "20px Arial";
    ctx.fillText(
        "Press P to continue",
        canvas.width / 2,
        canvas.height / 2 + 40
    );

    ctx.textAlign = "left";
}


// DRAW HOSPITAL


function drawHospital() {

    // Hospital building

    ctx.fillStyle = "white";

    ctx.fillRect(
        hospital.x,
        hospital.y,
        hospital.width,
        hospital.height
    );


    // Black outline

    ctx.strokeStyle = "black";

    ctx.lineWidth = 2;

    ctx.strokeRect(
        hospital.x,
        hospital.y,
        hospital.width,
        hospital.height
    );


    // Door

    ctx.fillStyle = "brown";

    ctx.fillRect(
        hospital.x + 45,
        hospital.y + 65,
        25,
        35
    );


    // Windows

    ctx.fillStyle = "lightblue";


    ctx.fillRect(
        hospital.x + 15,
        hospital.y + 55,
        20,
        20
    );


    ctx.fillRect(
        hospital.x + 75,
        hospital.y + 55,
        20,
        20
    );


    // Red medical cross

    ctx.fillStyle = "red";


    ctx.fillRect(
        hospital.x + 48,
        hospital.y + 12,
        14,
        35
    );


    ctx.fillRect(
        hospital.x + 38,
        hospital.y + 22,
        35,
        14
    );


    // Hospital name

    ctx.fillStyle = "black";

    ctx.font = "14px Arial";

    ctx.textAlign = "center";


    ctx.fillText(
        "HOSPITAL",
        hospital.x + hospital.width / 2,
        hospital.y - 8
    );


    ctx.textAlign = "left";

}



// DRAW TREES


function drawTrees() {

    for (let tree of trees) {

        ctx.fillStyle = "brown";

        ctx.fillRect(
            tree.x - 6,
            tree.y,
            12,
            25
        );


        ctx.fillStyle = "green";

        ctx.beginPath();

        ctx.moveTo(
            tree.x,
            tree.y - 40
        );

        ctx.lineTo(
            tree.x - 25,
            tree.y + 5
        );

        ctx.lineTo(
            tree.x + 25,
            tree.y + 5
        );

        ctx.closePath();

        ctx.fill();
    }
}


// DRAW OBSTACLES


function drawObstacles() {

    for (let obstacle of obstacles) {

        obstacle.draw();

    }

}



// DRAW MEDICAL SUPPLIES


function drawMedicalSupplies() {

    for (let supply of medicalSupplies) {


        if (supply.collected === false) {


            // Supply box

            ctx.fillStyle = "#f4e6c1";


            ctx.fillRect(
                supply.x,
                supply.y,
                supply.width,
                supply.height
            );


            // Red medical cross

            ctx.fillStyle = "red";


            ctx.fillRect(
                supply.x + 14,
                supply.y + 6,
                7,
                23
            );


            ctx.fillRect(
                supply.x + 6,
                supply.y + 14,
                23,
                7
            );


            // Box border

            ctx.strokeStyle = "#654321";


            ctx.strokeRect(
                supply.x,
                supply.y,
                supply.width,
                supply.height
            );

        }

    }

}



// DRAW DRONE


function drawDrone() {


    // Explosion

    if (player.exploded === true) {


        ctx.fillStyle = "orange";


        ctx.beginPath();


        ctx.arc(
            player.x,
            player.y,
            35,
            0,
            Math.PI * 2
        );


        ctx.fill();


        ctx.fillStyle = "red";


        ctx.beginPath();


        ctx.arc(
            player.x,
            player.y,
            20,
            0,
            Math.PI * 2
        );


        ctx.fill();


        return;

    }


    ctx.save();


    ctx.translate(
        player.x,
        player.y
    );


    // Drone body

    ctx.fillStyle = "red";


    ctx.fillRect(
        -20,
        -10,
        40,
        20
    );


    // Drone arms

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


    // Propellers

    drawPropeller(-28, -20);

    drawPropeller(28, -20);

    drawPropeller(-28, 20);

    drawPropeller(28, 20);


    // Camera

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



// DRAW PROPELLER


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



// DRAW AFRICAN PATTERN BORDER


function drawAfricanBorder() {

    const size = 25;


    // TOP AND BOTTOM

    for (
        let x = 0;
        x < canvas.width;
        x += size
    ) {


        if ((x / size) % 2 === 0) {

            ctx.fillStyle = "#f4b942";

        } else {

            ctx.fillStyle = "#8b2e2e";

        }


        // Top triangle

        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(
            x + size,
            0
        );

        ctx.lineTo(
            x + size / 2,
            size
        );

        ctx.fill();


        // Bottom triangle

        ctx.beginPath();

        ctx.moveTo(
            x,
            canvas.height
        );


        ctx.lineTo(
            x + size,
            canvas.height
        );


        ctx.lineTo(
            x + size / 2,
            canvas.height - size
        );


        ctx.fill();

    }


    // LEFT AND RIGHT

    for (
        let y = 0;
        y < canvas.height;
        y += size
    ) {


        if ((y / size) % 2 === 0) {

            ctx.fillStyle = "#f4b942";

        } else {

            ctx.fillStyle = "#8b2e2e";

        }


        // Left triangle

        ctx.beginPath();


        ctx.moveTo(
            0,
            y
        );


        ctx.lineTo(
            0,
            y + size
        );


        ctx.lineTo(
            size,
            y + size / 2
        );


        ctx.fill();


        // Right triangle

        ctx.beginPath();


        ctx.moveTo(
            canvas.width,
            y
        );


        ctx.lineTo(
            canvas.width,
            y + size
        );


        ctx.lineTo(
            canvas.width - size,
            y + size / 2
        );


        ctx.fill();

    }

}



// CHECK COLLISIONS


function checkCollisions() {


    
    // RIVER
    

    if (collision(river)) {

        crash();

        return;

    }


    
    // TREES
    

    for (let tree of trees) {


        let treeBox = {

            x: tree.x - 20,

            y: tree.y - 30,

            width: 40,

            height: 55

        };


        if (collision(treeBox)) {

            crash();

            return;

        }

    }


    // OBSTACLES
  

    for (let obstacle of obstacles) {


        // Potholes are only visual because
        // the drone is flying over the ground

        if (obstacle.type === "construction") {


            if (collision(obstacle)) {

                crash();

                return;

            }

        }

    }


   
    // MEDICAL SUPPLIES
    

    for (let supply of medicalSupplies) {


        if (
            supply.collected === false &&
            collision(supply)
        ) {


            // Remove the package

            supply.collected = true;


            // Increase deliveries

            deliveries++;


            // Add score

            score += 100;

        }

    }

}


// CHECK HOSPITAL DELIVERY


function checkHospital() {

    // Check if all 3 supplies were collected

    if (deliveries === medicalSupplies.length) {

        // Check if drone is touching the hospital

        if (collision(hospital)) {

            gameState = "missionComplete";

            // Stop the drone

            player.velocityX = 0;
            player.velocityY = 0;


            // Save high score

            if (score > highScore) {

                highScore = score;

                localStorage.setItem(
                    "ecoDashHighScore",
                    highScore
                );

            }

        }

    }

}



// CRASH


function crash() {

    player.exploded = true;


    player.velocityX = 0;

    player.velocityY = 0;


    gameState = "gameOver";


    // Save high score

    if (score > highScore) {

        highScore = score;


        localStorage.setItem(
            "ecoDashHighScore",
            highScore
        );

    }

}



// DRAW HUD


function drawHUD() {

    // HUD background

    ctx.fillStyle = "white";


    ctx.fillRect(
        35,
        35,
        140,
        130
    );


    ctx.fillStyle = "black";

    ctx.font = "18px Arial";

    ctx.textAlign = "left";


    // Battery

    ctx.fillText(
        "Battery: " +
        Math.round(player.battery) +
        "%",
        50,
        65
    );


    // Supplies

    ctx.fillText(
        "Supplies: " +
        deliveries +
        " / " +
        medicalSupplies.length,
        50,
        90
    );


    // Score

    ctx.fillText(
        "Score: " + score,
        50,
        115
    );


    // Distance

    ctx.fillText(
        "Distance: " +
        Math.round(distance),
        50,
        140
    );

}



// GAME OVER SCREEN


function drawGameOver() {

    ctx.fillStyle =
        "rgba(0, 0, 0, 0.7)";


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.fillStyle = "white";

    ctx.textAlign = "center";


    ctx.font = "bold 50px Arial";


    ctx.fillText(
        "GAME OVER",
        canvas.width / 2,
        canvas.height / 2 - 40
    );


    ctx.font = "24px Arial";


    ctx.fillText(
        "Medical supplies collected: " +
        deliveries +
        " / " +
        medicalSupplies.length,
        canvas.width / 2,
        canvas.height / 2 + 10
    );


    ctx.fillText(
        "Score: " + score,
        canvas.width / 2,
        canvas.height / 2 + 50
    );


    ctx.fillText(
        "High Score: " + highScore,
        canvas.width / 2,
        canvas.height / 2 + 90
    );


    ctx.fillText(
        "Press ENTER to restart",
        canvas.width / 2,
        canvas.height / 2 + 130
    );


    ctx.textAlign = "left";

}



// MISSION COMPLETED SCREEN


function drawMissionComplete() {

    ctx.fillStyle =
        "rgba(0, 0, 0, 0.75)";


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.fillStyle = "gold";

    ctx.textAlign = "center";


    ctx.font = "bold 50px Arial";


    ctx.fillText(
        "MISSION COMPLETED!",
        canvas.width / 2,
        canvas.height / 2 - 60
    );


    ctx.font = "24px Arial";


    ctx.fillText(
        "All medical supplies delivered to the hospital!",
        canvas.width / 2,
        canvas.height / 2
    );


    ctx.fillText(
        "Supplies Delivered: " +
        deliveries +
        " / " +
        medicalSupplies.length,
        canvas.width / 2,
        canvas.height / 2 + 40
    );


    ctx.fillText(
        "Score: " + score,
        canvas.width / 2,
        canvas.height / 2 + 80
    );


    ctx.fillText(
        "Press ENTER to play again",
        canvas.width / 2,
        canvas.height / 2 + 120
    );


    ctx.textAlign = "left";

}



// UPDATE GAME


function update() {


    if (gameState === "playing") {


        // Move player

        player.move();


        // Track distance

        distance +=
            Math.abs(player.velocityX) +
            Math.abs(player.velocityY);


        // Check dangerous objects
        // and medical supplies

        checkCollisions();


        // Only check hospital if
        // player did not crash

        if (gameState === "playing") {

            checkHospital();

        }


        // Check battery

        if (
            player.battery <= 0 &&
            gameState === "playing"
        ) {

            player.battery = 0;

            crash();

        }

    }

}



// DRAW GAME


function draw() {

    // Background

    drawBackground();


    // Hospital

    drawHospital();


    // Environment

    drawTrees();

    drawObstacles();


    // Packages

    drawMedicalSupplies();


    // Player

    drawDrone();


    

    drawAfricanBorder();


    // Game information

    drawHUD();


    // Game over screen

    if (gameState === "gameOver") {

        drawGameOver();

    }


    // Winner screen

    if (gameState === "missionComplete") {

        drawMissionComplete();

    }

    if (gameState === "start") {
    drawStartScreen();
}


if (gameState === "paused") {
    drawPauseScreen();
}

}



// GAME LOOP


function gameLoop() {

    update();

    draw();


    requestAnimationFrame(
        gameLoop
    );

}



// START GAME
 

gameLoop();