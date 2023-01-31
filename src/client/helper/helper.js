// helper.js

/**
 * 
 * @param {*} seconds 
 */
function Sleep(seconds) {
    return new Promise(async (resolve) => {
        setTimeout(resolve, seconds * 1000);
    });
}

module.exports = {Sleep};