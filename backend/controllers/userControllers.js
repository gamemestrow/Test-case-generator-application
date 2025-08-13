const axios = require("axios");

const loginController = async (req, res) => {
    const redirect_uri = "http://localhost:3000/api/user/callback";
    const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;

    const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=read:user`;
    res.redirect(githubAuthURL);
};

const callbackContorller = async (req, res) => {
    const code = req.query.code;
    try {
        const tokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            {
                headers: { Accept: "application/json" },
            }
        );

        const access_token = tokenResponse.data.access_token;

        if (!access_token) {
            res.status(404).send({
                success: false,
                message: "cookie not created",
            });
        }

        res.cookie("gh_token", access_token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        res.redirect("http://localhost:5173");
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: error,
        });
    }
};

const profileController = async (req, res) => {
    try {
        const token = await req.cookies.gh_token;

        if (!token) {
            res.status(500).send({
                success: false,
                message: "token not found",
            });
        }

        const userData = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        res.status(200).send({
            success: true,
            message: "got user data successfully",
            userData: userData.data,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in profile Controller",
            error,
        });
    }
};

module.exports = {
    loginController,
    callbackContorller,
    profileController,
};
