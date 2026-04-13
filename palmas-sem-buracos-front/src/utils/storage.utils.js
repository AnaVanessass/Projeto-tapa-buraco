// Storage keys
const STORAGE_KEY = 'potholes';

// Save potholes to localStorage
export const savePotholesToStorage = (potholes) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(potholes));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Load potholes from localStorage
export const loadPotholesFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return [];
  }
};