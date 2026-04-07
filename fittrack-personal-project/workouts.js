'use strict';

const STORAGE_KEY = 'fittrack_workouts';

const SEED_DATA = [
  { id: 'seed-1', date: '2025-03-10', exercise: 'Squat',          sets: 4, reps: 8,  weight: 185, notes: 'Felt strong today' },
  { id: 'seed-2', date: '2025-03-11', exercise: 'Bench Press',    sets: 4, reps: 6,  weight: 155, notes: 'Slight shoulder tightness' },
  { id: 'seed-3', date: '2025-03-12', exercise: 'Deadlift',       sets: 3, reps: 5,  weight: 225, notes: '' },
  { id: 'seed-4', date: '2025-03-13', exercise: 'Pull-ups',       sets: 3, reps: 10, weight: 0,   notes: 'Bodyweight' },
  { id: 'seed-5', date: '2025-03-14', exercise: 'Overhead Press', sets: 3, reps: 8,  weight: 95,  notes: '' },
];

function loadWorkouts() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) {
    saveWorkouts(SEED_DATA);
    return SEED_DATA;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveWorkouts(workouts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
}

function addWorkout(workout) {
  const workouts = loadWorkouts();
  const entry = {
    id: 'w-' + Date.now(),
    date: workout.date,
    exercise: workout.exercise.trim(),
    sets: Number(workout.sets),
    reps: Number(workout.reps),
    weight: Number(workout.weight) || 0,
    notes: (workout.notes || '').trim(),
  };
  workouts.unshift(entry);
  saveWorkouts(workouts);
  return entry;
}

function deleteWorkout(id) {
  const workouts = loadWorkouts().filter(w => w.id !== id);
  saveWorkouts(workouts);
}

function calcStats() {
  const workouts = loadWorkouts();

  const totalWorkouts = workouts.length;

  const totalSets = workouts.reduce((acc, w) => acc + w.sets, 0);

  const frequency = workouts.reduce((map, w) => {
    const key = w.exercise.toLowerCase();
    map[key] = (map[key] || 0) + 1;
    return map;
  }, {});

  let topExercise = '—';
  if (Object.keys(frequency).length > 0) {
    const topKey = Object.keys(frequency).reduce((a, b) =>
      frequency[a] >= frequency[b] ? a : b
    );
    const match = workouts.find(w => w.exercise.toLowerCase() === topKey);
    topExercise = match ? match.exercise : topKey;
  }

  return { totalWorkouts, totalSets, topExercise };
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function buildWorkoutCard(w, showDelete = true) {
  const card = document.createElement('article');
  card.className = 'workout-card';
  card.setAttribute('role', 'listitem');
  card.dataset.id = w.id;

  const weightStr = w.weight > 0 ? ` @ ${w.weight} lbs` : ' (Bodyweight)';
  const notesHtml = w.notes
    ? `<p class="workout-notes">"${w.notes}"</p>`
    : '';

  const deleteBtn = showDelete
    ? `<button class="btn btn-danger btn-delete" data-id="${w.id}" aria-label="Delete ${w.exercise} workout">🗑 Delete</button>`
    : '';

  card.innerHTML = `
    <div class="workout-card-main">
      <div class="workout-exercise">${w.exercise}</div>
      <div class="workout-date">${formatDate(w.date)}</div>
      <div class="workout-details">
        <span class="workout-badge">${w.sets} sets</span>
        <span class="workout-badge">${w.reps} reps</span>
        <span class="workout-badge">${weightStr.trim()}</span>
      </div>
      ${notesHtml}
    </div>
    <div class="workout-card-actions">${deleteBtn}</div>
  `;

  return card;
}

function renderWorkoutCards(container, workouts, showDelete = true) {
  container.innerHTML = '';

  if (workouts.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🏋️</div>
        <p>No workouts yet — go log your first one!</p>
      </div>
    `;
    return;
  }

  workouts.forEach(w => {
    const card = buildWorkoutCard(w, showDelete);
    container.appendChild(card);
  });
}