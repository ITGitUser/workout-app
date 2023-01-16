import mongoose from 'mongoose'

const {ObjectId} = mongoose.Schema;

const workoutLogSchema=mongoose.Schema(
    {
      user: {
          type: ObjectId,
          ref: 'User',
          required: true
      },
      /*
      workout: {
        type: ObjectId,
        ref: 'Workout',
        required: true
    },*/
    workout: 
      { 
        _id: {
        type: String,
        required: true,
        },
        name: {
          type: String,
          required: true,
        }
      },
      completed:{
            type: Boolean,
            default: false
      },
      exerciseLog: [
        {
          type: ObjectId,
          ref: 'ExerciseLog',
        },
      ],
    },{
        minimize:false,
        timestamps:true
    }
);

const WorkoutLog = mongoose.model('WorkoutLog', workoutLogSchema);

export default WorkoutLog;