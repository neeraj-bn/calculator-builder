import { useEffect } from 'react';

export function ThemeToggle({ darkMode, setDarkMode }) {
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors"
    >
      {darkMode ? '🌞' : '🌙'}
    </button>
  );
}