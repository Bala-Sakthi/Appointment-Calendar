import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Container,
  Modal,
  Button,
  Card,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import AppointmentFormModal from "./AppointmentModalForm";
import { ToastContainer, toast } from "react-toastify";

const CalendarView = ({ handleLogout }) => {
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedDate, setSelectedDate] = useState(() => {
    const savedDate = localStorage.getItem("selectedDate");
    return savedDate || null;
  });

  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    if (selectedDate) {
      localStorage.setItem("selectedDate", selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    return () => {
      document.body.classList.remove("dark-mode");
    };
  }, [darkMode]);

  const handleDayClick = (dateObj) => {
    const date = dateObj.toLocaleDateString("en-CA");

    if (appointments[date]?.length > 0) {
      toast.info(
        `This date already has ${appointments[date].length} appointment(s).`
      );
      return;
    }

    setSelectedDate(date);
    setShowModal(true);
  };

  const saveAppointment = (date, data) => {
    setAppointments((prev) => ({
      ...prev,
      [date]: [...(prev[date] || []), data],
    }));
  };

  const handleDeleteAppointment = (date, indexToRemove) => {
    setAppointments((prev) => {
      const updatedAppointments = [...prev[date]];
      updatedAppointments.splice(indexToRemove, 1);
      const updatedState = { ...prev, [date]: updatedAppointments };
      if (updatedAppointments.length === 0) {
        delete updatedState[date];
        if (selectedDate === date) {
          setSelectedDate(null);
          localStorage.removeItem("selectedDate");
        }
      }
      return updatedState;
    });
  };

  return (
    <Container
      className="py-4"
      fluid
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        transition: "background-color 0.3s ease",
      }}
    >
      <ToastContainer />
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="p-3 shadow calendar-card w-100">
            <div className="d-flex justify-content-between mb-3 align-items-center flex-wrap gap-2">
              <Form.Check
                type="switch"
                id="dark-mode-switch"
                label={darkMode ? "🌙 Dark Mode" : "🌞 Light Mode"}
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => setShowLogoutModal(true)}
              >
                Logout
              </Button>
            </div>

            <h4 className="text-center mb-3 text-primary border-bottom pb-2">
              Appointments Calendar
            </h4>

            <Calendar
              onClickDay={handleDayClick}
              className="w-100"
              tileClassName={({ date }) => {
                const dateString = date.toLocaleDateString("en-CA");
                return appointments[dateString]?.length > 0
                  ? "has-appointment"
                  : null;
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Appointment Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AppointmentFormModal
            date={selectedDate}
            onSave={(data) => {
              saveAppointment(selectedDate, data);
              setShowModal(false);
            }}
          />
        </Modal.Body>
      </Modal>

      {/* Logout Modal */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Display Appointments */}
      <Container className="mt-4">
        <Row className="justify-content-center">
          {Object.entries(appointments).map(
            ([date, appts]) =>
              appts.length > 0 &&
              appts.map((appt, index) => (
                <Col
                  key={`${date}-${index}`}
                  xs={12}
                  md={6}
                  lg={5}
                  className="d-flex justify-content-center mb-4"
                >
                  <Card
                    className="p-3 shadow w-100"
                    style={{
                      borderLeft: "6px solid #007bff",
                      backgroundColor: darkMode ? "#2c2c2c" : "#ffffff",
                      color: darkMode ? "#eaeaea" : "#000000",
                    }}
                  >
                    <Card.Body className="d-flex flex-column h-100">
                      <h5 className="text-center text-primary mb-3">
                        📅 {date}
                      </h5>
                      <Card.Title className="mb-2">
                        🩺 <strong>Doctor:</strong> {appt.doctor}
                      </Card.Title>
                      <Card.Text className="flex-grow-1">
                        👤 <strong>Patient:</strong> {appt.patient}
                        <br />⏰ <strong>Time:</strong> {appt.time}
                      </Card.Text>
                      <div className="text-end mt-3">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteAppointment(date, index)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
          )}
        </Row>
      </Container>
    </Container>
  );
};

export default CalendarView;
