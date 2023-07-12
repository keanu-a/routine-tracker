import { useState, useEffect } from 'react';

import './index.css';

import RoutineList from './RoutineList';
import Form from './Form';

function App() {
  const [routineItems, setRoutineItems] = useState(
    JSON.parse(localStorage.getItem('routineItems')) ?? []
  );
  const [sortBy, setSortBy] = useState('date'); // Default sortBy date

  // Save routineItems to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('routineItems', JSON.stringify(routineItems));
  }, [routineItems]);

  // Adds action to routine
  const handleAddRoutineItem = (item) => {
    setRoutineItems((prev) => [...prev, item]);
  };

  // Deletes action from routine
  const handleDeleteRoutineItem = (id, action) => {
    const deleteConfirm = window.confirm(
      `Are you sure you want to delete action: ${action}?`
    );

    if (!deleteConfirm) return;

    setRoutineItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Updates completionDate date by adding the frequency
  const handleNextDate = (id, dateString, frequency) => {
    const nextDateConfirm = window.confirm(
      `Are you sure you want to set the next completion date?`
    );

    if (!nextDateConfirm) return;

    // First calculate the new date
    const date = new Date(dateString);
    date.setDate(date.getDate() + frequency);
    const newDate = date.toISOString().substring(0, 10);

    // Set new date
    setRoutineItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completionDate: newDate } : item
      )
    );

    return;
  };

  // Changes completed status of an item to negation
  const handleToggleCompletion = (id) => {
    setRoutineItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <main className="app">
      <div className="container">
        <h1 className="title">Routine Tracker</h1>

        <div className="content">
          <div className="routines">
            <h3>Actions to Complete</h3>

            <div className="select-sort">
              <p>Sort by</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="completion">Completion</option>
              </select>
            </div>

            <RoutineList
              routineItems={routineItems}
              sortBy={sortBy}
              handleDeleteRoutineItem={handleDeleteRoutineItem}
              handleToggleCompletion={handleToggleCompletion}
              handleNextDate={handleNextDate}
            />
          </div>

          <Form onAddRoutineItem={handleAddRoutineItem} />
        </div>
      </div>
    </main>
  );
}

export default App;
