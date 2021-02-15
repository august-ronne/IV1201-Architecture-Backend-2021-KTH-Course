/**
 * API Helper function handling sending the server success response to client
 *
 * @param object responseContents: all the information the server
 * wishes to send to the client, including the HTTP Status Code.
 * @param res Express response object.
 * @return HTTP Status Code
 * @return {object} serverMessage: contains responseContents
 * 
 */
exports.sendSuccessResponse = (responseContents, res) => {
    res.status(responseContents.code).json({
        serverMessage: responseContents,
    });
};
