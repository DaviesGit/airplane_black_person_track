

userTracking = new UserTracking();
for (let i = 0; i < 10; ++i)
    userTracking.addUser({
        pointInfo: {
            rgba: [Math.random() * 255, Math.random() * 255, Math.random() * 255, 1],
            radius: 5,
            location: [Math.random(), Math.random()]
        }
    });
userTracking.drawCanvas($(".location_tracking>canvas")[0]);

context = $(".location_tracking>canvas")[0].getContext('2d')
context.beginPath();
context.arc(
    10, 10,
    2,
    0, 2 * Math.PI);
context.fill();



function getVelocityAngle(velocity) {
    var angle = Math.asin(velocity[1] / Math.pow(Math.pow(velocity[0], 2) + Math.pow(velocity[1], 2), 0.5));
    if (0 <= velocity[0]) {
        if (0 <= velocity[1])
            return angle;
        else
            return Math.PI * 2 + angle;
    } else {
        return Math.PI - angle;
    }
}


a = new RandomMove([0, 0], [5, 5], 1, 3);
a.getNextPoint()




fabricCanvas = new fabric.StaticCanvas("location_canvas");
r = new fabric.Circle({
    radius: 3,
    fill: "#" + ((1 << 24) * Math.random() | 0).toString(16),
    top: 10,
    left: 10,
});
fabricCanvas.add(r);
r.animate("top", "+=100", { onChange: fabricCanvas.renderAll.bind(fabricCanvas) });




locationTracking = new LocationTracking("location_canvas");
locationTracking.updateView();
locationTracking.updateLocation([{ "epc": "@12345678945", "area_number": 9, "add_data": 1552515100 }, { "epc": "@123456789", "area_number": 3, "add_data": 1552274130 }])



setInterval(()=>{locationTracking.updateLocation([{ "epc": "@12345678945ae", "area_number": (Math.random()*9|0)+1, "add_data": 1552515100 }, { "epc": "@123456789rte", "area_number": (Math.random()*9|0)+1, "add_data": 1552274130 }, { "epc": "@123456789gea", "area_number": (Math.random()*9|0)+1, "add_data": 1552274130 }, { "epc": "@123456789jngr", "area_number": (Math.random()*9|0)+1, "add_data": 1552274130 }, { "epc": "@123456789dfb", "area_number": (Math.random()*9|0)+1, "add_data": 1552274130 }, { "epc": "@123456789srts", "area_number": (Math.random()*9|0)+1, "add_data": 1552274130 }, { "epc": "@123456789hjnd", "area_number": (Math.random()*9|0)+1, "add_data": 1552274130 }, { "epc": "@123456789awsr", "area_number": (Math.random()*9|0)+1, "add_data": 1552274130 }, { "epc": "@123456789tdjh", "area_number": (Math.random()*9|0)+1, "add_data": 1552274130 }, { "epc": "@123456789xbcf", "area_number": (Math.random()*9|0)+1, "add_data": 1552274130 }, { "epc": "@123456789dety", "area_number": (Math.random()*9|0)+1, "add_data": 1552274130 }, { "epc": "@123456789tjcnb", "area_number": (Math.random()*9|0)+1, "add_data": 1552274130 }, { "epc": "@123456789fdarty", "area_number": (Math.random()*9|0)+1, "add_data": 1552274130 }, { "epc": "@123456789dhvb", "area_number": (Math.random()*9|0)+1, "add_data": 1552274130 }, { "epc": "@123456789cfg", "area_number": (Math.random()*9|0)+1, "add_data": 1552274130 }, { "epc": "@123456789atyyWRH", "area_number": (Math.random()*9|0)+1, "add_data": 1552274130 }])
},1000)

