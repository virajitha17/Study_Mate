// timeslots and subject difficulties
let subjectDifficulties = [];

function generateSubjectInputs() {
    const numSubjects = document.getElementById("num-subjects").value;
    const difficultyInputs = document.getElementById("difficulty-inputs");
    difficultyInputs.innerHTML = ""; 

    for (let i = 1; i <= numSubjects; i++) {
        const inputDiv = document.createElement("div");
        inputDiv.innerHTML = `
            <label>Subject ${i}:</label>
            <input type="text" placeholder="Subject Name" id="subject-${i}">
            <input type="number" placeholder="Difficulty (1-5)" id="difficulty-${i}" min="1" max="5">
        `;
        difficultyInputs.appendChild(inputDiv);
    }
}

function addDifficulty() {
    const numSubjects = document.getElementById("num-subjects").value;
    subjectDifficulties = []; 

    for (let i = 1; i <= numSubjects; i++) {
        const subjectName = document.getElementById(`subject-${i}`).value;
        const difficulty = parseInt(document.getElementById(`difficulty-${i}`).value);

        if (subjectName && difficulty) {
            subjectDifficulties.push({ name: subjectName, difficulty });
        }
    }

    subjectDifficulties.sort((a, b) => b.difficulty - a.difficulty);
    displaySubjectList();
}

function displaySubjectList() {
    const difficultyList = document.getElementById("difficulty-list");
    difficultyList.innerHTML = "";
    subjectDifficulties.forEach((subject) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${subject.name} - Difficulty: ${subject.difficulty}`;
        difficultyList.appendChild(listItem);
    });
}

function generateTimetable() {
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;
    const scheduleBody = document.getElementById("schedule-body");

    if (!startTime || !endTime) {
        alert("Please set your study start and end times.");
        return;
    }

    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const totalMinutes = (end - start) / (1000 * 60); 

    const intervalMinutes = Math.floor(totalMinutes / subjectDifficulties.length);

    let currentTime = new Date(start);
    scheduleBody.innerHTML = ""; 

    let subjectIndex = 0;

    while (currentTime < end) {
        const slotEnd = new Date(currentTime.getTime() + intervalMinutes * 60000);
        const row = document.createElement("tr");
        const timeCell = document.createElement("td");
        timeCell.textContent = `${formatTime(currentTime)} - ${formatTime(slotEnd)}`;
        row.appendChild(timeCell);

        for (let j = 0; j < 6; j++) { 
            const cell = document.createElement("td");
            const subject = subjectDifficulties[subjectIndex % subjectDifficulties.length];
            cell.textContent = subject ? subject.name : "";
            row.appendChild(cell);
            subjectIndex++;
        }

        scheduleBody.appendChild(row);

        currentTime = slotEnd;
    }
}

function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${formattedMinutes} ${ampm}`;
}


function updateSchedule() {
    generateTimetable();
}
