import { useDrag } from 'react-dnd';

export function CalculatorButton({ value, type }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'calculatorItem',
    item: { value, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-4 bg-gray-200 dark:bg-gray-700 dark:text-white rounded cursor-move shadow-md ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors`}
    >
      {value}
    </div>
  );
}