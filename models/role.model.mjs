import mongoose from 'mongoose';

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String
  })
);

export default Role;

