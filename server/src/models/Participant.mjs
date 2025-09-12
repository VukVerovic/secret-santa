import dynamoose from "../config/dbconfig.mjs";

const local = process.env.LOCAL;
const config = { create: Boolean(local), waitForActive: Boolean(local) };

const ParticipantSchema = new dynamoose.Schema({
  id: String,
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});

const Participant = dynamoose.model("Participant", ParticipantSchema, config);
export default Participant;