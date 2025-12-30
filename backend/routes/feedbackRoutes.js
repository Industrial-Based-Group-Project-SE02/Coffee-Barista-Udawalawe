import express from 'express';
import {
  createFeedback,
  getVisibleFeedbacks,
  getAllFeedbacks,
  deleteFeedback,
  sendMessageToFeedback,
  setFeedbackVisibility
} from '../controllers/feedbackController.js';

const router = express.Router();

// Public
router.post('/', createFeedback);
router.get('/', getVisibleFeedbacks);

// Admin (in this project, admin auth is optional)
router.get('/all', getAllFeedbacks);
router.delete('/:id', deleteFeedback);
router.post('/:id/message', sendMessageToFeedback);
// Set visibility
router.patch('/:id/visibility', setFeedbackVisibility);

export default router;
