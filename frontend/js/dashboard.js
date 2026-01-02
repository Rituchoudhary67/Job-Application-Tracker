const API_URL = 'http://localhost:3001/api';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'login.html';
}

const applicationsList = document.getElementById('applicationsList');
const applicationForm = document.getElementById('applicationForm');
const logoutBtn = document.getElementById('logoutBtn');

let editId = null;

// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});

// Fetch applications
async function fetchApplications() {
  const res = await fetch(`${API_URL}/applications`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();

  applicationsList.innerHTML = '';

  data.forEach(app => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${app.company}</strong> - ${app.role} (${app.status})
      <button onclick="editApplication(${app.id}, '${app.company}', '${app.role}', '${app.status}')">Edit</button>
      <button onclick="deleteApplication(${app.id})">Delete</button>
    `;
    applicationsList.appendChild(li);
  });
}

// Add / Update
applicationForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const company = document.getElementById('company').value;
  const role = document.getElementById('role').value;
  const status = document.getElementById('status').value;

  const url = editId
    ? `${API_URL}/applications/${editId}`
    : `${API_URL}/applications`;

  const method = editId ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ company, role, status })
  });

  if (res.ok) {
    applicationForm.reset();
    editId = null;
    fetchApplications();
  } else {
    alert('Operation failed');
  }
});

// Edit application
function editApplication(id, company, role, status) {
  document.getElementById('company').value = company;
  document.getElementById('role').value = role;
  document.getElementById('status').value = status;
  editId = id;
}

// Delete application
async function deleteApplication(id) {
  const res = await fetch(`${API_URL}/applications/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

  if (res.ok) fetchApplications();
  else alert('Delete failed');
}

// Initial load
fetchApplications();
