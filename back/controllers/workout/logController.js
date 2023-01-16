import asyncHandler from "express-async-handler";
import { isObjectIdOrHexString, isValidObjectId } from "mongoose";
import ExerciseLog from "../../models/exerciseLogModel.js";
import WorkoutLog from "../../models/workoutLogModel.js";
import Workout from "../../models/workoutModel.js"

//@desc   Create new workout log
//@route  POST /api/workouts/log
//@access Private
export const createNewWorkoutLog=asyncHandler (async (req,res)=>{
    const {workoutId} = req.body;
    
    const user = req.user._id;

    const workOut = await Workout.findById(workoutId).populate('exercises');

    if (workOut) {
        const workoutLog1 = await WorkoutLog.create({
            user,
            workout: workOut,
            
        });
        

        const logs = workOut.exercises.map(ex=>{
            let timesArray=[];
            for (let i = 0; i < ex.times; i++) {
                timesArray.push({
                    weight: 0,
                    repeat: 0,
                });
                
            };
            return {
                user,
                exercise: ex._id,
                times: timesArray,
                workoutLog: workoutLog1._id,
            };
        });

        const createdExLogs = await ExerciseLog.insertMany(logs);

        const exLogIds = createdExLogs.map(log=>log._id);

        const foundWorkoutLog = await WorkoutLog.findById(workoutLog1._id);
        console.log(foundWorkoutLog);
 
        foundWorkoutLog.exerciseLog = exLogIds;

        const updateWorkoutLogs =  await foundWorkoutLog.save();
        //console.log(updateWorkoutLogs.workout);
        res.json(updateWorkoutLogs);
    }else{
        res.status(404);
        throw new Error('Workout not found(')
    };

});

//@desc   Get workout log
//@route  GET /api/workouts/log/:id
//@access Private
export const getWorkoutLog=asyncHandler (async (req,res)=>{
    const workoutLog = await WorkoutLog.findById(req.params.id)
    .populate('workout')
    .populate({
        path: 'exerciseLog',
        populate: {
            path: 'exercise',
        },
    })
    .lean();

    const minutes = Math.ceil(workoutLog.workout.exercises.length*3.7);

    res.json({workoutLog, minutes});

});

//@desc   Update workout log completed
//@route  PUT /api/workouts/log/completed
//@access Private
export const updateCompleteWorkoutLog=asyncHandler (async (req,res)=>{
    const {logId} = req.body;

    const currentLog = await WorkoutLog.findById(logId);

    if(!currentLog){
        res.status(404);
        throw new Error('Данный лог не найден!');
    }
    currentLog.completed = true;
    const updateLog = await currentLog.save();
    res.json(updateLog);
});

//@desc   deleted workout log completed
//@route  DELETE /api/workouts/completed/:id
//@access Private
export const deleteWorkoutLog=asyncHandler (async (req,res)=>{
    const currentLog = await WorkoutLog.findById(req.params.id);

    if(!currentLog) {
        res.status(404);
        throw new Error(`Данный ${req.params.id} лог не найдена!`);
    }

    await currentLog.remove();

    res.json({message: 'Тренировка удалена'});
});