import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import {createNewWorkout, deleteWorkout, getWorkout, getWorkouts, updateWorkout} from '../controllers/workout/workoutController.js';
import { createNewWorkoutLog, deleteWorkoutLog, getWorkoutLog, updateCompleteWorkoutLog } from '../controllers/workout/logController.js';

const router=express.Router();

router.route('/')
.get(protect, getWorkouts)
.post(protect, createNewWorkout)
.put(protect, updateWorkout);
router.route('/log').post(protect, createNewWorkoutLog);
router.route('/log/completed').put(protect, updateCompleteWorkoutLog);
router.route('/log/:id').get(protect, getWorkoutLog);
router.route('/completed/:id').delete(protect, deleteWorkoutLog);
router.route('/:id')
.get(protect, getWorkout)
.delete(protect, deleteWorkout);

export default router;