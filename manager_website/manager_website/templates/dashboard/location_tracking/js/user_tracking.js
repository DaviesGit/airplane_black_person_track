class UserTracking {
    constructor() {
        this.userArray = {};
    }
    getAvailableId() {
        var i = 0;
        while (undefined !== this.userArray[i]) i++;
        return i;
    }
    // userInfo = {//Optional
    //     userId: '', //Optional
    //     pointInfo: {
    //         rgba: [r, g, b, a],
    //         radius: r, //px;
    //         location: [x, y] // this is percentage.
    //     }
    // }
    addUser(userInfo) {
        var userId = userInfo.userId;
        if (!userId) userId = this.getAvailableId();
        this.userArray[userId] = {
            pointInfo: userInfo.pointInfo
        }
        return userId;
    }
    removeUser(userId) {
        return delete this.userArray[userId];
    }

    updateUser(userInfo) {
        if (!userInfo.userId) {
            return false;
        }
        var old_pointInfo = this.userArray[userInfo.userId].pointInfo;
        var new_pointInfo = userInfo.pointInfo;
        new_pointInfo.rgba && (old_pointInfo.rgba = new_pointInfo.rgba);
        new_pointInfo.radius && (old_pointInfo.radius = new_pointInfo.radius);
        new_pointInfo.location && (old_pointInfo.location = new_pointInfo.location);
        return true;
    }

    drawPoint(context, pointInfo) {
        if (!pointInfo)
            return false;
        context.beginPath();
        context.arc(
            pointInfo.location[0], pointInfo.location[1],
            pointInfo.radius,
            0, 2 * Math.PI);
        context.fillStyle = "rgba(" + pointInfo.rgba.join() + ")"
        context.fill();
        return true;
    }

    drawCanvas(canvas) {
        var width = canvas.width;
        var height = canvas.height;
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, width, height);
        for (var property in this.userArray) {
            var pointInfo = $.extend({}, this.userArray[property].pointInfo);
            var x = pointInfo.location[0] * width;
            var y = (1 - pointInfo.location[1]) * height;
            pointInfo.location = [x, y];
            this.drawPoint(context, pointInfo);
        }
    }
}