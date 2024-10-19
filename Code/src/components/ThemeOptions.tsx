import { ThemeOptionsProps } from '../types/all';
import { cn } from '../utils/cn';

const ThemeOptions: React.FC<ThemeOptionsProps> = ({ className, isMobile, onThemeChange }) => {
  return (
    <div
      className={cn(
        'bg-surface dark:bg-darkSurface text-text dark:text-darkText p-2 rounded-md shadow-lg',
        isMobile ? 'w-full pl-4' : 'absolute z-10 top-12 right-0 w-40',
        className
      )}
    >
      {['Light', 'Dark'].map((option) => (
        <p
          key={option}
          className={cn(
            'p-2 rounded cursor-pointer transition-colors duration-200',
            'hover:bg-gray-200 dark:hover:bg-gray-700'
          )}
          onClick={() => onThemeChange(option.toLowerCase() as 'light' | 'dark')}
        >
          {option}
        </p>
      ))}
    </div>
  );
};

export default ThemeOptions;
