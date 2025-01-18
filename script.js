console.log("Hello World");
const recordForm = document.getElementById('record-form');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');
const recordList = document.getElementById('record-list');
const addBtn = document.getElementById('submit');
const editIndexInput = document.getElementById('edit-index');
const successPopup = document.getElementById('success-popup'); // Get the success popup element
const deletePopup = document.getElementById('delete-popup'); // Get the delete popup element

let records = JSON.parse(localStorage.getItem('records')) || [];
console.log(records.length);

// Function to check duplicate names
function isDuplicateName(email) {
    return records.some(
        (record) => record.email.toLowerCase() === email.toLowerCase()
    );
}

function displayRecords() {
    recordList.innerHTML = '';
    console.log(records.length);
    if (records.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="5" style="text-align:center; color:red;">No Record Found</td>`;
        recordList.appendChild(row);
    } else {
        records.forEach((record, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${record.name}</td>
            <td>${record.age}</td>
            <td>${record.email}</td>
            <td><button onclick="editRecord(${index})">Edit</button></td>
            <td><button onclick="deleteRecord(${index})">Delete</button></td>
            `;
            recordList.appendChild(row);
        });
    }
}

recordForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = nameInput.value;
    const age = ageInput.value;
    const email = emailInput.value;
    const editIndex = parseInt(editIndexInput.value);

    if (name && age && email) {
        if (isDuplicateName(email) && editIndex === -1) {
            alert('Email already exists.');
            return;
        }

        if (editIndex === -1) {
            // Add a new record
            records.push({ name, age, email });
        } else {
            // Update an existing record
            records[editIndex] = { name, age, email };
            editIndexInput.value = -1;
        }

        // Save the records to localStorage
        localStorage.setItem('records', JSON.stringify(records));

        // Show success popup
        showSuccessPopup();

        // Clear form fields
        nameInput.value = '';
        ageInput.value = '';
        emailInput.value = '';

        // Update the record list
        displayRecords();
    }
});

function editRecord(index) {
    const recordToEdit = records[index];
    nameInput.value = recordToEdit.name;
    ageInput.value = recordToEdit.age;
    emailInput.value = recordToEdit.email;
    editIndexInput.value = index;
}

function deleteRecord(index) {
    // Remove the corresponding row from the DOM
    const row = document.querySelectorAll('tr')[index + 1]; // index + 1 because the header row is at index 0
    row.remove();

    // Remove the record from the array
    records.splice(index, 1);

    // Save the updated records to localStorage
    localStorage.setItem('records', JSON.stringify(records));

    // Show delete popup
    showDeletePopup();

    // Refresh the table
    displayRecords();
}

function showSuccessPopup() {
    // Ensure the popup is reset before showing
    successPopup.classList.remove('show', 'hide');
    successPopup.classList.add('show');

    // Hide the popup after 3 seconds
    setTimeout(function () {
        successPopup.classList.remove('show');
        successPopup.classList.add('hide');
    }, 3000); // 3 seconds
}

function showDeletePopup() {
    // Ensure the popup is reset before showing
    deletePopup.classList.remove('show', 'hide');
    deletePopup.classList.add('show');

    // Hide the popup after 3 seconds
    setTimeout(function () {
        deletePopup.classList.remove('show');
        deletePopup.classList.add('hide');
    }, 3000); // 3 seconds
}

displayRecords();
