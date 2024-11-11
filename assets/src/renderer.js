document.getElementById('adminButton').addEventListener('click', () => {
    window.location.href = 'admin.html'; // You will create an admin menu HTML later
  });
  
  document.getElementById('bookingButton').addEventListener('click', () => {
    window.location.href = 'booking.html'; // You will create a booking menu HTML later
  });
  
  document.getElementById('settingsButton').addEventListener('click', () => {
    window.location.href = 'settings.html'; // Settings menu to update email/telegram link
  });
  const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const createBookingButton = document.getElementById('createBooking');

firstNameInput.addEventListener('input', validateFields);
lastNameInput.addEventListener('input', validateFields);

function validateFields() {
  if (firstNameInput.value && lastNameInput.value) {
    createBookingButton.disabled = false;
  } else {
    createBookingButton.disabled = true;
  }
}
