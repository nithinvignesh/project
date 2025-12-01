import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Image, Navbar, Nav } from 'react-bootstrap';
import { message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import photo1 from '../../images/photo1.png';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8001/api/user/login", user);
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userData', JSON.stringify(res.data.userData));
        message.success('Login successfully');
        const { type } = JSON.parse(localStorage.getItem("userData"));

        switch (type) {
          case "admin":
            navigate("/adminHome");
            break;
          case "user":
            navigate("/userhome");
            break;
          default:
            navigate("/login");
            break;
        }
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  // Background image URL from Yahoo link
  const backgroundUrl = "https://static.vecteezy.com/system/resources/previews/023/460/068/large_2x/medical-doctor-background-illustration-ai-generative-free-photo.jpg";

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" className="bg-light mb-5">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="text-decoration-none text-dark">MediCareBook</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Background + Login Card */}
      <div
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card className="shadow-lg w-100" style={{ maxWidth: '900px', borderRadius: '15px', backgroundColor: 'rgba(255,255,255,0.9)' }}>
          <Row className="g-0">
            {/* Left Image */}
            <Col md={6} className="d-none d-md-block">
              <Image src={photo1} alt="Login" className="h-100 w-100 rounded-start" style={{ objectFit: 'cover' }} />
            </Col>

            {/* Right Form */}
            <Col md={6} className="p-5">
              <h2 className="fw-bold mb-4 text-center">Sign in to your account</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </Form.Group>

                <div className="d-grid mb-3">
                  <Button type="submit" variant="dark" size="lg">Login</Button>
                </div>

                <p className="text-center text-muted">
                  Don't have an account? <Link to="/register" className="text-decoration-none">Register here</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default Login;
