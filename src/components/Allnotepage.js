import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from './CustomNavbar';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import activityIcon from '../images/activity.png';
import expenseIcon from '../images/expense.png';
import officelogIcon from '../images/officelog.png';
import act1 from '../images/act1.jpg';
import act2 from '../images/act2.jpg';
import act3 from '../images/act3.jpg'

const images = [
 act1,
  act2,
  act3

];

function Allnotepage({ user }) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="allnote-page">
        <CustomNavbar />
        <div className="note d-flex flex-column align-items-center">
          <h2 className='title'>Add Note</h2>
          <Carousel showArrows={true} showThumbs={false} dynamicHeight={true} selectedItem={selectedImage} onChange={(index) => setSelectedImage(index)}>
            {images.map((URL, index) => (
              <div key={index}>
                <img className="carousel-image" alt={`carousel-image-${index}`} src={URL} />
              </div>
            ))}
          </Carousel>
          <div className="d-flex justify-content-center">
            <div className="mx-3">
              <button className='activity-btn d-flex flex-column align-items-center justify-content-center' onClick={() => navigate("/note/activity")}>
                <img alt="activity" src={activityIcon} className="note-icon" />
                Activity
              </button>
            </div>
            <div className="mx-3">
              <button className='expense-btn d-flex flex-column align-items-center justify-content-center' onClick={() => navigate("/note/expense")}>
                <img alt="cardio" src={expenseIcon} className="note-icon" />
                Expense
              </button>
            </div>
            <div className="mx-3">
              <button className='officelog-btn d-flex flex-column align-items-center justify-content-center' onClick={() => navigate("/note/officelog")}>
                <img alt="officelog" src={officelogIcon} className="note-icon" />
                OfficeLog
              </button>
            </div>
          </div>
          <h2 className='welcome'>Welcome, {user && user.username}!</h2>
        </div>
      </div>
    </div>
  );
}

export default Allnotepage;
