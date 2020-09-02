

idMap = [
    [0.0, 0, 0.3, 0.3, "rgb(153,217,234)"],
    [0.33, 0, 0.3, 0.3, "rgb(153,217,234)"],
    [0.66, 0, 0.3, 0.3, "rgb(153,217,234)"],
    [0.0, 0.33, 0.3, 0.3, "rgb(153,217,234)"],
    [0.33, 0.33, 0.3, 0.3, "rgb(153,217,234)"],
    [0.66, 0.33, 0.3, 0.3, "rgb(153,217,234)"],
    [0.0, 0.66, 0.3, 0.3, "rgb(153,217,234)"],
    [0.33, 0.66, 0.3, 0.3, "rgb(153,217,234)"],
    [0.66, 0.66, 0.3, 0.3, "rgb(153,217,234)"]
]

function showLocation(canvas, locationInfos) {
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    context = canvas.getContext('2d');
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var locationInfo of locationInfos) {
        context.fillStyle = locationInfo[4];
        context.fillRect(locationInfo[0] * canvasWidth, locationInfo[1] * canvasHeight, locationInfo[2] * canvasWidth, locationInfo[3] * canvasHeight);
    }
}

function showLocationById(id) {
    locationInfos = $.extend(true, [], idMap);
    locationInfos[id][4] = "rgb(255,0,0)";
    canvas = $('.location_tracking>canvas')[0];
    locationInfo = idMap[id];
    showLocation(canvas, locationInfos);
}