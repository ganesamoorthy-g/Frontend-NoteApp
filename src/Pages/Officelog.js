import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import officelogIcon from '../images/officelog.png';
import axios from 'axios';
import CustomNavbar from '../components/CustomNavbar';

const API_BASE_URL = 'https://backend-noteapp-m3mt.onrender.com'; // Change this to your actual base URL


const OfficeLog = ({ user }) => {
  const [officeLogForm, setOfficeLogForm] = useState({
    name: '',
    pendingInDays: '',
    date: new Date(),
    description: '',

  });
  const [message, setMessage] = useState('');

  const handleOfficeLogChange = (event) => {
    const { name, value } = event.target;
    setOfficeLogForm({ ...officeLogForm, [name]: value });
  };

  const handleDateChange = (date) => {
    setOfficeLogForm({ ...officeLogForm, date });
  };

  const validateForm = (form) => {
    return  form.name &&
    form.pendingInDays && 
    form.date && 
    form.description;
  };

  const handleOfficeLogSubmit = async (event) => {
    event.preventDefault();

    const userId = user ? user._id : null;

    const dataToSend = {
      ...officeLogForm,
      userId: userId,
    };

    if (validateForm(officeLogForm)) {
      try {
        const response = await axios.post(`${API_BASE_URL}/officelog/createOfficeLog`, dataToSend);

        if (response.status === 200) {
          setMessage('Office Log entry successfully added');
          setTimeout(() => {
            setMessage('');
          }, 3000);
        } else {
          setMessage('Something else went wrong');
        }
      } catch (err) {
        setMessage('Something went wrong');
      }
    } else {
      setMessage('Please fill in all required fields.');
    }

    setOfficeLogForm({
      name: '',
      pendingInDays: '',
      date: new Date(),
      description: '',
    });
  };

  return (
    <div className="officelog">
      <CustomNavbar />
      <div className="d-flex flex-column align-items-center">
        <h2 className="title text-center">Add Office Log Entry</h2>
        <form className="officelog-form d-flex flex-column" onSubmit={handleOfficeLogSubmit}>
          <div className="d-flex justify-content-center">
            <img alt="officelog" src={officelogIcon} className="note-form-icon" />
          </div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Task Name"
            value={officeLogForm.name}
            onChange={handleOfficeLogChange}
          />
          <label>PendingInDays:</label>
          <input
            type="number"
            name="pendingInDays"
            id="pendingInDays"
            placeholder="days"
            value={officeLogForm.pendingInDays}
            onChange={handleOfficeLogChange}
          />
        
        
          <label>Date:</label>
          <DatePicker
            selected={officeLogForm.date}
            onChange={handleDateChange}
            placeholderText="mm/dd/yyyy"
          />
          <label>Description:</label>
          <textarea
            name="description"
            id="description"
            placeholder="Additional details..."
            value={officeLogForm.description}
            onChange={handleOfficeLogChange}
          />
          <button
            className="submit-btn officelog-submit-btn"
            type="submit"
            disabled={!validateForm(officeLogForm)}
          >
            Add
          </button>
        </form>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default OfficeLog;
