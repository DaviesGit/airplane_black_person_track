class LocationTracking {
    configuration() {
        this.backgroundSquare = [
            [0.08, 0.00], [0.39, 0.00], [0.70, 0.00],
            [0.08, 0.31], [0.39, 0.31], [0.70, 0.31],
            [0.08, 0.62], [0.39, 0.62], [0.70, 0.62]
        ];
        this.defaultLength = 0.3;
        this.passengers = [];
        this.backgrounds = null;
        this.passengerLocations = [];
        // passenger = {
        //     id: 341,
        //     circle: null,
        //     basicInfo: null
        // }
    }
    constructor(canvasId) {
        this.random = new Random();
        this.configuration();
        this.canvas = document.getElementById(canvasId);
        this.fabricCanvas = new fabric.Canvas(canvasId);
        this.fabricCanvas.setWidth(500);
        this.fabricCanvas.setHeight(500);
    }
    removeObjects(objects) {
        for (let o of objects)
            this.fabricCanvas.remove(o);
    }
    addObjects(objects) {
        for (let o of objects)
            this.fabricCanvas.add(o);
    }
    getObjects(locations) {
        let objects = [];
        for (let l of locations)
            objects.push(l.circle);
        return objects;
    }
    DrawBackground() {
        this.backgrounds && this.removeObjects(this.backgrounds);
        this.backgrounds = [];
        for (let square of this.backgroundSquare) {
            let rectangle = new fabric.Rect({
                left: this.canvas.width * square[0],
                top: this.canvas.height * square[1],
                width: this.canvas.width * this.defaultLength,
                height: this.canvas.height * this.defaultLength,
                fill: '#B2EFF5',
                selectable: false,
                hoverCursor: "default"
            });
            this.backgrounds.push(rectangle);
        }
        this.addObjects(this.backgrounds)
    }
    normalRandom() {
        let number = this.random.normal(0.5, 0.1);
        if (0.1 >= number || 0.9 <= number) {
            return this.normalRandom();
        }
        return number;
    }
    randomLocationByLocationId(id) {
        let point = this.backgroundSquare[id];
        return [
            (point[0] + this.normalRandom() * this.defaultLength) * this.canvas.width,
            (point[1] + this.normalRandom() * this.defaultLength) * this.canvas.height
        ]
    }
    newPassengerLocations(location, previousLocation) {
        let point = this.randomLocationByLocationId(location.area_number - 1)
        if (!previousLocation)
            return {
                id: location.epc,
                circle: new fabric.Circle({
                    radius: 8,
                    fill: "#" + ((1 << 24) * Math.random() | 0).toString(16),
                    left: point[0],
                    top: point[1],
                    selectable: false,
                    hoverCursor: "pointer"
                }),
                basicInfo: location
            }
        else
            return {
                id: location.epc,
                circle: previousLocation.circle
                    .animate("left", point[0], {
                        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas)
                    })
                    .animate("top", point[1], {
                        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas)
                    }),
                basicInfo: location
            }
    }


    updateLocation(locations) {
        this.removeObjects(this.getObjects(this.passengerLocations));
        let new_passengerLocations = [];
        for (let location of locations) {
            let previousPassengerInfo = null;
            for (let passenger of this.passengerLocations)
                if (passenger.id === location.epc) {
                    previousPassengerInfo = passenger;
                    break;
                }
            new_passengerLocations.push(this.newPassengerLocations(location, previousPassengerInfo));
        }
        this.passengerLocations = new_passengerLocations;
        this.addObjects(this.getObjects(this.passengerLocations));
    }
    updateView() {
        this.DrawBackground();
        this.fabricCanvas.on('mouse:up', function (event) {
            console.log(event);
        });
    }
}
