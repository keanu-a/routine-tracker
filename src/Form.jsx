import { useState } from 'react';

import './index.css';

import { FaPlus } from 'react-icons/fa';

function Form({ onAddRoutineItem }) {
  const [action, setAction] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [frequency, setFrequency] = useState(1);

  // Handles adding a routine to the routine list
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Alert if there are empty "Action" or "Complete by" fields
    if (action === '' || completionDate === '') {
      window.alert('Please have a valid response for all fields');
      return;
    }

    // Creation of new routine item
    const newRoutineItem = {
      action,
      completionDate,
      frequency,
      completed: false,
      id: Date.now(),
    };

    // Add routine item to the array
    onAddRoutineItem(newRoutineItem);

    // Reset fields
    setAction('');
    setCompletionDate('');
    setFrequency(1);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="input-group">
        <label>Action:</label>
        <input
          type="text"
          placeholder="Action..."
          value={action}
          onChange={(e) => setAction(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Complete by:</label>
        <input
          type="date"
          value={completionDate}
          onChange={(e) => setCompletionDate(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Frequency (in days):</label>
        <input
          type="number"
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
          min="1"
        />
      </div>

      <button className="btn-form">
        <FaPlus />
      </button>
    </form>
  );
}

export default Form;
