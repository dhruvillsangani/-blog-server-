export enum auth {
  Validation_FAILED = "Validation failed.",
  USER_CREATED = "User created!",
  EMAIL_NOT_FOUND = "A user with this email could not be found.",
  WRONG_PASSWORD = "Wrong password!",
  JWT_SECRET_MSG = "somesupersecretsecret",
  USERNAME = "Username not found",
  TOKEN_VALIDATION = "Token Validation Failed",
  EXPIRATION_TIME = "1h",
}
export enum blog {
  POST_UPDATED = "Post updated!",
  UNDEFINED = "Undefined",
  IMAGE_NOT_FOUND = "Image is empty",
  NOTFOUND = "Not Found",
  IMAGE_DELETED_SUCCESSFULLY = "Deleted Successfully",
  BLOG_NOT_FOUND = "The blog you are trying to delete is not found!",
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
  DELETE_BLOG = "/delete/blog/:blogId",
}

export enum googleAuth {
  GOOGLE = "google",
  SCOPE = "profile",
  ACCESS_TYPE = "offline",
  CONSENT = "consent",
}

export enum status {
  VALIDATION_ERROR = 401,
  success = 200,
  serverError = 500,
}

export enum Validation {
  email = "email",
  EMAIL_NOT_VALID = "Please enter a valid email.",
  EMAIL_ALREADY_EXISTS = "E-Mail address already exists!",
  password = "password",
  username = "username",
  USERNAME_ALREADY_EXISTS = "Username already exists!",
  USERNAME_CREDENTIALS = "username should start with lowercase or underscore and does not contain any space also special character",
  PASSWORD_IS_EMPTY = "Password should not be Empty",
}

export enum Image {
  JPEG_TYPE = "image/jpeg",
  JPG_TYPE = "image/png",
  PNG_TYPE = "image/jpg",
  IMAGE_NAME = "BlogImage",
}

// export default auth;
