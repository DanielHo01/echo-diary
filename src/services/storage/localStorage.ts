// LocalStorage Service

const STORAGE_KEYS = {
  EVENTS: 'echo_events',
  DIARIES: 'echo_diaries',
  SETTINGS: 'echo_settings',
} as const;

// Helper to get storage with error handling
const getStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Helper to set storage
const setStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
};

// Helper to remove storage
const removeStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
};

export const storageService = {
  // Events
  getEvents: <T>(defaultValue: T) => getStorage<T>(STORAGE_KEYS.EVENTS, defaultValue),
  setEvents: <T>(value: T) => setStorage(STORAGE_KEYS.EVENTS, value),
  removeEvents: () => removeStorage(STORAGE_KEYS.EVENTS),

  // Diaries
  getDiaries: <T>(defaultValue: T) => getStorage<T>(STORAGE_KEYS.DIARIES, defaultValue),
  setDiaries: <T>(value: T) => setStorage(STORAGE_KEYS.DIARIES, value),
  removeDiaries: () => removeStorage(STORAGE_KEYS.DIARIES),

  // Settings
  getSettings: <T>(defaultValue: T) => getStorage<T>(STORAGE_KEYS.SETTINGS, defaultValue),
  setSettings: <T>(value: T) => setStorage(STORAGE_KEYS.SETTINGS, value),
  removeSettings: () => removeStorage(STORAGE_KEYS.SETTINGS),
};

export default storageService;
