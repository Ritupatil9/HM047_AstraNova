// Chatbot Routes - API endpoints for chatbot functionality
import express from 'express';
import { ChatbotService } from '../services/chatbotService.js';

const router = express.Router();
const chatbot = new ChatbotService();

// POST /api/chatbot/message - Process user message
router.post('/message', (req, res) => {
  try {
    const { message } = req.body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a non-empty string'
      });
    }

    // Process the message
    const result = chatbot.processMessage(message);

    res.json(result);
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process message',
      details: error.message
    });
  }
});

// GET /api/chatbot/history - Get conversation history
router.get('/history', (req, res) => {
  try {
    const history = chatbot.getConversationHistory();
    res.json({
      success: true,
      history: history,
      count: history.length
    });
  } catch (error) {
    console.error('Error retrieving history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve conversation history'
    });
  }
});

// POST /api/chatbot/clear - Clear conversation history
router.post('/clear', (req, res) => {
  try {
    const result = chatbot.clearHistory();
    res.json(result);
  } catch (error) {
    console.error('Error clearing history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to clear conversation history'
    });
  }
});

export default router;
