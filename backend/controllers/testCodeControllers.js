const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const getDirecController = async (req, res) => {
    try {
        const access_token = await req.cookies.gh_token;
        const fullrepopath = await req.params.fullrepopath;
        const dir = (await req.query.path) || "";

        if (!access_token) {
            res.status(404).send({
                success: false,
                message: "token not found",
            });
        }

        const userResponse = await axios.get(
            `https://api.github.com/repos/${req.query.owner}/${fullrepopath}/contents/${dir}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        if (!userResponse) {
            res.status(404).send({
                success: false,
                message: "data not received",
            });
        }

        res.status(200).send({
            success: true,
            message: "got data successfully",
            userResponse: userResponse.data,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "some error occure in getting directory",
            error,
        });
    }
};

const reposController = async (req, res) => {
    try {
        const access_token = await req.cookies.gh_token;

        if (!access_token) {
            res.status(500).send({
                success: false,
                message: "access_token not found",
            });
        }

        const repos = await axios.get("https://api.github.com/user/repos", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (!repos) {
            res.status(404).send({
                success: false,
                message: "repos not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "data fetch successfully",
            userrepos: repos.data,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in repos contoller",
            error,
        });
    }
};

const getCodeController = async (req, res) => {
    try {
        const access_token = await req.cookies.gh_token;
        const { owner, repo, path } = await req.query;

        if (!access_token) {
            res.status(404).send({
                success: false,
                message: "token not found",
            });
        }

        const userResponse = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    Accept: "application/vnd.github.v3.raw",
                },
            }
        );

        if (!userResponse) {
            res.status(404).send({
                success: false,
                message: "data not received",
            });
        }

        res.status(200).send({
            success: true,
            message: "got data successfully",
            userResponse: userResponse.data,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "some error occure in getting directory",
            error,
        });
    }
};

const summaryController = async (req, res) => {
    try {
        const ai = new GoogleGenerativeAI (process.env.GEMINI_API_KEY);
        const body = await req.body.code;

        const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" })

        const prompt = `Summarize the code and write test code for it: ${body}`

        const result = await model.generateContent(prompt)

        const text = result.response.text()

        res.status(200).json({
            success: true,
            message: "summery of the code is here",
            summary: text,
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "error in summary",
            error,
        });
    }
};

module.exports = {
    getDirecController,
    reposController,
    getCodeController,
    summaryController,
};
