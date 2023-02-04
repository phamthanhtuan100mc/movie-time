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


function registerLocalVideoProtocol() {
    protocol.registerFileProtocol('local-video', (request, callback) => {
        const url = request.url.replace(/^local-video:\/\//, '')
        // Decode URL to prevent errors when loading filenames with UTF-8 chars or chars like "#"
        const decodedUrl = decodeURI(url) // Needed in case URL contains spaces
        try {
            // eslint-disable-next-line no-undef
            return callback(path.join(__static, decodedUrl))
        } catch (error) {
            console.error(
                'ERROR: registerLocalVideoProtocol: Could not get file path:',
                error
            )
        }
    })
}

module.exports = {Sleep, registerLocalVideoProtocol};