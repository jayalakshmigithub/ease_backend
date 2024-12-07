import mongoose from "mongoose";

// const taskSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   Description: {
//     type: String,
//     required: true,
//   },
  
//   // toDate: {
//   //   type: String,
//   //   required: true,
//   // },
//   // fromDate: {
//   //   type: String,
//   //   required: true,
//   // },
//   // images: {
//   //   type: Array,
//   // },
//   assignee: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user'
// }],
// projectId: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'projects'
// },
//   status: {
//     type: Boolean,
//     default: true,
//   },
//   pending: {
//     type: Boolean,
//     default: false,
//   },
// });

// const taskModel = mongoose.model("tasks", taskSchema);
// export { taskModel };

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  assignee: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,  
      ref: 'user',
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  }],
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'projects',  
  },
  priority: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['ongoing','pending' ,'Completed'], 
    default: 'ongoing',
  },
  // pending: {
  //   type: Boolean,
  //   default: false,
  // },
});

const taskModel = mongoose.model("tasks", taskSchema);
export { taskModel };
