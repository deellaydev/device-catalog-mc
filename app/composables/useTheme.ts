type ThemeType = 'light' | 'dark';

export const useTheme = () => {
  const theme = useState<ThemeType>('theme', () => 'light');

  const setTheme = (value: ThemeType) => {
    theme.value = value;
    document.documentElement.dataset.theme = value;
    localStorage.setItem('theme', value);
  };

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light');
  };

  const initTheme = () => {
    const saved = localStorage.getItem('theme') as ThemeType | null;
    setTheme(saved ?? 'light');
  };

  return {
    theme,
    toggleTheme,
    initTheme,
  };
};
