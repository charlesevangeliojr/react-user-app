import React, { useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./logo.svg";

function App() {
  const [view, setView] = useState("landing");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ firstname: "", lastname: "", email: "", password: "" });
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(" https://realtor-automobile-farm-turkish.trycloudflare.com/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(loginData),
      });

      const result = await response.json();

      if (result.status === "success") {
        localStorage.setItem("user", JSON.stringify(result.user));
        setUser(result.user);
        setView("profile");
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Failed to connect to server");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://realtor-automobile-farm-turkish.trycloudflare.com/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(registerData),
      });

      const result = await response.json();
      alert(result.message);

      if (result.status === "success") {
        setView("login");
      }
    } catch (error) {
      alert("Failed to connect to server");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setView("landing");
  };

  // Animations
  const slideLeft = { initial: { x: "100vw", opacity: 0 }, in: { x: 0, opacity: 1 }, out: { x: "-100vw", opacity: 0 } };
  const slideUp = { initial: { y: "100vh", opacity: 0 }, in: { y: 0, opacity: 1 }, out: { y: "-100vh", opacity: 0 } };
  const transition = { type: "spring", stiffness: 70, damping: 20 };

  return (
    <div style={{ overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        {view === "landing" && (
          <motion.div
            key="landing"
            initial="initial"
            animate="in"
            exit="out"
            variants={slideLeft}
            transition={transition}
            className="hero-section text-center"
          >
            <Container>
              <img src={logo} alt="Logo" className="logo" />
              <h1 className="display-4 fw-bold">Welcome to UserManagerApp</h1>
              <p className="lead">Manage user accounts with ease.</p>
              <div className="mt-4">
                <Button variant="outline-light" size="lg" className="me-3" onClick={() => setView("login")}>
                  Login
                </Button>
                <Button variant="light" size="lg" onClick={() => setView("register")}>
                  Register
                </Button>
              </div>
            </Container>
          </motion.div>
        )}

        {view === "login" && (
          <motion.div
            key="login"
            initial="initial"
            animate="in"
            exit="out"
            variants={slideLeft}
            transition={transition}
            className="auth-section d-flex justify-content-center align-items-center"
          >
            <Card className="p-4 shadow-lg" style={{ width: "400px" }}>
              <Card.Body>
                <div className="text-center mb-3">
                  <img src={logo} alt="Logo" className="logo-sm" />
                </div>
                <h3 className="text-center mb-4">Login</h3>
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Login
                  </Button>
                </Form>
                <div className="text-center mt-3">
                  <Button variant="link" onClick={() => setView("register")}>Don't have an account? Register</Button>
                  <br />
                  <Button variant="link" onClick={() => setView("landing")}>Back to Home</Button>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        )}

        {view === "register" && (
          <motion.div
            key="register"
            initial="initial"
            animate="in"
            exit="out"
            variants={slideLeft}
            transition={transition}
            className="auth-section d-flex justify-content-center align-items-center"
          >
            <Card className="p-4 shadow-lg" style={{ width: "400px" }}>
              <Card.Body>
                <div className="text-center mb-3">
                  <img src={logo} alt="Logo" className="logo-sm" />
                </div>
                <h3 className="text-center mb-4">Register</h3>
                <Form onSubmit={handleRegister}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      value={registerData.firstname}
                      onChange={(e) => setRegisterData({ ...registerData, firstname: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      value={registerData.lastname}
                      onChange={(e) => setRegisterData({ ...registerData, lastname: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Button variant="success" type="submit" className="w-100">
                    Register
                  </Button>
                </Form>
                <div className="text-center mt-3">
                  <Button variant="link" onClick={() => setView("login")}>Already have an account? Login</Button>
                  <br />
                  <Button variant="link" onClick={() => setView("landing")}>Back to Home</Button>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        )}

        {view === "profile" && user && (
          <motion.div
            key="profile"
            initial="initial"
            animate="in"
            exit="out"
            variants={slideUp}
            transition={transition}
            className="profile-section text-center d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", backgroundColor: "#f0f8ff" }}
          >
            <div>
              <img src={logo} alt="Logo" className="logo-sm mb-4" />
              <h1>Hello, {user.firstname}!</h1>
              <p className="lead">You're logged in as <strong>{user.email}</strong></p>
              <Button variant="danger" size="lg" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
