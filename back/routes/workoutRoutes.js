import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import {createNewWorkout, deleteWorkout, getWorkout, getWorkouts, updateWorkout} from '../controllers/workout/workoutController.js';
import { createNewWorkoutLog, getWorkoutLog, updateCompleteWorkoutLog } from '../controllers/workout/logController.js';

const router=express.Router();

router.route('/')
.get(protect, getWorkouts)
.post(protect, createNewWorkout)
.put(protect, updateWorkout)
.delete(protect, deleteWorkout); 
router.route('/log').post(protect, createNewWorkoutLog);
router.route('/log/completed').put(protect, updateCompleteWorkoutLog);
router.route('/log/:id').get(protect, getWorkoutLog);
router.route('/:id').get(protect, getWorkout);

export default router;