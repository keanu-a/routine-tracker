import './index.css';

import RoutineItem from './RoutineItem';

function RoutineList({
  routineItems,
  sortBy,
  handleDeleteRoutineItem,
  handleToggleCompletion,
  handleNextDate,
}) {
  let items;

  // This sorts routine items chronologically
  if (sortBy === 'date') {
    items = [...routineItems].sort((a, b) => {
      const dateA = new Date(a.completionDate);
      const dateB = new Date(b.completionDate);
      return dateA - dateB;
    });
  }

  // This sorts routine items chronologically but places completed items to the bottom
  if (sortBy === 'completion') {
    items = [...routineItems].sort((a, b) => {
      // a is completed, b is not completed, place a after b
      if (a.completed && !b.completed) return 1;

      // a is not completed, b is completed, place a before b
      if (!a.completed && b.completed) return -1;

      // both a and b have the same completion status, sort by date
      const dateA = new Date(a.completionDate);
      const dateB = new Date(b.completionDate);
      return dateA - dateB;
    });
  }

  return (
    <div className="routine-items">
      {items.map((item) => (
        <RoutineItem
          item={item}
          key={item.id}
          onDeleteRoutineItem={handleDeleteRoutineItem}
          onToggleCompletion={handleToggleCompletion}
          onNextDate={handleNextDate}
        />
      ))}
    </div>
  );
}

export default RoutineList;
