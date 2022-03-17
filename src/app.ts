import express from "express";
import bodyParser from "body-parser";
import commonRoutes from "./routes/index";
import { fetchMongoCredentials } from "./utils/constants/enum/mongoURl";
import google from "./routes/googleroutes";
import { User, mongo_credentials } from "./models/postgres";
import multer from "multer";
import { logger } from "./config/logger_config";
import { storage, fileFilter, multiFileStorage } from "./config/image_upload";
import passport from "passport";
import cookieSession from "express-session";
import { createServer } from "http";
import { Server } from "socket.io";

var app = express();

app.use("/uploads", express.static("uploads"));
app.use("/files", express.static("files"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(commonRoutes);
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));
app.use(multer({ storage: multiFileStorage }).array("multi", 5));
// set up session cookies
app.use(
  cookieSession({
    secret: "SECRET",
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(google);

fetchMongoCredentials().then(() => {
  logger.info("mongo_db connected");
});

const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:4200"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

httpServer.listen(5000, () => {
  console.log("port 5000");
});
