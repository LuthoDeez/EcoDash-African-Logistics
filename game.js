function collision(object) {

    let droneLeft = player.x - player.width / 2;

    let droneRight =
        player.x + player.width / 2;


    let droneTop =
        player.y - player.height / 2;

    let droneBottom =
        player.y + player.height / 2;


    let objectLeft = object.x;

    let objectRight =
        object.x + object.width;


    let objectTop = object.y;

    let objectBottom =
        object.y + object.height;


    if (
        droneLeft < objectRight &&
        droneRight > objectLeft &&
        droneTop < objectBottom &&
        droneBottom > objectTop
    ) {

        return true;

    }


    return false;

}