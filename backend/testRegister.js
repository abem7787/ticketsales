import fetch from 'node-fetch';

const url = 'http://localhost:5000/api/auth/register';

const data = {
  name: 'Abe',
  email: 'abe@example.com',
  password: 'password123'
};

async function registerUser() {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log('Response from server:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

registerUser();
