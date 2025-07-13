import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Container, Modal, Button, Card, Form } from "react-bootstrap";
import AppointmentFormModal from "./AppointmentModalForm";

const CalendarView = ({ handleLogout }) => {
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

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
    const date = dateObj.toISOString().split("T")[0];
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
      }
      return updatedState;
    });
  };

  const tileContent = ({ date, view }) => {
    const dateStr = date.toISOString().split("T")[0];
  
    if (appointments[dateStr]?.length > 0 && view === "month") {
      return (
        <div className="mb-0 mt-1 ps-1 pe-1">
          {appointments[dateStr].map((appt, idx) => (
            <p key={idx} style={{  fontSize: "0.7rem", color: "#007bff" }}>
              <strong>Doctor:</strong> {appt.doctor} <br />
              <strong>Patient:</strong> {appt.patient} <br />
              <strong>Time:</strong> {appt.time}
            </p>
          ))}
        </div>
      );
    }
  
    return null;
  };
  

  return (
    <Container
      className="d-flex justify-content-center align-items-center mt-5 mb-5"
      fluid
    >
      <Card className="p-4 shadow-lg calendar-card">
        {/* Dark Mode Toggle + Logout */}
        <div className="d-flex justify-content-between mb-2">
          <Form.Check
            type="switch"
            id="dark-mode-switch"
            label={darkMode ? "🌙 Dark Mode" : "🌞 Light Mode"}
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => setShowLogoutModal(true)}
          >
            Logout
          </button>
        </div>

        <h4 className="text-center mb-3 text-primary border-bottom pb-2">
          Appointments Calendar
        </h4>

        <Calendar
          onClickDay={handleDayClick}
          tileContent={tileContent}
          className="custom-calendar"
        />
      </Card>

      {/* Appointment Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {appointments[selectedDate]?.length > 0 && (
            <>
              <h6 className="text-muted">Existing Appointments:</h6>
              <ul className="list-group mb-3">
                {appointments[selectedDate].map((appt, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {appt.time} - {appt.patient}
                    </span>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        handleDeleteAppointment(selectedDate, index)
                      }
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          <AppointmentFormModal
            date={selectedDate}
            onSave={(data) => {
              saveAppointment(selectedDate, data);
              setShowModal(false);
            }}
          />
        </Modal.Body>
      </Modal>

      {/* Logout Confirmation Modal */}
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
    </Container>
  );
};

export default CalendarView;
