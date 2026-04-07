'use strict';

const tabLog       = document.getElementById('tab-log');
const tabHistory   = document.getElementById('tab-history');
const panelLog     = document.getElementById('panel-log');
const panelHistory = document.getElementById('panel-history');

const inputDate     = document.getElementById('input-date');
const inputExercise = document.getElementById('input-exercise');
const inputSets     = document.getElementById('input-sets');
const inputReps     = document.getElementById('input-reps');
const inputWeight   = document.getElementById('input-weight');
const inputNotes    = document.getElementById('input-notes');

const btnSave       = document.getElementById('btn-save-workout');
const btnClear      = document.getElementById('btn-clear-form');
const formToast     = document.getElementById('form-toast');

const filterInput   = document.getElementById('filter-input');
const historyList   = document.getElementById('history-list');
const historyCount  = document.getElementById('history-count');

function switchTab(tab) {
  if (tab === 'log') {
    panelLog.hidden     = false;
    panelHistory.hidden = true;
    tabLog.classList.add('active');
    tabLog.setAttribute('aria-selected', 'true');
    tabHistory.classList.remove('active');
    tabHistory.setAttribute('aria-selected', 'false');
  } else {
    panelLog.hidden     = true;
    panelHistory.hidden = false;
    tabHistory.classList.add('active');
    tabHistory.setAttribute('aria-selected', 'true');
    tabLog.classList.remove('active');
    tabLog.setAttribute('aria-selected', 'false');
    renderHistory();
  }
}

tabLog.addEventListener('click', () => switchTab('log'));
tabHistory.addEventListener('click', () => switchTab('history'));

function setDefaultDate() {
  const today = new Date();
  const yyyy  = today.getFullYear();
  const mm    = String(today.getMonth() + 1).padStart(2, '0');
  const dd    = String(today.getDate()).padStart(2, '0');
  inputDate.value = `${yyyy}-${mm}-${dd}`;
}

setDefaultDate();

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

function renderHistory() {
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

  renderWorkoutCards(historyList, filtered, true);
}

function handleDeleteClick(event) {
  const btn = event.target.closest('.btn-delete');
  if (!btn) return;

  const id = btn.dataset.id;
  if (!id) return;

  const confirmed = window.confirm('Delete this workout entry?');
  if (!confirmed) return;

  deleteWorkout(id);
  renderHistory();
}

historyList.addEventListener('click', handleDeleteClick);
filterInput.addEventListener('input', renderHistory);

if (window.location.hash === '#history') {
  switchTab('history');
}