import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import activityIcon from '../images/activity.png';
import axios from 'axios';
import CustomNavbar from '../components/CustomNavbar';

const API_BASE_URL = 'https://backend-noteapp-m3mt.onrender.com'; // Change this to your actual base URL


const Activity = ({ user }) => {
  const [activityForm, setActivityForm] = useState({  
    name: '',
    completedInMinutes: '',
    date: new Date(),
    description: '',
  });
  const [message, setMessage] = useState('');

  const handleActivityChange = (event) => {
    const { name, value } = event.target;
    setActivityForm({ ...activityForm, [name]: value });
  };

  const handleDateChange = (date) => {
    setActivityForm({ ...activityForm, date });
  };

  const validateForm = (form) => {
    return form.name &&
      form.completedInMinutes && 
      form.date &&
      form.description;
  
  };

  const handleActivitySubmit = async (event) => {
    event.preventDefault();

    const userId = user ? user._id : null;

    const dataToSend = {
      ...activityForm,
      userId: userId,
    };

    if (validateForm(activityForm)) {
      try {
        const response = await axios.post(`${API_BASE_URL}/activity/createActivity`, dataToSend);

        if (response.status === 200) {
          setMessage('Activity successfully added');
          setTimeout(() => {
            setMessage('');
          }, 3000);
        } else {
          setMessage('Unexpected response from the server');
        }
      } catch (err) {
        console.error('Error adding activity:', err);
        setMessage('Something went wrong. Please try again.');
      }
    } else {
      setMessage('Please fill in all required fields.');
    }

    setActivityForm({
      name: '',
      completedInMinutes: '',
      date: new Date(),
      description: '',
    });
  };

  return (
    <div className="activity">
      <CustomNavbar />
      <div className="d-flex flex-column align-items-center">
        <h2 className="title text-center">Add Activity</h2>
        <form className="activity-form d-flex flex-column" onSubmit={handleActivitySubmit}>
          <div className="d-flex justify-content-center">
            <img alt="activity" src={activityIcon} className="note-form-icon" />
          </div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="activity"
            value={activityForm.name}
            onChange={handleActivityChange}
          />
          <label>CompletedInMinutes:</label>
          <input
            type="number"
            name="completedInMinutes" 
            id="completedInMinutes"
            placeholder="Minutes"
            value={activityForm.completedInMinutes}
            onChange={handleActivityChange}
          />
          <label>Date:</label>
          <DatePicker
            selected={activityForm.date}
            onChange={handleDateChange}
            placeholderText="mm/dd/yyyy"
          />
          <label>description:</label>
          <textarea
            name="description"
            id="description"
            placeholder="Additional details..."
            value={activityForm.description}
            onChange={handleActivityChange}
          />
          <button
            className="submit-btn activity-submit-btn"
            type="submit"
            disabled={!validateForm(activityForm)}
          >
            Add
          </button>
        </form>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Activity;
