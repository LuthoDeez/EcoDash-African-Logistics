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

       
        

        if (this.exploded || this.battery <= 0) 
            {
            return;

        }


        

        if (keys["ArrowUp"] || keys["w"]) 
            {
            this.angle = -Math.PI / 2;
            this.velocityX +=
                Math.cos(this.angle) * this.acceleration;
            this.velocityY +=
                Math.sin(this.angle) * this.acceleration;

        }


     

        if (keys["ArrowDown"] || keys["s"]) 
            {
            this.angle = Math.PI / 2;
            this.velocityX +=
                Math.cos(this.angle) * this.acceleration;
            this.velocityY +=
                Math.sin(this.angle) * this.acceleration;

        }


       

        if (keys["ArrowLeft"] || keys["a"]) 
            {
            this.angle = Math.PI;
            this.velocityX +=
                Math.cos(this.angle) * this.acceleration;
            this.velocityY +=
                Math.sin(this.angle) * this.acceleration;

        }


       

        if (keys["ArrowRight"] || keys["d"]) 
            {
            this.angle = 0;
            this.velocityX +=
                Math.cos(this.angle) * this.acceleration;
            this.velocityY +=
                Math.sin(this.angle) * this.acceleration;

        }




        this.x += this.velocityX;
        this.y += this.velocityY;

        this.velocityX *= 0.95;
        this.velocityY *= 0.95;

        this.battery -= 0.02;


        if (this.battery < 0) 
            {
            this.battery = 0;
        }


       
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