class Obstacle {

    constructor(x, y, width, height, type) {

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.type = type;

    }


    draw() {

        //POTHOLEEEEEEEEEEEEEE

        if (this.type === "pothole") {

            ctx.fillStyle = "#333333";

            ctx.beginPath();

            ctx.ellipse(
                this.x + this.width / 2,
                this.y + this.height / 2,
                this.width / 2,
                this.height / 2,
                0,
                0,
                Math.PI * 2
            );

            ctx.fill();

        }


        
        // BARRIERS YELLOW AND WHITE 

        if (this.type === "construction") {

            ctx.fillStyle = "orange";

            ctx.fillRect(
                this.x,
                this.y,
                this.width,
                this.height
            );


            // White stripes

            ctx.fillStyle = "white";

            ctx.fillRect(
                this.x + 10,
                this.y,
                10,
                this.height
            );


            ctx.fillRect(
                this.x + 40,
                this.y,
                10,
                this.height
            );

        }

    }

}