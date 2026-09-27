class Drone {

    constructor(){

        this.x = 120;
        this.y = 450;

        this.width = 44;
        this.height = 30;

        // Physics
        this.velocityX = 0;
        this.velocityY = 0;

        this.acceleration = 0.2;

        this.angle = 0;

        // Battery
        this.battery = 100;

        // Crash
        this.exploded = false;

    }


    move()
    {

        // Drone cannot move if it crashed or if battery is at zeroo 
        

        if (this.exploded || this.battery <= 0) 
            {
            return;

        }


        // UP

        if (keys["ArrowUp"] || keys["w"]) 
            {
            this.angle = -Math.PI / 2;
            this.velocityX +=
                Math.cos(this.angle) * this.acceleration;
            this.velocityY +=
                Math.sin(this.angle) * this.acceleration;

        }


        // DOWN

        if (keys["ArrowDown"] || keys["s"]) 
            {
            this.angle = Math.PI / 2;
            this.velocityX +=
                Math.cos(this.angle) * this.acceleration;
            this.velocityY +=
                Math.sin(this.angle) * this.acceleration;

        }


        // LEFT

        if (keys["ArrowLeft"] || keys["a"]) 
            {
            this.angle = Math.PI;
            this.velocityX +=
                Math.cos(this.angle) * this.acceleration;
            this.velocityY +=
                Math.sin(this.angle) * this.acceleration;

        }


        // RIGHT

        if (keys["ArrowRight"] || keys["d"]) 
            {
            this.angle = 0;
            this.velocityX +=
                Math.cos(this.angle) * this.acceleration;
            this.velocityY +=
                Math.sin(this.angle) * this.acceleration;

        }


        // Move drone

        this.x += this.velocityX;
        this.y += this.velocityY;

        this.velocityX *= 0.95;
        this.velocityY *= 0.95;

        this.battery -= 0.02;


        if (this.battery < 0) 
            {
            this.battery = 0;
        }


        // Keep drone inside canvas

        if (this.x < 30)
             {
            this.x = 30;
            this.velocityX = 0;

        }


        if (this.x > canvas.width - 30)
            {
            this.x = canvas.width - 30;
            this.velocityX = 0;

        }


        if (this.y < 30) 
            {
            this.y = 30;
            this.velocityY = 0;

        }


        if (this.y > canvas.height - 30) 
            {
            this.y = canvas.height - 30;
            this.velocityY = 0;

        }

    }

}
