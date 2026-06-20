const nameInput = document.getElementById("studentName");
const rollInput = document.getElementById("studentRoll");
const dateInput = document.getElementById("attendanceDate");
const tableBody = document.querySelector("#attendanceTable tbody");

let students = [];

// Load Data
window.onload = function () {
    const savedData = localStorage.getItem("students");

    if (savedData) {
        students = JSON.parse(savedData);
    }

    setTodayDate();
    displayStudents();
};

// Set Today's Date
function setTodayDate() {
    const today = new Date().toISOString().split("T")[0];
    dateInput.value = today;

    showDay();

    dateInput.addEventListener("change", () => {
        showDay();
        displayStudents();
    });
}

function showDay() {
    const date = new Date(dateInput.value);

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const dayName = days[date.getDay()];
    const dayElement = document.getElementById("dayName");

    dayElement.innerHTML = " (" + dayName + ")";

    if (dayName === "Friday" || dayName === "Saturday") {
        dayElement.classList.add("red-day");
    } else {
        dayElement.classList.remove("red-day");
    }
}
// Save Data
function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
}

// Add Student
function addStudent() {
    const roll = rollInput.value.trim();
    const name = nameInput.value.trim();

    if (!roll || !name) {
        alert("Roll No and Student Name are required!");
        return;
    }

    // Check duplicate roll
    const exists = students.find(student => student.roll === roll);

    if (exists) {
        alert("This Roll Number already exists!");
        return;
    }

    const student = {
        roll: roll,
        name: name,
        attendance: {}
    };

    students.push(student);

    rollInput.value = "";
    nameInput.value = "";

    saveData();
    displayStudents();
}

// Display Students
function displayStudents() {
    tableBody.innerHTML = "";

    const selectedDate = dateInput.value;

    students.forEach((student, index) => {
        const status =
            student.attendance[selectedDate] || "Not Marked";

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.roll}</td>
            <td>${student.name}</td>
            <td>
                <span class="${
                    status === "Present"
                        ? "present"
                        : status === "Absent"
                        ? "absent"
                        : ""
                }">
                    ${status}
                </span>
                <br><br>

                <button class="status-btn present-btn"
                    onclick="markAttendance('${student.roll}','Present')">
                    Present
                </button>

                <button class="status-btn absent-btn"
                    onclick="markAttendance('${student.roll}','Absent')">
                    Absent
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Mark Attendance
function markAttendance(roll, status) {
    const selectedDate = dateInput.value;

    const student = students.find(
        student => student.roll === roll
    );

    if (student) {
        student.attendance[selectedDate] = status;
    }

    saveData();
    displayStudents();
}

// Delete All Data
function deleteAllData() {
    const confirmDelete = confirm(
        "Are you sure you want to delete all student data?"
    );

    if (confirmDelete) {
        localStorage.removeItem("students");
        students = [];
        displayStudents();
    }
}
