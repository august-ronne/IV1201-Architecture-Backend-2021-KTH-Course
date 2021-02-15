/**
 * API Helper function handling sending the server error response to client
 *
 * @param object responseContents: all the information the server
 * wishes to send to the client, including the HTTP Status Code.
 * @param res Express response object.
 * @return HTTP Status Code
 * @return {object} serverMessage: contains responseContents
 * 
 */
exports.sendErrorResponse = (responseContents, res) => {
    if (responseContents.code) {
        res.status(responseContents.code).json({
            serverMessage: responseContents,
        });
    } else {
        res.status(500).json({
            serverMessage: {
                isError: true,
                msgBody:
                    "Something went wrong when communicating with the database",
                code: 500,
            },
        });
    }
};
