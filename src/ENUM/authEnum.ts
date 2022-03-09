export enum auth {
  Validation_FAILED = "Validation failed.",
  USER_CREATED = "User created!",
  EMAIL_NOT_FOUND = "A user with this email could not be found.",
  WRONG_PASSWORD = "Wrong password!",
  JWT_SECRET_MSG = "somesupersecretsecret",
  USERNAME = "Username not found",
  TOKEN_VALIDATION = "Token Validation Failed",
}
export enum blog {
  POST_UPDATED = "Post updated!",
  UNDEFINED = "Undefined",
}

export enum Routes {
  LOGIN = "/login",
  SIGNUP = "/signup",
  BLOG = "/blog",
  POST_BLOG = "/postblog",
  GET_BLOG = "/blog/:blogId",
  EDIT_BLOG = "/blog/:blogId",
  GET_USER = "/user/:userId",
  GOOGLE = "/google",
  GOOGLE_CALLBACK = "/google/callback",
  SUCESS = "/sucess",
}

export enum google {
  GOOGLE = "google",
}

export enum status {
  status_code = 401,
  success = 200,
  serverError = 500,
}
// export default auth;
