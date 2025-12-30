import Feedback from '../models/Feedback.js';

// Public - create feedback
export const createFeedback = async (req, res) => {
  try {
    console.log('Creating feedback:', req.body);
    const { name, email, message, rating } = req.body;
    if (!name || !message) {
      return res.status(400).json({ success: false, message: 'Name and message are required' });
    }

    const fb = new Feedback({ name, email, message, rating });
    await fb.save();

    res.status(201).json({ success: true, message: 'Feedback created', feedback: fb });
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ success: false, message: 'Error creating feedback', error: error.message });
  }
};

// Public - get visible feedbacks
export const getVisibleFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ isVisible: true }).sort({ createdAt: -1 }).limit(10);
    res.status(200).json({ success: true, count: feedbacks.length, feedbacks });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ success: false, message: 'Error fetching feedbacks', error: error.message });
  }
};

// Admin - get all feedbacks
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: feedbacks.length, feedbacks });
  } catch (error) {
    console.error('Error fetching all feedbacks:', error);
    res.status(500).json({ success: false, message: 'Error fetching feedbacks', error: error.message });
  }
};

// Admin - delete feedback
export const deleteFeedback = async (req, res) => {
  try {
    const fb = await Feedback.findById(req.params.id);
    if (!fb) return res.status(404).json({ success: false, message: 'Feedback not found' });
    await fb.deleteOne();
    res.status(200).json({ success: true, message: 'Feedback deleted' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ success: false, message: 'Error deleting feedback', error: error.message });
  }
};

// Admin - send message/notification to feedback submitter (placeholder)
export const sendMessageToFeedback = async (req, res) => {
  try {
    const fb = await Feedback.findById(req.params.id);
    if (!fb) return res.status(404).json({ success: false, message: 'Feedback not found' });

    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, message: 'Message is required' });

    // Placeholder: integrate email/SMS provider here (nodemailer, twilio, etc.)
    console.log(`Sending message to ${fb.email || fb.name}:`, message);

    res.status(200).json({ success: true, message: 'Message sent (placeholder)' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, message: 'Error sending message', error: error.message });
  }
};

// Admin - set feedback visibility (show/hide)
export const setFeedbackVisibility = async (req, res) => {
  try {
    const fb = await Feedback.findById(req.params.id);
    if (!fb) return res.status(404).json({ success: false, message: 'Feedback not found' });

    const { isVisible } = req.body;
    fb.isVisible = !!isVisible;
    await fb.save();

    res.status(200).json({ success: true, message: 'Visibility updated', feedback: fb });
  } catch (error) {
    console.error('Error updating visibility:', error);
    res.status(500).json({ success: false, message: 'Error updating visibility', error: error.message });
  }
};
