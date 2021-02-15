const errorResponse = require("./errorResponse");
const successResponse = require("./successResponse");

/**
 * API Helper function handling sending the server response to client
 *
 * @param object responseContents: all the information the server
 * wishes to send to the client.
 * @param res Express response object.
 * 
 */

exports.sendResponse = (responseContents, res) => {
    if (responseContents.isError)
        errorResponse.sendErrorResponse(responseContents, res);
    else successResponse.sendSuccessResponse(responseContents, res);
};
