
class RandomMove {
    constructor(point, velocity, speedLimit, anglePower, speedPower, bounds) {
        this.point = point;
        this.velocity = velocity;
        this.speedLimit = speedLimit;
        this.anglePower = anglePower;
        this.speedPower = speedPower;
        this.bounds = bounds;
    }
    getAbsoluteSpeed() {
        return Math.pow(Math.pow(this.velocity[0], 2) + Math.pow(this.velocity[1], 2), 0.5);
    }
    getVelocityAngle() {
        return this.getVectorAngle(this.velocity);
    }
    getVectorAngle(vector) {
        var sin = vector[1] / Math.pow(Math.pow(vector[0], 2) + Math.pow(vector[1], 2), 0.5);
        var angle = Math.asin(sin);
        if (0 <= vector[0]) {
            if (0 <= vector[1])
                return angle;
            else
                return Math.PI * 2 + angle;
        } else {
            return Math.PI - angle;
        }
    }
    getVectorsAngle(vector1, vector2) {
        var angle1 = this.getVectorAngle(vector1);
        var angle2 = this.getVectorAngle(vector2);
        var angle = angle2 - angle1;
        while (0 > angle) angle += 2 * Math.PI;
        return angle;
    }
    isInBounceRight(bound, point) {
        var vector1 = [bound[1][0] - bound[0][0], bound[1][1] - bound[0][1]];
        var vector2 = [point[0] - bound[0][0], point[1] - bound[0][1]];
        var angle = this.getVectorsAngle(vector1, vector2);
        return angle > Math.PI;
    }
    isBounceBothSide(bound, line) {
        if (this.isInBounceRight(bound, line[0]))
            return !this.isInBounceRight(bound, line[1]);
        else
            return this.isInBounceRight(bound, line[1]);
    }
    isExceedBounce(bound, movement) {
        if (!this.isBounceBothSide(bound, movement))
            return false;
        return this.isBounceBothSide(movement, bound);
        // var boundVector = [bound[1][0] - bound[0][0], bound[1][1] - bound[0][1]];
        // var movementVector = [movement[1][0] - movement[0][0], movement[1][1] - movement[0][1]];
        // var angle = this.getVectorsAngle(boundVector, movementVector);
        // return 0 < angle && Math.PI > angle;
    }
    bounceVelocity(bound, velocity) {
        var vector = [bound[1][0] - bound[0][0], bound[1][1] - bound[0][1]];
        var speed = Math.pow(Math.pow(velocity[0], 2) + Math.pow(velocity[1], 2), 0.5);
        var angle = this.getVectorsAngle(vector, velocity);
        angle = Math.PI * 2 - angle;
        angle += this.getVectorAngle(vector);
        return [
            speed * Math.cos(angle),
            speed * Math.sin(angle)
        ];
    }
    getNextVelocity() {
        var absoluteSpeed = this.getAbsoluteSpeed();
        if (absoluteSpeed > this.speedLimit)
            absoluteSpeed = this.speedLimit;
        var angle = this.getVelocityAngle();
        angle += Math.pow((Math.random() * 2 - 1), 5) * Math.PI / 2 * this.anglePower;
        absoluteSpeed += (Math.random() * 2 - 1) * this.speedPower;
        this.velocity = [
            absoluteSpeed * Math.cos(angle),
            absoluteSpeed * Math.sin(angle)
        ];
        return this.velocity;
    }

    getNextPoint() {
        var currentPoint = this.point;
        var velocity = this.getNextVelocity();
        var nextPoint = [
            currentPoint[0] + velocity[0],
            currentPoint[1] + velocity[1],
        ];
        if (this.bounds) {
            var exceedBound = null;
            for (var bound of bounds) {
                if (this.isExceedBounce(bound, [currentPoint, nextPoint])) {
                    exceedBound = bound;
                    break;
                }
            }
            if (exceedBound) {
                this.velocity = this.bounceVelocity(exceedBound, this.velocity);
                return this.getNextPoint();
            }
        }
        return this.point = nextPoint;
    }
}






