import { useDrop } from 'react-dnd';
import { useState } from 'react';

export function CalculatorGrid() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [grid, setGrid] = useState(Array(16).fill(null));

  const handleCalculation = () => {
    try {
      const result = eval(expression);
      setDisplay(result.toString());
      setExpression(result.toString());
    } catch (error) {
      setDisplay('Error');
      setExpression('');
    }
  };

  const handleItemClick = (value, type) => {
    if (type === 'number' || type === 'operator') {
      setExpression((prev) => prev + value);
      setDisplay((prev) => prev === '0' ? value : prev + value);
    } else if (type === 'clear') {
      setDisplay('0');
      setExpression('');
    } else if (type === 'equals') {
      handleCalculation();
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'calculatorItem',
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const dropTargetRect = document.getElementById('calculator-grid').getBoundingClientRect();
      
      const cellWidth = dropTargetRect.width / 4;
      const cellHeight = dropTargetRect.height / 4;
      
      const x = Math.floor((clientOffset.x - dropTargetRect.left) / cellWidth);
      const y = Math.floor((clientOffset.y - dropTargetRect.top) / cellHeight);
      const index = y * 4 + x;
      
      if (index >= 0 && index < 16 && !grid[index]) {
        const newGrid = [...grid];
        newGrid[index] = { ...item };
        setGrid(newGrid);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [grid]);

  const removeButton = (index) => {
    const newGrid = [...grid];
    newGrid[index] = null;
    setGrid(newGrid);
  };

  return (
    <div className="w-80 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-xl">
      <div className="bg-white dark:bg-gray-700 p-4 mb-4 rounded text-right text-2xl min-h-16 dark:text-white">
        {display}
      </div>
      <div
        id="calculator-grid"
        ref={drop}
        className={`grid grid-cols-4 gap-2 bg-white dark:bg-gray-700 p-4 rounded ${
          isOver ? 'bg-gray-50 dark:bg-gray-600' : ''
        }`}
      >
        {grid.map((item, index) => (
          <div
            key={index}
            className="aspect-square flex items-center justify-center bg-gray-50 dark:bg-gray-600 rounded cursor-pointer relative group"
            onClick={() => item && handleItemClick(item.value, item.type)}
          >
            {item ? (
              <div className="w-full h-full flex items-center justify-center relative">
                <span className="text-xl dark:text-white">{item.value}</span>
                <button
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeButton(index);
                  }}
                >
                  ×
                </button>
              </div>
            ) : (
              <span className="text-gray-300 dark:text-gray-400">Drop here</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}