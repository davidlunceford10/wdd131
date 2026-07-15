'use strict';

/* ---------- Element refs ---------- */
const statTotal = document.getElementById('stat-total-workouts');
const statSets  = document.getElementById('stat-total-sets');
const statTopEx = document.getElementById('stat-top-exercise');

const workoutsList  = document.getElementById('workouts-list');
const filterInput   = document.getElementById('filter-input');
const historyCount  = document.getElementById('history-count');

const modalOverlay  = document.getElementById('modal-overlay');
const modalCloseBtn = document.getElementById('modal-close-btn');

const inputDate     = document.getElementById('input-date');
const inputExercise = document.getElementById('input-exercise');
const inputSets     = document.getElementById('input-sets');
const inputReps     = document.getElementById('input-reps');
const inputWeight   = document.getElementById('input-weight');
const inputNotes    = document.getElementById('input-notes');

const btnSave   = document.getElementById('btn-save-workout');
const btnClear  = document.getElementById('btn-clear-form');
const formToast = document.getElementById('form-toast');

let lastFocusedEl = null;

/* ---------- Stats ---------- */
function updateStats() {
  const { totalWorkouts, totalSets, topExercise } = calcStats();
  if (statTotal) statTotal.textContent = totalWorkouts;
  if (statSets)  statSets.textContent  = totalSets;
  if (statTopEx) statTopEx.textContent = topExercise;
}

/* ---------- Workouts list (filterable, always shows everything) ---------- */
function renderWorkouts() {
  const allWorkouts = loadWorkouts();
  const filterValue = filterInput.value.trim().toLowerCase();

  const filtered = filterValue
    ? allWorkouts.filter(w => w.exercise.toLowerCase().includes(filterValue))
    : allWorkouts;

  if (filterValue) {
    historyCount.textContent = filtered.length === 1
      ? '1 result'
      : `${filtered.length} results`;
  } else {
    historyCount.textContent = allWorkouts.length === 1
      ? '1 workout'
      : `${allWorkouts.length} workouts`;
  }

  renderWorkoutCards(workoutsList, filtered, true);
}

/* ---------- Modal ---------- */
function setDefaultDate() {
  const today = new Date();
  const yyyy  = today.getFullYear();
  const mm    = String(today.getMonth() + 1).padStart(2, '0');
  const dd    = String(today.getDate()).padStart(2, '0');
  inputDate.value = `${yyyy}-${mm}-${dd}`;
}

function getFocusableElements() {
  return modalOverlay.querySelectorAll(
    'button, input, textarea, select, [href], [tabindex]:not([tabindex="-1"])'
  );
}

function handleModalKeydown(event) {
  if (event.key === 'Escape') {
    closeModal();
    return;
  }

  if (event.key === 'Tab') {
    const focusables = getFocusableElements();
    if (!focusables.length) return;

    const first = focusables[0];
    const last  = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

function openModal() {
  lastFocusedEl = document.activeElement;
  if (!inputDate.value) setDefaultDate();
  modalOverlay.hidden = false;
  document.body.classList.add('modal-open');
  inputExercise.focus();
  document.addEventListener('keydown', handleModalKeydown);
}

function closeModal() {
  modalOverlay.hidden = true;
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleModalKeydown);
  if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
    lastFocusedEl.focus();
  }
}

// Delegate so this also catches the empty-state "log your first one" button,
// which doesn't exist in the DOM until it's rendered.
document.addEventListener('click', (event) => {
  if (event.target.closest('[data-open-modal]')) {
    openModal();
  }
});

modalCloseBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) closeModal();
});

/* ---------- Form ---------- */
function validateForm() {
  let valid = true;

  if (!inputDate.value) {
    inputDate.focus();
    inputDate.style.borderColor = 'var(--accent)';
    valid = false;
  } else {
    inputDate.style.borderColor = '';
  }

  if (!inputExercise.value.trim()) {
    if (valid) inputExercise.focus();
    inputExercise.style.borderColor = 'var(--accent)';
    valid = false;
  } else {
    inputExercise.style.borderColor = '';
  }

  const setsVal = parseInt(inputSets.value, 10);
  if (!inputSets.value || isNaN(setsVal) || setsVal < 1) {
    if (valid) inputSets.focus();
    inputSets.style.borderColor = 'var(--accent)';
    valid = false;
  } else {
    inputSets.style.borderColor = '';
  }

  const repsVal = parseInt(inputReps.value, 10);
  if (!inputReps.value || isNaN(repsVal) || repsVal < 1) {
    if (valid) inputReps.focus();
    inputReps.style.borderColor = 'var(--accent)';
    valid = false;
  } else {
    inputReps.style.borderColor = '';
  }

  return valid;
}

function logWorkout() {
  if (!validateForm()) return;

  const workout = {
    date:     inputDate.value,
    exercise: inputExercise.value.trim(),
    sets:     parseInt(inputSets.value, 10),
    reps:     parseInt(inputReps.value, 10),
    weight:   parseFloat(inputWeight.value) || 0,
    notes:    inputNotes.value.trim(),
  };

  addWorkout(workout);
  updateStats();
  renderWorkouts();

  formToast.classList.add('show');
  setTimeout(() => formToast.classList.remove('show'), 3000);

  inputExercise.value = '';
  inputSets.value     = '';
  inputReps.value     = '';
  inputWeight.value   = '';
  inputNotes.value    = '';
  inputExercise.focus();
}

function clearForm() {
  inputExercise.value = '';
  inputSets.value     = '';
  inputReps.value     = '';
  inputWeight.value   = '';
  inputNotes.value    = '';
  formToast.classList.remove('show');

  [inputDate, inputExercise, inputSets, inputReps].forEach(el => {
    el.style.borderColor = '';
  });
}

btnSave.addEventListener('click', logWorkout);
btnClear.addEventListener('click', clearForm);

/* ---------- Delete ---------- */
function handleDeleteClick(event) {
  const btn = event.target.closest('.btn-delete');
  if (!btn) return;

  const id = btn.dataset.id;
  if (!id) return;

  const confirmed = window.confirm('Delete this workout entry?');
  if (!confirmed) return;

  deleteWorkout(id);
  updateStats();
  renderWorkouts();
}

workoutsList.addEventListener('click', handleDeleteClick);
filterInput.addEventListener('input', renderWorkouts);

/* ---------- Init ---------- */
updateStats();
renderWorkouts();
