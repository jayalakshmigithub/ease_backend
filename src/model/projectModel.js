import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  workspaceName: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    default: [],
  },
  // masterId: {
  //   type: String,
  //   required: true,
  // },
  toDate: {
    type: String,
    required: true,
  },
  fromDate: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  pending: {
    type: Boolean,
    default: false,
  },
});

const projectModel=mongoose.model("projects",projectSchema,);
export {projectModel}