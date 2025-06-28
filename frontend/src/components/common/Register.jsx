import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { message } from 'antd';
import p2 from '../../images/p222.png';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
} from 'mdb-react-ui-kit';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: '', email: '', password: '', phone: '', type: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://docspot-deployment.onrender.com/api/user/register', user);
      if (res.data.success) {
        message.success('Registered Successfully');
        navigate('/login');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>
            <Link className='head' to={'/'}>BookaDoc</Link>
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
                  <h2 style={{ color: '#2e7d32', fontWeight: 'bold' }}>Sign up to your account</h2>
                </div>

                <Form onSubmit={handleSubmit}>
                  <label className="form-label" htmlFor="fullName" style={{ color: '#2e7d32' }}>Full Name</label>
                  <MDBInput
                    name="fullName"
                    value={user.fullName}
                    onChange={handleChange}
                    id="fullName"
                    type="text"
                    size="md"
                    style={{
                      marginBottom: '15px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '8px',
                      border: '1px solid #c8e6c9'
                    }}
                  />

                  <label className="form-label" htmlFor="email" style={{ color: '#2e7d32' }}>Email</label>
                  <MDBInput
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    id="email"
                    type="email"
                    size="md"
                    style={{
                      marginBottom: '15px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '8px',
                      border: '1px solid #c8e6c9'
                    }}
                  />

                  <label className="form-label" htmlFor="password" style={{ color: '#2e7d32' }}>Password</label>
                  <MDBInput
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    id="password"
                    type="password"
                    size="md"
                    style={{
                      marginBottom: '15px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '8px',
                      border: '1px solid #c8e6c9'
                    }}
                  />

                  <label className="form-label" htmlFor="phone" style={{ color: '#2e7d32' }}>Phone</label>
                  <MDBInput
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    id="phone"
                    type="text"
                    size="md"
                    style={{
                      marginBottom: '20px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '8px',
                      border: '1px solid #c8e6c9'
                    }}
                  />

                  <Container className='mb-4'>
                    <MDBRadio
                      name='type'
                      id='admin'
                      checked={user.type === 'admin'}
                      value='admin'
                      onChange={handleChange}
                      label='Admin'
                      inline
                    />
                    <MDBRadio
                      name='type'
                      id='user'
                      checked={user.type === 'user'}
                      value='user'
                      onChange={handleChange}
                      label='User'
                      inline
                    />
                  </Container>

                  <Button
                    className="mb-3 px-5"
                    size='lg'
                    type="submit"
                    style={{
                      backgroundColor: '#66bb6a',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '500'
                    }}
                  >
                    Register
                  </Button>
                </Form>

                <p className="mb-4" style={{ color: '#393f81' }}>
                  Have an account?{' '}
                  <Link to={'/login'} style={{ color: '#2e7d32' }}>Login here</Link>
                </p>
              </MDBCardBody>
            </MDBCol>

            <MDBCol md='6'>
              <MDBCardImage
                src={p2}
                alt="register form"
                className='rounded-start w-100'
                style={{
                  borderRadius: '10px',
                  mixBlendMode: 'darken',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
}

export default Register;
