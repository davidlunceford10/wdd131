function updateStats() {
  const { totalWorkouts, totalSets, topExercise } = calcStats();

  const elTotal     = document.getElementById('stat-total-workouts');
  const elSets      = document.getElementById('stat-total-sets');
  const elTopEx     = document.getElementById('stat-top-exercise');

  if (elTotal)  elTotal.textContent  = totalWorkouts;
  if (elSets)   elSets.textContent   = totalSets;
  if (elTopEx)  elTopEx.textContent  = topExercise;
}


function renderRecentWorkouts() {
  const container = document.getElementById('recent-workouts-list');
  if (!container) return;

  const workouts = loadWorkouts();
  
  const recent = workouts.slice(0, 3);

  if (recent.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">💪</div>
        <p>No workouts logged yet. <a href="log.html" style="color:var(--secondary)">Log your first one!</a></p>
      </div>
    `;
    return;
  }

  renderWorkoutCards(container, recent, false);
}



updateStats();
renderRecentWorkouts();
