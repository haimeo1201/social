const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const routes = require("./routes/index");

const port = process.env.PORT;

app.use(express.json({ limit: "50mb" }));

app.use("/image", express.static("./public/image"));
app.use("/video", express.static("./public/video"));

app.use(express.static("./build"));
app.get("/post/*", function (req, res) {
    res.sendFile(path.join(__dirname, "/build/index.html"), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});
app.get("/profile/*", function (req, res) {
    res.sendFile(path.join(__dirname, "/build/index.html"), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});
app.get("/friendlist", function (req, res) {
    res.sendFile(path.join(__dirname, "/build/index.html"), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

routes(app);

app.listen(port, () => {
    console.log("listen at port " + port);
});
