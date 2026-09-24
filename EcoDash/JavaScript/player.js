class Drone {

    constructor() 
    {
        this.x = 400;
        this.y = 300;
        this.width = 35;
        this.height = 25;
        this.speed = 3;
    }


    draw() 
    {
        ctx.fillStyle = "blue";
        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }


    move() 
    {
    if (keys["ArrowUp"])
    {
        this.y -= this.speed;
    }
    if (keys["ArrowDown"]) 
        {
        this.y += this.speed;
    }

    if (keys["ArrowLeft"])
    {
        this.x -= this.speed;
    }

    if (keys["ArrowRight"])
    {
        this.x += this.speed;
    }

   }

}