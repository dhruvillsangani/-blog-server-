"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = exports.Validation = exports.status = exports.googleAuth = exports.Routes = exports.blog = exports.auth = void 0;
var auth;
(function (auth) {
    auth["Validation_FAILED"] = "Validation failed.";
    auth["USER_CREATED"] = "User created!";
    auth["EMAIL_NOT_FOUND"] = "A user with this email could not be found.";
    auth["WRONG_PASSWORD"] = "Wrong password!";
    auth["JWT_SECRET_MSG"] = "somesupersecretsecret";
    auth["USERNAME"] = "Username not found";
    auth["TOKEN_VALIDATION"] = "Token Validation Failed";
    auth["EXPIRATION_TIME"] = "1h";
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
var googleAuth;
(function (googleAuth) {
    googleAuth["GOOGLE"] = "google";
    googleAuth["SCOPE"] = "profile";
    googleAuth["ACCESS_TYPE"] = "offline";
    googleAuth["CONSENT"] = "consent";
})(googleAuth = exports.googleAuth || (exports.googleAuth = {}));
var status;
(function (status) {
    status[status["status_code"] = 401] = "status_code";
    status[status["success"] = 200] = "success";
    status[status["serverError"] = 500] = "serverError";
})(status = exports.status || (exports.status = {}));
var Validation;
(function (Validation) {
    Validation["email"] = "email";
    Validation["EMAIL_NOT_VALID"] = "Please enter a valid email.";
    Validation["EMAIL_ALREADY_EXISTS"] = "E-Mail address already exists!";
    Validation["password"] = "password";
    Validation["username"] = "username";
    Validation["USERNAME_ALREADY_EXISTS"] = "Username already exists!";
    Validation["USERNAME_CREDENTIALS"] = "username should start with lowercase or underscore and does not contain any space also special character";
    Validation["PASSWORD_IS_EMPTY"] = "Password should not be Empty";
})(Validation = exports.Validation || (exports.Validation = {}));
var Image;
(function (Image) {
    Image["JPEG_TYPE"] = "image/jpeg";
    Image["JPG_TYPE"] = "image/png";
    Image["PNG_TYPE"] = "image/jpg";
    Image["IMAGE_NAME"] = "BlogImage";
})(Image = exports.Image || (exports.Image = {}));
// export default auth;
