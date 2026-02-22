const VALID_CARD_NUMBER = '1234123412341234';


const form = document.querySelector('#form-grid');
const cardNumberInput = document.querySelector('#creditCardNumber');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const cardNumber = cardNumberInput.value.replace(/\s/g, ''); 
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    if (cardNumber !== VALID_CARD_NUMBER) {
        showFeedback('Invalid card number. Please try again.', 'error');
        return;
    }

    if (!isValidExpiration(month, year)) {
        showFeedback('Your card is expired. Please use a valid card.', 'error');
        return;
    }

    showFeedback('Payment successful! Thank you for your purchase.', 'success');
    form.reset();
});

function isValidExpiration(month, year) {
    if (month < 1 || month > 12 || isNaN(month) || isNaN(year)) {
        return false;
    }

    const now = new Date();
    const currentYear = now.getFullYear() % 100; 
    const currentMonth = now.getMonth() + 1;     

    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;

    return true;
}

function showFeedback(message, type) {
    const existing = document.querySelector('#feedback');
    if (existing) existing.remove();

    const feedback = document.createElement('p');
    feedback.id = 'feedback';
    feedback.textContent = message;

    feedback.style.cssText = `
        grid-column: 1 / -1;
        grid-row: 6;
        text-align: center;
        padding: 12px;
        border-radius: 8px;
        font-family: 'Space Mono', monospace;
        font-size: 12px;
        margin-top: 8px;
        background-color: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#2a5934' : '#7a2a2a'};
        border: 1px solid ${type === 'success' ? '#a8d5b0' : '#f0a8a8'};
    `;

    form.appendChild(feedback);

    setTimeout(() => feedback.remove(), 4000);
}