import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomNavbar from '../components/CustomNavbar';
import axios from 'axios';
import activityIcon from '../images/activity.png';
import expenseIcon from '../images/expense.png';
import officelogIcon from '../images/officelog.png';
import Footer from './Footer';

const API_BASE_URL = 'https://backend-noteapp-m3mt.onrender.com'; // Change this to your actual base URL


export default function History({ user }) {
  const userId = user._id;

  const [noteData, setNoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedItems, setDisplayedItems] = useState(10);

  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        const activityResponse = await axios.get(`${API_BASE_URL}/activity/getActivity/${userId}`);
        console.log('Activity Note Data:', activityResponse.data);

        const officelogResponse = await axios.get(`${API_BASE_URL}/officelog/getOfficeLog/${userId}`);
        console.log('Officelog Note Data:', officelogResponse.data);

        const expenseResponse = await axios.get(`${API_BASE_URL}/expense/getExpense/${userId}`);
        console.log('Expense Note Data:', expenseResponse.data);

        const combinedNoteData = [
          ...(activityResponse.data || []),
          ...(Array.isArray(officelogResponse.data) ? officelogResponse.data : [officelogResponse.data]),
          ...(Array.isArray(expenseResponse.data) ? expenseResponse.data : [expenseResponse.data]),
        ];

       
       

        setNoteData(combinedNoteData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching exercise data:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchNoteData();
  }, [userId]);

  function showMoreItems() {
    setDisplayedItems(displayedItems + 10);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="history">
      <div className="history-page">
        <CustomNavbar style={{ color: 'blue' }} />

        <div className="d-flex flex-column align-items-center">
          <h2 className="title">History</h2>
          {noteData.length ? (
            <div className="history-data">
              {noteData.slice(0, displayedItems).map((note) => {
                let dateToDisplay = note.date;
                return (
                  <div className="history-div d-flex" key={note._id}>
                    <div className="date d-flex align-items-center">{dateToDisplay}</div>
                    <Link className="text-decoration-none" to={`/history/${note.type}/${note._id}`}>
                      {note.type === 'expense' ? (
                        <div className="history-card expense-title d-flex">
                          <div className="d-flex align-items-center">
                            <img alt="expense" src={expenseIcon} className="history-icon" />
                          </div>
                          <div>
                            <p className="history-name">{note.name }</p>
                            <p className="history-index">{note.amount }Rs</p>
                            <p className="history-index">{note.description }</p>
                          </div>
                        </div>
                      ) : note.type === 'officelog' ? (
                        <div className="history-card officelog-title d-flex">
                          <div className="d-flex align-items-center">
                            <img alt="officelog" src={officelogIcon} className="history-icon" />
                          </div>
                          <div>
                            <p className="history-name">{note.name }</p>
                            <p className="history-index">{note.pendingInDays} Days</p>
                            <p className="history-index">{note.description }</p>
                          </div>
                        </div>
                      ) : note.type === 'activity' ? (
                        <div className="history-card activity-title d-flex">
                          <div className="d-flex align-items-center">
                            <img alt="activity" src={activityIcon} className="history-icon" />
                          </div>
                          <div>
                            <p className="history-name">{note.name }</p>
                            <p className="history-index">{note.completedInMinutes} Minutes</p>
                            <p className="history-index">{note.description }</p>
                          </div>
                        </div>
                      




                      ) : null}
                    </Link>
                  </div>
                );
              })}
              {noteData.length > displayedItems ? (
                <div className="d-flex justify-content-center">
                  <button className="show-btn" onClick={showMoreItems}>
                    Show More
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              <h3 className="history-text">No Note data yet...</h3>
              <Link to="/allnotepage">
                <button className="home-btn">Add Note</button>
              </Link>
            </div>
          )}
          <Footer />
        </div>
      </div>
    </div>
  );
}
