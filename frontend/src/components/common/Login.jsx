import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { message } from 'antd';
import { Button, Form } from 'react-bootstrap';
import photo1 from '../../images/image2.png'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '', password: ''
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5002/api/user/login", user);
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userData', JSON.stringify(res.data.userData));
        message.success('Login successfully');
        const isLoggedIn = JSON.parse(localStorage.getItem("userData"));
        const { type } = isLoggedIn;

        switch (type) {
          case "admin":
            navigate("/adminHome");
            break;
          case "user":
            navigate("/userhome");
            break;
          default:
            navigate("/Login");
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

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>
            <Link  className='head' to={'/'}>BookaDoc</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll></Nav>
            <Nav>
              <Link className='li' to={'/'}>Home</Link>
              <Link className='li' to={'/login'}>Login</Link>
              <Link className='li' to={'/register'}>Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <MDBContainer className="my-5">
        <MDBCard style={{ border: 'none', borderRadius: '12px', overflow: 'hidden' }}>
          <MDBRow style={{
            background: 'linear-gradient(to right, #fce4ec, #e8f5e9)',
            padding: '2rem',
            borderRadius: '12px'
          }} className='g-0'>

            <MDBCol md='6'>
              <MDBCardImage
                src={photo1}
                alt="login form"
                className='rounded-start w-100'
                style={{ borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
            </MDBCol>

            <MDBCol md='6'>
              <MDBCardBody
                className='d-flex flex-column justify-content-center'
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  padding: '30px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  height: '100%',
                }}
              >
                <div className='mb-4'>
                  <h2 style={{ color: '#2e7d32', fontWeight: 'bold' }}>Sign in to your account</h2>
                </div>

                <Form onSubmit={handleSubmit}>
                  <label className="form-label" htmlFor="formControlLgEmail" style={{ color: '#2e7d32' }}>Email</label>
                  <MDBInput
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    id="formControlLgEmail"
                    type="email"
                    size="md"
                    autoComplete='off'
                    style={{
                      marginBottom: '15px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '8px',
                      border: '1px solid #c8e6c9'
                    }}
                  />

                  <label className="form-label" htmlFor="formControlLgPassword" style={{ color: '#2e7d32' }}>Password</label>
                  <MDBInput
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    id="formControlLgPassword"
                    type="password"
                    size="md"
                    autoComplete='off'
                    style={{
                      marginBottom: '20px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '8px',
                      border: '1px solid #c8e6c9'
                    }}
                  />

                  <Button
                    className="mb-4 px-5"
                    size='lg'
                    type='submit'
                    style={{
                      backgroundColor: '#66bb6a',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '500'
                    }}
                  >
                    Login
                  </Button>
                </Form>

                <p className="mb-3" style={{ color: '#393f81' }}>
                  Don't have an account?{' '}
                  <Link to={'/register'} style={{ color: '#2e7d32' }}>Register here</Link>
                </p>
              </MDBCardBody>
            </MDBCol>

          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default Login;
