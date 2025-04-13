export const STORAGE_KEYS = {
  SEARCH_ITEMS: 'search_items',
  TUTORIAL_SHOWN_OR_SKIPPED: 'tutorial_shown_or_skipped',
};

export default class StorageService {
  getStorage = (key: keyof typeof STORAGE_KEYS, defaultValue = '') => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key) ?? defaultValue;
    }
    return defaultValue;
  };

  setStorage = (key: keyof typeof STORAGE_KEYS, value: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
  };

  removeStorage = (key: keyof typeof STORAGE_KEYS) => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  };
}
