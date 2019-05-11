module.exports = (x, y, callback) => {

    if (x <=0 || y <= 0) {
        setTimeout(() => callback(null, new Error("Rectangle dimensions should be greater than zero l = " + x + " b = " + y)), 0);
    } else {
        setTimeout(() => callback({
            perimeter : () => 2 * (x + y),
            area : () => (x * y)
        }, null), 10000);
    }
}