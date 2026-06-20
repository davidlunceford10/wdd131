const ticketType = document.querySelector('#ticketType');
const extraField = document.querySelector('#extra-field');
const extraLabel = document.querySelector('#extra-label');
const extraInput = document.querySelector('#extra-input');
const form = document.querySelector('#event-form');
const output = document.querySelector('#output');

ticketType.addEventListener('change', function() {
    const value = ticketType.value;

    if (value === 'one') {                      
        extraLabel.textContent = 'Student I#';
        extraInput.setAttribute('maxlength', '9');
        extraField.style.display = 'flex';

    } else if (value === 'many') {              
        extraLabel.textContent = 'Access Code';
        extraInput.removeAttribute('maxlength');
        extraField.style.display = 'flex';

    } else {                                    
        extraField.style.display = 'none';
    }
});




form.addEventListener('submit', function(e) {
    e.preventDefault(); 

  
    const firstName = document.querySelector('#firstName').value.trim();
    const lastName = document.querySelector('#lastName').value.trim();
    const type = document.querySelector('#ticketType').value;
    const date = document.querySelector('#event-date').value;
    const extraInput = document.querySelector('#extra-input').value.trim();

    
    const errors = [];

    if (type === 'one' && extraInput.length !== 9) {
        errors.push('Student I# must be 9 digits');
    }

    if (type === 'many' && extraInput !== 'EVENT131') {
        errors.push('Access Code is incorrect');
    }

    // Show errors OR ticket info
    if (errors.length > 0) {
        output.innerHTML = errors.map(err => `<p style="color: black;">${err}</p>`).join('');
    } else {
        output.innerHTML = `
            <h3>Ticket Created</h3>
            <p>${firstName} ${lastName}</p>
            <p>${type === 'one' ? 'student' : 'guest'}</p>
            <p>${date}</p>
        `;
        form.reset();
        
        document.querySelector('#extra-field').style.display = 'none';
    }
});