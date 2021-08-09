const express = require("express");
const config = require("config");
const getGitRouter = require("./routes/getGit.routes");
const corsMiddleware = require("./middleware/cors.middleware");

const app = express();
const PORT = process.env.PORT;

app.use(corsMiddleware);
app.use(express.json());
app.use("/api", getGitRouter);

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log('serverStart')
        })
    } catch (e) {

    }
}

start()
