exports.sendError = (error, res) => {
    if (error.code) {
        res.status(error.code).json({
            msg: "from /api/error/errorHandler.js",
            error,
        });
    } else {
        res.status(500).json({
            msg: "Server error (/api/error/errorHandler.js)",
            accepted: false,
            error,
        });
    }
};
