import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';

const UserAppointments = () => {
  const [userid, setUserId] = useState(null);
  const [type, setType] = useState(false);
  const [userAppointments, setUserAppointments] = useState([]);
  const [doctorAppointments, setDoctorAppointments] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      const { _id, isdoctor } = user;
      setUserId(_id);
      setType(isdoctor);

      if (isdoctor) {
        getDoctorAppointment(_id);
      } else {
        getUserAppointment(_id);
      }
    } else {
      alert('No user to show');
    }
  }, []);

  const getUserAppointment = async (uid) => {
    try {
      const res = await axios.get('https://docspot-deployment.onrender.com/api/user/getuserappointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          userId: uid,
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        setUserAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const getDoctorAppointment = async (uid) => {
    try {
      const res = await axios.get('https://docspot-deployment.onrender.com/api/doctor/getdoctorappointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          userId: uid,
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        setDoctorAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const handleStatus = async (uid, appointmentId, status) => {
    try {
      const res = await axios.post('https://docspot-deployment.onrender.com/api/doctor/handlestatus', {
        userid: uid,
        appointmentId,
        status,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        message.success(res.data.message);
        getDoctorAppointment(uid);
        getUserAppointment(uid);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const handleDownload = async (url, appointId) => {
    try {
      const res = await axios.get('https://docspot-deployment.onrender.com/api/doctor/getdocumentdownload', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        params: { appointId },
        responseType: 'blob'
      });

      if (res.data) {
        const fileUrl = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
        const downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);
        downloadLink.setAttribute("href", fileUrl);
        const fileName = url.split("/").pop();
        downloadLink.setAttribute("download", fileName);
        downloadLink.style.display = "none";
        downloadLink.click();
      } else {
        message.error('No file found');
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  return (
    <div>
      <h2 className='p-3 text-center'>All Appointments</h2>
      <Container>
        {type === true ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date of Appointment</th>
                <th>Phone</th>
                <th>Document</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctorAppointments.length > 0 ? (
                doctorAppointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.userInfo?.fullName}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.userInfo?.phone}</td>
                    <td>
                      {appointment.document ? (
                        <Button variant='link' onClick={() => handleDownload(appointment.document.path, appointment._id)}>
                          {appointment.document.filename}
                        </Button>
                      ) : (
                        <span>No document</span>
                      )}
                    </td>
                    <td>{appointment.status}</td>
                    <td>
                      {appointment.status === 'approved' ? null : (
                        <Button onClick={() => handleStatus(appointment.userInfo?._id, appointment._id, 'approved')}>
                          Approve
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <Alert variant="info">
                      <Alert.Heading>No Appointments to show</Alert.Heading>
                    </Alert>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Date of Appointment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userAppointments.length > 0 ? (
                userAppointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.docName}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>
                    <Alert variant="info">
                      <Alert.Heading>No Appointments to show</Alert.Heading>
                    </Alert>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default UserAppointments;
