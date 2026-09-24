const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const player = new Drone();


const keys = {};
document.addEventListener("keydown", function(event){
keys[event.key] = true;
});

document.addEventListener("keyup", function(event){
keys[event.key] = false;
});














function gameLoop() 
{
    //this clears th canvas
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


//green background
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Draws the player
    player.move();
    player.draw();
    requestAnimationFrame(gameLoop);

    
}
gameLoop();

