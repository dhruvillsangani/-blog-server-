import * as dotenv from "dotenv";
dotenv.config();

const mongoUrl = {
  MONGO_URL: `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.ldpbz.mongodb.net/blog?retryWrites=true&w=majority`,
  connected: "connected",
};

export default mongoUrl;
