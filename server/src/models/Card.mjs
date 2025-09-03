import dynamoose from "../config/dbconfig.mjs";
import { v4 as uuid } from "uuid";

const local = process.env.LOCAL;
const config = { create: Boolean(local), waitForActive: Boolean(local) };


const CardSchema = new dynamoose.Schema({
  id:  String,
  title: String,
  description: String,
  status: { type: String, default: "todo" }, 
  assigneeId: String,                         
  createdAt: { type: Date, default: Date.now }
});

const Card = dynamoose.model("Card", CardSchema, config);
export default Card;