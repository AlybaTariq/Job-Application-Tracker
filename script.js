document.addEventListener("DOMContentLoaded", function () {
  loadJobs();
});

function addJob() {
  let company = document.getElementById("company").value;
  let jobTitle = document.getElementById("jobTitle").value;
  let status = document.getElementById("status").value;

  if (company && jobTitle) {
    let job = { company, jobTitle, status };
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    jobs.push(job);
    localStorage.setItem("jobs", JSON.stringify(jobs));
    loadJobs();
  }
}

function loadJobs() {
  let jobList = document.getElementById("jobList");
  jobList.innerHTML = "";
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  jobs.forEach((job, index) => {
    let row = `<tr>
            <td>${job.company}</td>
            <td>${job.jobTitle}</td>
            <td>
                <select onchange="updateStatus(${index}, this.value)">
                    <option value="Applied" ${
                      job.status === "Applied" ? "selected" : ""
                    }>Applied</option>
                    <option value="Interview" ${
                      job.status === "Interview" ? "selected" : ""
                    }>Interview</option>
                    <option value="Offer" ${
                      job.status === "Offer" ? "selected" : ""
                    }>Offer</option>
                    <option value="Rejected" ${
                      job.status === "Rejected" ? "selected" : ""
                    }>Rejected</option>
                </select>
            </td>
            <td>
                <button onclick="deleteJob(${index})">Delete</button>
            </td>
        </tr>`;
    jobList.innerHTML += row;
  });
}

function updateStatus(index, newStatus) {
  let jobs = JSON.parse(localStorage.getItem("jobs"));
  jobs[index].status = newStatus;
  localStorage.setItem("jobs", JSON.stringify(jobs));
  loadJobs();
}

function deleteJob(index) {
  let jobs = JSON.parse(localStorage.getItem("jobs"));
  jobs.splice(index, 1);
  localStorage.setItem("jobs", JSON.stringify(jobs));
  loadJobs();
}
