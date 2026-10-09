/* ==========================================================================
   KM Specialty Hospital Management JavaScript Engine
   Includes:
   - Patient Appointment Booking Form Client-Side Validation
   - Confirmation Alert Preview Generator (#KM-MED-XXXX)
   - Department to Doctor Filter Sync
   - Mobile Navigation Drawer Toggle
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // DOM References
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const patDept = document.getElementById('patDept');
    const patDoctor = document.getElementById('patDoctor');

    // Validation Regex Patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    // ==========================================
    // 1. MOBILE NAVIGATION TOGGLE
    // ==========================================
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Close menu when nav link clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }
        });
    });

    // Set today's date as min date for appointment picker
    const patDateInput = document.getElementById('patDate');
    if (patDateInput) {
        const today = new Date().toISOString().split('T')[0];
        patDateInput.setAttribute('min', today);
    }

    // ==========================================
    // 2. DEPARTMENT TO DOCTOR SYNC
    // ==========================================
    patDept.addEventListener('change', () => {
        const selectedDept = patDept.value;
        if (!selectedDept) return;

        // Auto-select doctor corresponding to selected department
        Array.from(patDoctor.options).forEach(opt => {
            if (opt.value.includes(selectedDept)) {
                opt.selected = true;
            }
        });
    });

    // ==========================================
    // 3. APPOINTMENT FORM VALIDATION
    // ==========================================
    const appointmentForm = document.getElementById('appointmentForm');
    const patName = document.getElementById('patName');
    const patEmail = document.getElementById('patEmail');
    const patPhone = document.getElementById('patPhone');
    const patDate = document.getElementById('patDate');
    const patTime = document.getElementById('patTime');
    const confirmationAlert = document.getElementById('confirmationAlert');
    const confirmationText = document.getElementById('confirmationText');

    function showError(inputEl, errorId, message) {
        const errEl = document.getElementById(errorId);
        errEl.innerText = message;
        errEl.classList.add('show');
    }

    function clearError(errorId) {
        const errEl = document.getElementById(errorId);
        errEl.classList.remove('show');
    }

    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Patient Name Validation
        if (patName.value.trim().length < 3) {
            showError(patName, 'patNameError', 'Patient full name is required (min 3 chars).');
            isValid = false;
        } else {
            clearError('patNameError');
        }

        // Email Validation
        if (!emailRegex.test(patEmail.value.trim())) {
            showError(patEmail, 'patEmailError', 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearError('patEmailError');
        }

        // Phone Validation
        if (!phoneRegex.test(patPhone.value.trim())) {
            showError(patPhone, 'patPhoneError', 'Valid 10-digit phone number is required.');
            isValid = false;
        } else {
            clearError('patPhoneError');
        }

        // Department Selection
        if (patDept.value === '') {
            showError(patDept, 'patDeptError', 'Please select a medical department.');
            isValid = false;
        } else {
            clearError('patDeptError');
        }

        // Doctor Selection
        if (patDoctor.value === '') {
            showError(patDoctor, 'patDoctorError', 'Please select a doctor.');
            isValid = false;
        } else {
            clearError('patDoctorError');
        }

        // Date Validation
        if (patDate.value === '') {
            showError(patDate, 'patDateError', 'Please select an appointment date.');
            isValid = false;
        } else {
            clearError('patDateError');
        }

        // Time Selection
        if (patTime.value === '') {
            showError(patTime, 'patTimeError', 'Please select a time slot.');
            isValid = false;
        } else {
            clearError('patTimeError');
        }

        // Success Confirmation
        if (isValid) {
            const refCode = `KM-MED-${Math.floor(1000 + Math.random() * 9000)}`;
            confirmationText.innerText = `Thank you, ${patName.value.trim()}! Your consultation request at KM Hospital with ${patDoctor.value} (${patDept.value}) on ${patDate.value} at ${patTime.value} has been generated. Confirmation Reference: #${refCode}. (Client-side validation preview demo).`;
            
            confirmationAlert.style.display = 'block';
            appointmentForm.reset();

            // Scroll confirmation alert into view
            confirmationAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });

            setTimeout(() => {
                confirmationAlert.style.display = 'none';
            }, 8000);
        }
    });
});
