import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CalculatorButton } from './components/CalculatorButton';
import { CalculatorGrid } from './components/CalculatorGrid';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  const buttons = [
    { value: '7', type: 'number' },
    { value: '8', type: 'number' },
    { value: '9', type: 'number' },
    { value: '/', type: 'operator' },
    { value: '4', type: 'number' },
    { value: '5', type: 'number' },
    { value: '6', type: 'number' },
    { value: '*', type: 'operator' },
    { value: '1', type: 'number' },
    { value: '2', type: 'number' },
    { value: '3', type: 'number' },
    { value: '-', type: 'operator' },
    { value: '0', type: 'number' },
    { value: 'C', type: 'clear' },
    { value: '=', type: 'equals' },
    { value: '+', type: 'operator' },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors flex flex-col items-center py-12">
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Calculator Builder</h1>
        <div className="flex gap-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Available Buttons</h2>
            <div className="grid grid-cols-4 gap-2">
              {buttons.map((button, index) => (
                <CalculatorButton
                  key={index}
                  value={button.value}
                  type={button.type}
                />
              ))}
            </div>
          </div>
          <CalculatorGrid />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;