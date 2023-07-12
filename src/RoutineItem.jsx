import { useState } from 'react';

import './index.css';

import { FaRegTrashAlt } from 'react-icons/fa';

function RoutineItem({
  item,
  onDeleteRoutineItem,
  onToggleCompletion,
  onNextDate,
}) {
  const [status, setStatus] = useState(item.completed);
  const [clicked, setClicked] = useState(false);

  // Toggles additional buttons for an item
  const handleOnClick = () => {
    setClicked(!clicked);
  };

  // Resets the status state and negates completed status
  const handleOnStatusChange = () => {
    setStatus(!status);
    onToggleCompletion(item.id);
  };

  // Formats date from yyyy-mm-dd to mm/dd/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');

    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });

    return formattedDate;
  };

  return (
    <div className="routine" onClick={handleOnClick}>
      <p>
        {item.action} on {formatDate(item.completionDate)}
      </p>

      <span
        className="status"
        style={status ? { color: 'green' } : { color: 'red' }}
      >
        <em>{status ? 'Complete' : 'Incomplete'}</em>
      </span>

      {clicked && (
        <div className="routine-btn-container">
          <p className="frequency-display">
            Every {item.frequency > 1 ? `${item.frequency} days` : 'day'}
          </p>

          {status && (
            <button
              onClick={() => {
                onNextDate(item.id, item.completionDate, item.frequency);
                handleOnStatusChange();
              }}
            >
              Next Date
            </button>
          )}

          <button onClick={handleOnStatusChange}>
            Set {!status ? 'Complete' : 'Incomplete'}
          </button>

          <button onClick={() => onDeleteRoutineItem(item.id, item.action)}>
            <FaRegTrashAlt />
          </button>
        </div>
      )}
    </div>
  );
}

export default RoutineItem;
