// Character object with properties and methods
const character = {
  name: 'Swamp Beast Diplomat',
  class: 'Ranger',
  level: 1,
  health: 100,
  image: 'https://byui-cse.github.io/wdd131-course/images/swamp-beast.webp',

  attacked: function () {
    this.health -= 20;
    if (this.health <= 0) {
      this.health = 0;
      updateDisplay();
      showStatus('💀 ' + this.name + ' has died!');
      document.getElementById('attack-btn').disabled = true;
      return;
    }
    updateDisplay();
    showStatus('⚔️ Attacked! Health dropped to ' + this.health + '.');
  },

  levelUp: function () {
    this.level += 1;
    updateDisplay();
    showStatus('🌟 Level up! Now level ' + this.level + '!');
  }
};

// Update the DOM with current character data
function updateDisplay() {
  document.getElementById('character-name').textContent = character.name;
  document.getElementById('character-class').textContent = character.class;
  document.getElementById('character-level').textContent = character.level;
  document.getElementById('character-health').textContent = character.health;
}

// Show a status message below the buttons
function showStatus(message) {
  document.getElementById('status-message').textContent = message;
}

// Button event listeners
document.getElementById('attack-btn').addEventListener('click', function () {
  character.attacked();
});

document.getElementById('levelup-btn').addEventListener('click', function () {
  character.levelUp();
});

// Initial render
updateDisplay();
