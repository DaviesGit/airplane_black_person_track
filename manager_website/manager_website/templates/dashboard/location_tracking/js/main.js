userTracking = new UserTracking();
locationTracking = null
var bounds = [
    [[0 / 9982, 0 / 7449], [0 / 9982, 2790 / 7449]],
    [[0 / 9982, 2790 / 7449], [1862 / 9982, 2790 / 7449]],
    [[1862 / 9982, 2790 / 7449], [1862 / 9982, 7449 / 7449]],
    [[1862 / 9982, 7449 / 7449], [5440 / 9982, 7449 / 7449]],
    [[5440 / 9982, 7449 / 7449], [5440 / 9982, 5200 / 7449]],
    [[5440 / 9982, 5200 / 7449], [6320 / 9982, 5200 / 7449]],
    [[6320 / 9982, 5200 / 7449], [6320 / 9982, 7449 / 7449]],
    [[6320 / 9982, 7449 / 7449], [9000 / 9982, 7449 / 7449]],
    [[9000 / 9982, 7449 / 7449], [9000 / 9982, 7000 / 7449]],
    [[9000 / 9982, 7000 / 7449], [9900 / 9982, 7000 / 7449]],
    [[9900 / 9982, 7000 / 7449], [9900 / 9982, 4740 / 7449]],
    [[9900 / 9982, 4740 / 7449], [7570 / 9982, 4740 / 7449]],
    [[7570 / 9982, 4740 / 7449], [7570 / 9982, 2780 / 7449]],
    [[7570 / 9982, 2780 / 7449], [8100 / 9982, 2780 / 7449]],
    [[8100 / 9982, 2780 / 7449], [8100 / 9982, 0 / 7449]],
    [[8100 / 9982, 0 / 7449], [0 / 9982, 0 / 7449]]
];

function trail_canvas_size() {
    var canvas = $('.location_tracking>canvas');
    canvas.css('width', "500px");
    canvas.css('height', "500px");
    requestAnimationFrame(function () {
        locationTracking.updateView();
    });
}

var users = {};
function emulateUserMove(number, interval) {
    for (var i = 0; i < number; ++i) {
        var id = userTracking.addUser({
            pointInfo: {
                rgba: [Math.random() * 255, Math.random() * 255, Math.random() * 255, 1],
                radius: 3 + Math.random() * 1,
                // location: [Math.random(), Math.random()]
            }
        });
        var randomMove = new RandomMove([Math.random() * 0.1, Math.random() * 0.1], [Math.random() / 500, Math.random() / 500], 1 / 100, 0.2, Math.random() / 5000, bounds);
        users[id] = randomMove;
    }
    function moveLoop() {
        for (var property in users) {
            var randomMove = users[property];
            var point = randomMove.getNextPoint();
            userInfo = {
                userId: property,
                pointInfo: {
                    location: point
                }
            }
            userTracking.updateUser(userInfo);
        }
        requestAnimationFrame(function () {
            userTracking.drawCanvas($('.location_tracking>canvas')[0]);
        });
        setTimeout(moveLoop, interval);
    }
    moveLoop();
}

function updateLocationLoop() {
    $.ajax({
        url: "/get_area/",
        success: function (response) {
            locationTracking.updateLocation(response.point);
            console.log(response);
            setTimeout(updateLocationLoop, 1000);
        }
    });
}


$(function () {
    // locationTracking = new LocationTracking("location_canvas");
    // locationTracking.updateView();
    $(window).resize(trail_canvas_size);
    trail_canvas_size();
    emulateUserMove(20, 100);
    setTimeout(function(){showLocationById(4);},100);
    // locationTracking = new LocationTracking("location_canvas");
    // locationTracking.updateView();
    // updateLocationLoop();
});