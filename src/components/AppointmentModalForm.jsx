import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const patients = ["Raja Shekar", "Swathi", "Karthikeyan", "Vijay"];
const doctors = ["Francis", "Benjamin", "Manikandan", "Venkatesh"];

const AppointmentFormModal = ({ onSave, date }) => {
  const [patient, setPatient] = useState(patients[0]);
  const [doctor, setDoctor] = useState(doctors[0]);
  const [time, setTime] = useState("");

  const handleSubmit = () => {
    onSave({ patient, doctor, time });
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control type="text" value={date} disabled />
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>Patient</Form.Label>
        <Form.Select
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
        >
          {patients.map((p, i) => (
            <option key={i}>{p}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>Doctor</Form.Label>
        <Form.Select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
          {doctors.map((d, i) => (
            <option key={i}>{d}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>Time</Form.Label>
        <Form.Control
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </Form.Group>
      <div className="d-flex justify-content-end mt-3">
        <Button onClick={handleSubmit}>Save Appointment</Button>
      </div>
    </Form>
  );
};

export default AppointmentFormModal;
