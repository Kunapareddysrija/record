const data = {};
const weekSelect = document.getElementById("weekSelect");
const display = document.getElementById("display");

function addWeek() {
  const week = document.getElementById("weekName").value.trim();
  if (!week || data[week]) return;

  data[week] = [];

  const option = document.createElement("option");
  option.value = week;
  option.textContent = week;
  weekSelect.appendChild(option);

  document.getElementById("weekName").value = "";
  render();
}

function addTask() {
  const week = weekSelect.value;
  const taskName = document.getElementById("taskName").value.trim();
  const codeUrl = document.getElementById("codeUrl").value.trim();
  const imageInput = document.getElementById("outputImage");

  if (!week || !taskName) return;

  // If image exists
  if (imageInput.files.length > 0) {
    const reader = new FileReader();

    reader.onload = function () {
      data[week].push({
        taskName,
        codeUrl,
        image: reader.result
      });
      render();
    };

    reader.readAsDataURL(imageInput.files[0]);
  } 
  // If image NOT selected
  else {
    data[week].push({
      taskName,
      codeUrl,
      image: null
    });
    render();
  }

  document.getElementById("taskName").value = "";
  document.getElementById("codeUrl").value = "";
  imageInput.value = "";
}

function render() {
  display.innerHTML = "";

  for (const week in data) {
    const weekDiv = document.createElement("div");
    weekDiv.className = "week";

    const weekTitle = document.createElement("h2");
    weekTitle.textContent = week;

    const tasksDiv = document.createElement("div");
    tasksDiv.style.display = "none";

    weekTitle.onclick = () => {
      tasksDiv.style.display =
        tasksDiv.style.display === "none" ? "block" : "none";
    };

    data[week].forEach(task => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task";

      const taskTitle = document.createElement("h3");
      taskTitle.textContent = task.taskName;

      const details = document.createElement("div");
      details.className = "task-details";
      details.style.display = "none";

      details.innerHTML = `
        ${task.codeUrl ? `
        <p><strong>Source Code:</strong>
          <a href="${task.codeUrl}" target="_blank">${task.codeUrl}</a>
        </p>` : ""}

        ${task.image ? `<img src="${task.image}">` : ""}
      `;

      taskTitle.onclick = () => {
        details.style.display =
          details.style.display === "none" ? "block" : "none";
      };

      taskDiv.appendChild(taskTitle);
      taskDiv.appendChild(details);
      tasksDiv.appendChild(taskDiv);
    });

    weekDiv.appendChild(weekTitle);
    weekDiv.appendChild(tasksDiv);
    display.appendChild(weekDiv);
  }
}
