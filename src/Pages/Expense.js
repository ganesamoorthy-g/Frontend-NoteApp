import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import expenseIcon from '../images/expense.png';
import axios from 'axios';
import CustomNavbar from '../components/CustomNavbar';

const API_BASE_URL = 'https://backend-noteapp-m3mt.onrender.com'; // Change this to your actual base URL


const Expense = ({ user }) => {
  const [expenseForm, setExpenseForm] = useState({
    name: '',
    amount: '',
    date: new Date(),
    description: '',
  });
  const [message, setMessage] = useState('');

  const handleExpenseChange = (event) => {
    const { name, value } = event.target;
    setExpenseForm({ ...expenseForm, [name]: value });
  };

  const handleDateChange = (date) => {
    setExpenseForm({ ...expenseForm, date });
  };

  const validateForm = (form) => {
    return form.name && 
     form.amount && 
     form.date && 
     form.description;
  };

  const handleExpenseSubmit = async (event) => {
    event.preventDefault();

    const userId = user ? user._id : null;

    const dataToSend = {
      ...expenseForm,
      userId: userId,
    };

    if (validateForm(expenseForm)) {
      try {
        const response = await axios.post(`${API_BASE_URL}/expense/createExpense`, dataToSend);

        if (response.status === 200) {
          setMessage('Expense successfully added');
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

    setExpenseForm({
      name: '',
      amount: '',
      date: new Date(),
      description: '',
    });
  };

  return (
    <div className="expense">
      <CustomNavbar />
      <div className="d-flex flex-column align-items-center">
        <h2 className="title text-center">Add Expense</h2>
        <form className="expense-form d-flex flex-column" onSubmit={handleExpenseSubmit}>
          <div className="d-flex justify-content-center">
            <img alt="expense" src={expenseIcon} className="note-form-icon" />
          </div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Groceries"
            value={expenseForm.name}
            onChange={handleExpenseChange}
          />
       
         
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Rs"
            value={expenseForm.amount}
            onChange={handleExpenseChange}
          />
          <label>Date:</label>
          <DatePicker
            selected={expenseForm.date}
            onChange={handleDateChange}
            placeholderText="mm/dd/yyyy"
          />
          <label>Description:</label>
          <textarea
            name="description"
            id="description"
            placeholder="Additional details..."
            value={expenseForm.description}
            onChange={handleExpenseChange}
          />
          <button
            className="submit-btn expense-submit-btn"
            type="submit"
            disabled={!validateForm(expenseForm)}
          >
            Add
          </button>
        </form>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Expense;
