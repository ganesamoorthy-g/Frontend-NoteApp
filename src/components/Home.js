import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";


function Home() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <div>
        <h1 className="head-title">
          <i className="fa-sharp fa-solid fa-heart-circle-bolt"></i>Note App
        </h1>
      </div>
      <Container className="home d-flex flex-column align-items-center justify-content-center flex-wrap text-center">
        <h1 className="home-title">
          Your Daily Note Work<br />Partner
        </h1>
        <p className="home-text">
          Activity? Expense? OfficeLog?<br />Track your daily notes and stay with us.
        </p>
        <button className="home-btn" onClick={() => navigate("/login")}>
          Get started
        </button>
      </Container>
    </div>
  );
}

export default Home;
