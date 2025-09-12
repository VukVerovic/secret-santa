import dynamoose from "../config/dbconfig.mjs";

const local = process.env.LOCAL;
const config = { create: Boolean(local), waitForActive: Boolean(local) };

const AssignmentSchema = new dynamoose.Schema({
  id: String,           
  giverId: String,      
  receiverId: String,   
  createdAt: { type: Date, default: Date.now }
});

const Assignment = dynamoose.model("Assignment", AssignmentSchema, config);
export default Assignment;