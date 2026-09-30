import { useTheme } from '../context/ThemeContext';

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <a className="brand" href="#top" aria-label="Mini Task Manager, đầu trang">
        <span className="brand-mark" aria-hidden="true"><span /></span>
        <span>Mini Task Manager</span>
      </a>
      <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Chuyển sang giao diện ${theme === 'light' ? 'tối' : 'sáng'}`}>
        <span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>
        <span>{theme === 'light' ? 'Tối' : 'Sáng'}</span>
      </button>
    </header>
  );
}

export default Header;
