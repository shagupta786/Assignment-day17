// REGISTER
if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let exists = users.find(user => user.email === email);

    if (exists) {
      document.getElementById("regMsg").innerText = "Email already registered!";
    } else {
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      document.getElementById("regMsg").innerText = "Registered successfully!";
      document.getElementById("registerForm").reset();
    }
  });
}

// LOGIN
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
      sessionStorage.setItem("currentUser", validUser.name);
      window.location.href = "welcome.html";
    } else {
      document.getElementById("loginMsg").innerText = "Invalid credentials!";
    }
  });
}

// WELCOME
if (window.location.pathname.includes("welcome.html")) {
  let name = sessionStorage.getItem("currentUser");
  if (name) {
    document.getElementById("welcomeMsg").innerText = `Welcome, ${name}`;
  } else {
    // block unauthorized access
    window.location.href = "login.html";
  }

  document.getElementById("logoutBtn").addEventListener("click", function() {
    sessionStorage.clear();
    window.location.href = "login.html";
  });
}