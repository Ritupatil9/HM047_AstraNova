import { db } from '../config/firebase.js';

/**
 * Store credit score in user's history
 * @param {string} userId - Firebase user ID
 * @param {number} score - Credit score (300-850)
 * @param {Object} metadata - Additional metadata (category, calculatedAt, etc.)
 */
export const saveCreditScoreToHistory = async (userId, score, metadata = {}) => {
  try {
    if (!userId || !score) {
      throw new Error('userId and score are required');
    }

    // Get current date
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const monthYear = `${year}-${month}`;

    // Reference to the user's credit score history document
    const historyDocRef = db
      .collection('users')
      .doc(userId)
      .collection('creditScoreHistory')
      .doc(monthYear);

    // Save the score with timestamp
    await historyDocRef.set({
      score: Math.round(score),
      month,
      year,
      monthYear,
      category: metadata.category || 'Good',
      calculatedAt: new Date(now),
      updatedAt: new Date(now),
    }, { merge: true });

    return {
      success: true,
      monthYear,
      score: Math.round(score),
    };
  } catch (error) {
    console.error('Error saving credit score to history:', error);
    throw error;
  }
};

/**
 * Get user's credit score history in chronological order
 * @param {string} userId - Firebase user ID
 * @returns {Array} List of credit scores with month and year
 */
export const getCreditScoreHistory = async (userId) => {
  try {
    if (!userId) {
      throw new Error('userId is required');
    }

    // Reference to the user's credit score history collection
    const historyCollectionRef = db
      .collection('users')
      .doc(userId)
      .collection('creditScoreHistory');

    // Query all documents in the collection
    const querySnapshot = await historyCollectionRef.get();

    // Convert documents to array and sort by monthYear
    const history = [];
    querySnapshot.forEach((doc) => {
      history.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Sort by year and month (chronological order)
    history.sort((a, b) => {
      const dateA = new Date(`${a.year}-${a.month}-01`);
      const dateB = new Date(`${b.year}-${b.month}-01`);
      return dateA - dateB;
    });

    return history;
  } catch (error) {
    console.error('Error fetching credit score history:', error);
    throw error;
  }
};

/**
 * Get the most recent credit score
 * @param {string} userId - Firebase user ID
 * @returns {Object} Most recent credit score
 */
export const getLatestCreditScore = async (userId) => {
  try {
    const history = await getCreditScoreHistory(userId);
    
    if (history.length === 0) {
      return null;
    }

    return history[history.length - 1];
  } catch (error) {
    console.error('Error fetching latest credit score:', error);
    throw error;
  }
};

/**
 * Generate simulated credit score history for demo purposes
 * @param {number} months - Number of months to generate (default 6)
 * @returns {Array} Simulated history
 */
export const generateSimulatedHistory = (months = 6) => {
  const history = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    // Generate slightly increasing score with some randomness
    const baseScore = 620 + i * 15 + Math.random() * 30;
    const score = Math.min(850, Math.max(300, Math.round(baseScore)));

    history.push({
      score,
      month,
      year,
      monthYear: `${year}-${month}`,
      category: getCategoryFromScore(score),
      createdAt: new Date(date).toISOString(),
    });
  }

  return history;
};

/**
 * Get category based on score
 */
const getCategoryFromScore = (score) => {
  if (score >= 750) return 'Excellent';
  if (score >= 700) return 'Good';
  if (score >= 650) return 'Fair';
  if (score >= 550) return 'Poor';
  return 'Very Poor';
};
