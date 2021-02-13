/**
 * Error handling function. If no error code attached, then sends a 500 status in the response.
 * 
 * 
 * @param error Error received.
 * @param res Response object.
 */

exports.sendError = (error, res) => {
    if (error.code) {
        res.status(error.code).json({
            serverMessage: error,
        });
    } else {
        res.status(500).json({
            serverMessage: {
                isError: true,
                accepted: false,
                msgBody: "Error when querying database",
                code: 500,
            },
        });
    }
};
