function getNow() {
    return parseInt(Date.now() / 1000);
};
// console.log(parseInt(Date.now() / 1000))

module.exports = {
    getNow: getNow
};