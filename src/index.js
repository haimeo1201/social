const express = require("express");
const app = express();
const cors = require("cors");

const routes = require("./routes/index");

const port = process.env.PORT;
const frontendPort = process.env.FRONTEND_URL;

app.use(
    cors({
        origin: [frontendPort],
        credentials: true,
    })
);

app.use(express.json());

routes(app);

app.listen(port, () => {
    console.log("listen at port " + port);
});
