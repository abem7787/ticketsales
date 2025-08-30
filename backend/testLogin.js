import fetch from "node-fetch";

const loginUser = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "abe@example.com",
        password: "password123"
      })
    });

    const data = await response.json();
    console.log("Response from server:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

loginUser();
