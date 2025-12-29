const API_URL = 'http://localhost:30001/api';
const token = localStorage.getItem('token');

if(!token) {
    window.location.href = 'login.html';
}

const applicationsList = document.getElementById('applicationsList');
const applicationForm = document.getElementById('applicationForm');
const logoutBtn = document.getElementById('logoutBtn');

//logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});

//fetch application
async function fetchApplications() {
    try {
        const res = await fetch(`${API_URL}/applications`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();
        applicationsList.innerHTML = '';

        data.forEach(app => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${app.company}</strong> - ${app.role} (${app.status})
                <button onclick="deleteApplication(${app.id})">Delete</button>
            `;
            applicationsList.appendChild(li);
        });
    } catch (error) {
        console.error(error);
    }
}

//add application

applicationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const company = document.getElementById('company').ariaValueMax;
    const role = document.getElementById('role').value;
    const status = document.getElementById('status').value;

    try {
        const res = await fetch(`${API_URL}/applications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Beare ${token}`
            },
            body: JSON.stringify({company, role, status})
        });

        if(res.ok) {
            applicationForm.reset();
            fetchApplications();
        } else {
            alert('Failed to add application');
        }
    } catch (error) {
        console.error(error);
    }
});

//delete application
async function deleteApplication(id) {
    try {
        const res = await fetch(`${API_URL}/application/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if(res.ok) {
            fetchApplications();
        } else {
            alert('Failed to delete');
        }
    } catch (error) {
        console.error(error);
    }
}

//initial load
fetchApplications();
