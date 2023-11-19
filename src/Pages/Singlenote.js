import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomNavbar from '../components/CustomNavbar';
import activityIcon from '../images/activity.png';
import expenseIcon from '../images/expense.png';
import officelogIcon from '../images/officelog.png';
import axios from 'axios';

const API_BASE_URL = 'https://backend-noteapp-m3mt.onrender.com'; // Change this to your actual base URL


function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function SingleNote({ user }) {
  const { id, type } = useParams();
  const [noteData, setNoteData] = useState({});
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    name: '',
    completedInMinutes:'',
    amount: '',
    description:'',
    pendingInDays:'',
   
  });

  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        const userResponse = await axios.get(`${API_BASE_URL}/users/userId`);
        const userData = userResponse.data.data;

        if (userData.length > 0) {
          const fetchedUserId = user._id;

          const apiEndpoint =
            type === 'activity'
              ? `${API_BASE_URL}/activity/getActivity/${fetchedUserId}`
              : type === 'expense'
                ? `${API_BASE_URL}/expense/getExpense/${fetchedUserId}`
                : type === 'officelog'
                  ? `${API_BASE_URL}/officelog/getOfficeLog/${fetchedUserId}`
                  : null;

          if (apiEndpoint) {
            const noteResponse = await axios.get(apiEndpoint);
            const noteData = noteResponse.data;

            if (noteData.length > 0) {
              const targetNote = noteData.find((note) => note._id === id);

              if (targetNote) {
                setNoteData(targetNote);

                setEditedNote({
                  name: targetNote.name,
                  completedInMinutes: targetNote.completedInMinutes || '',
                  amount: targetNote.amount || '',
                  description: targetNote.description || '',
                  pendingInDays: targetNote.pendingInDays || '',
                });
              }
            }
          }
        } else {
          console.error('No user data found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchNoteData(); // Call the fetchNoteData function
  }, [type, id, user._id]);

  const handleDeleteNote = async () => {
    try {
      const apiEndpoint =
        type === 'activity'
          ? `${API_BASE_URL}/activity/deleteActivity/${id}`
          : type === 'expense'
            ? `${API_BASE_URL}/expense/deleteExpense/${id}`
            : type === 'officelog'
              ? `${API_BASE_URL}/officelog/deleteOfficeLog/${id}`
              : null;

      if (apiEndpoint) {
        const response = await axios.delete(apiEndpoint);

        if (response.status === 200) {
          // console.log(`${type} note deleted successfully`);
          navigate('/history/:userId');
        } else {
          // console.error(`Failed to delete ${type} note`);
        }
      }
    } catch (error) {
      // console.error(`Error deleting ${type} note:`, error);
    }
  };

  const handleEditNote = () => {
    setIsEditing(true);
  };

  const handleSaveNote = async () => {
    try {
      const apiEndpoint =
        type === 'activity'
          ? `${API_BASE_URL}/activity/updateActivity/${id}`
          : type === 'expense'
            ? `${API_BASE_URL}/expense/updateExpense/${id}`
            : type === 'officelog'
              ? `${API_BASE_URL}/officelog/updateOfficeLog/${id}`
              : null;

      if (apiEndpoint) {
        const updatedNoteData = {
          ...noteData,
          name: editedNote.name,
          completedInMinutes: editedNote.completedInMinutes,
          amount: editedNote.amount,
          description: editedNote.description,
          pendingInDays: editedNote.pendingInDays,
       
        };

        await axios.patch(apiEndpoint, updatedNoteData);

        setNoteData(updatedNoteData);
        setIsEditing(false);
      }
    } catch (error) {
      // console.error(`Error updating ${type} note:`, error);
    }
  };

  return (
    <div className={type === 'activity' ? 'single-activity' : type === 'expense' ? 'single-expense' : 'single-officelog'}>
      <CustomNavbar />
      <h2 className="title text-center">Note Details</h2>
      <div className="single-note d-flex flex-column align-items-center text-center">

        {type === 'activity' && Object.keys(noteData).length > 0 && (
          <div className="activity-div">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  placeholder="Note name"
                  value={editedNote.name}
                  onChange={(e) => setEditedNote({ ...editedNote, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="completedInMinutes"
                  value={editedNote.completedInMinutes}
                  onChange={(e) => setEditedNote({ ...editedNote, completedInMinutes: e.target.value })}
                />
                <button className="save-btn" onClick={handleSaveNote}>
                  Save Note
                </button>
              </div>
            ) : (
              <div>
                <img alt="activity" src={activityIcon} className="note-form-icon" />
                <p>
                  <span>Date: </span> {formatDate(noteData.date)}
                </p>
                <p>
                  <span>Name: </span> {noteData.name}
                </p>
                <p>
                  <span>completedInMinutes: </span> {noteData.completedInMinutes} minutes
                </p>
               
                <button className="edit-btn" onClick={handleEditNote}>
                  Edit Note
                </button>
                <button className="delete-btn" onClick={handleDeleteNote}>
                  Delete Note
                </button>
              </div>
            )}
          </div>
        )}


        {type === 'expense' && Object.keys(noteData).length > 0 && (
          <div className="expense-div">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  placeholder="Note Name"
                  value={editedNote.name}
                  onChange={(e) => setEditedNote({ ...editedNote, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Rs"
                  value={editedNote.amount}
                  onChange={(e) => setEditedNote({ ...editedNote, amount: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="description"
                  value={editedNote.description}
                  onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })}
                />
                <button className="save-btn" onClick={handleSaveNote}>
                  Save Note
                </button>
              </div>
            ) : (
              <div>
                <img alt="expense" src={expenseIcon} className="note-form-icon" />
                <p>
                  <span>Date: </span> {formatDate(noteData.date)}
                </p>
                <p>
                  <span>Name: </span> {noteData.name}
                </p>
                <p>
                  <span>Amount: </span> {noteData.amount} Rs
                </p>
                <p>
                  <span>Discription: </span> {noteData.description} 
                </p>
                <button className="edit-btn" onClick={handleEditNote}>
                  Edit Note
                </button>
                <button className="delete-btn" onClick={handleDeleteNote}>
                  Delete Note
                </button>
              </div>
            )}
          </div>
        )}

        {type === 'officelog' && Object.keys(noteData).length > 0 && (
          <div className="officelog-div">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  placeholder="Note Name"
                  value={editedNote.name}
                  onChange={(e) => setEditedNote({ ...editedNote, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Days"
                  value={editedNote.pendingInDays}
                  onChange={(e) => setEditedNote({ ...editedNote, pendingInDays: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="description"
                  value={editedNote.description}
                  onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })}
                />
             
                <button className="save-btn" onClick={handleSaveNote}>
                  Save Note
                </button>
              </div>
            ) : (
              <div>
                <img alt="officelog" src={officelogIcon} className="note-form-icon" />
                <p>
                  <span>Date: </span> {formatDate(noteData.date)}
                </p>
                <p>
                  <span>Name: </span> {noteData.name}
                </p>
                <p>
                  <span>pendingInDays: </span> {noteData.pendingInDays} Days
                </p>
                <p>
                  <span>Description: </span> {noteData.description}
                </p>
              
                <button className="edit-btn" onClick={handleEditNote}>
                  Edit Note
                </button>
                <button className="delete-btn" onClick={handleDeleteNote}>
                  Delete Note
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
