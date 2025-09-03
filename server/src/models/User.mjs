import dynamoose from "../config/dbconfig.mjs";

const local = process.env.LOCAL;
const config = { create: Boolean(local), waitForActive: Boolean(local) };

const UserSchema = new dynamoose.Schema({
  id: String,
  email: String,
  name: String,
  createdAt: { type: Date, default: Date.now },
});

const User = dynamoose.model("User", UserSchema, config);
export default User;
