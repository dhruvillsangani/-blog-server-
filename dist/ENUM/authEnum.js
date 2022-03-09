"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = exports.google = exports.Routes = exports.blog = exports.auth = void 0;
var auth;
(function (auth) {
    auth["Validation_FAILED"] = "Validation failed.";
    auth["USER_CREATED"] = "User created!";
    auth["EMAIL_NOT_FOUND"] = "A user with this email could not be found.";
    auth["WRONG_PASSWORD"] = "Wrong password!";
    auth["JWT_SECRET_MSG"] = "somesupersecretsecret";
    auth["USERNAME"] = "Username not found";
    auth["TOKEN_VALIDATION"] = "Token Validation Failed";
})(auth = exports.auth || (exports.auth = {}));
var blog;
(function (blog) {
    blog["POST_UPDATED"] = "Post updated!";
    blog["UNDEFINED"] = "Undefined";
})(blog = exports.blog || (exports.blog = {}));
var Routes;
(function (Routes) {
    Routes["LOGIN"] = "/login";
    Routes["SIGNUP"] = "/signup";
    Routes["BLOG"] = "/blog";
    Routes["POST_BLOG"] = "/postblog";
    Routes["GET_BLOG"] = "/blog/:blogId";
    Routes["EDIT_BLOG"] = "/blog/:blogId";
    Routes["GET_USER"] = "/user/:userId";
    Routes["GOOGLE"] = "/google";
    Routes["GOOGLE_CALLBACK"] = "/google/callback";
    Routes["SUCESS"] = "/sucess";
})(Routes = exports.Routes || (exports.Routes = {}));
var google;
(function (google) {
    google["GOOGLE"] = "google";
})(google = exports.google || (exports.google = {}));
var status;
(function (status) {
    status[status["status_code"] = 401] = "status_code";
    status[status["success"] = 200] = "success";
    status[status["serverError"] = 500] = "serverError";
})(status = exports.status || (exports.status = {}));
// export default auth;
