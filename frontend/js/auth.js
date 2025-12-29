const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loignForm');

const API_URL = 'http://localhost:3001/api';

//signup
if(signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').ariaValueMax;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, email, password})
            });
            const data = await res.json();
            if(res.ok) {
                alert('Signup successful! Please login.');
                window.location.href = '../html/login.html';
            } else {
                alert(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error(error);
            alert('Error connecting to server');
        }
    });
}

//login
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });
            const data = await res.json();
            if(res.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = 'index.html';
            } else {
                alert(data.message || 'Login Failed');
            }
        } catch (error) {
            console.error(error);
            alert('Error connecting to server');
        }
    });
}

