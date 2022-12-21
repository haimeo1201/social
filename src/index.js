const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const routes = require("./routes/index");
const bodyParser = require("body-parser");

const port = process.env.PORT;
const frontendURL = process.env.FRONTEND_URL;

app.use(express.json({ limit: "50mb" }));

app.use("/image", express.static("./public/image"));
app.use("/video", express.static("./public/video"));

app.use(express.static("../socii-fe/build"));
app.get("/post/*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "../../socii-fe/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});
app.get("/profile/*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "../../socii-fe/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});
app.get("/friendlist", function (req, res) {
    res.sendFile(
        path.join(__dirname, "../../socii-fe/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

app.use(
    cors({
        origin: [frontendURL],
        credentials: true,
    })
);
routes(app);

app.listen(port, () => {
    console.log("listen at port " + port);
});
