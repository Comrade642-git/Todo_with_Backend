export const resfun = (user, res, message, statuscode, token) => {
    return res
        .status(statuscode)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.Node_ENV === "Development" ? "lax" : "none",
            secure: process.env.Node_ENV === "Development" ? false : true
        })
        .json({
            success: true,
            message: message,
            user
        });
};
