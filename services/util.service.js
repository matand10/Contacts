module.exports = {
    getFirstLetterUppercase
}


function getFirstLetterUppercase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}