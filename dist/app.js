"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: change to import instead of require
// create index.ts inside routes folder and put all the routes from app.ts to that folder
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/index"));
const mongoURl_1 = __importDefault(require("./utils/constants/enum/mongoURl"));
const googleroutes_1 = __importDefault(require("./routes/googleroutes"));
const multer_1 = __importDefault(require("multer"));
const logger_config_1 = require("./config/logger_config");
const image_upload_1 = require("./config/image_upload");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
var app = (0, express_1.default)();
app.use("/uploads", express_1.default.static("uploads"));
app.use("/files", express_1.default.static("files"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(index_1.default);
app.use((0, multer_1.default)({ storage: image_upload_1.storage, fileFilter: image_upload_1.fileFilter }).single("image"));
app.use((0, multer_1.default)({ storage: image_upload_1.multiFileStorage }).array("multi", 5));
// set up session cookies
app.use((0, express_session_1.default)({
    secret: "SECRET",
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(googleroutes_1.default);
mongoose_1.default.connect(mongoURl_1.default.MONGO_URL).then(() => {
    logger_config_1.logger.info(mongoURl_1.default.connected);
    app.listen(5000);
});
