import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{
      backgroundImage: "url('/campu1s3.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <header className="bg-white shadow-sm py-3">
        <div className="container d-flex justify-content-between align-items-center flex-wrap">
          <div className="d-flex align-items-center flex-wrap">
            <img 
              src="/campus.png" 
              alt="Campus Hub Logo" 
              style={{ height: '60px', marginRight: '16px' }} 
            />
            <div>
              <strong className="text-primary" style={{ fontSize: '32px' }}>Campus Hub</strong>
              <div style={{ fontStyle: 'italic', fontSize: '16px', color: '#6c757d' }}>
                Locate · Connect · Recover
              </div>
            </div>
          </div>
          <div className="d-flex mt-3 mt-md-0">
            <Link to="/signup" className="btn btn-outline-primary me-2">Admin Signup</Link>
            <Link to="/login" className="btn btn-primary me-2">Admin Login</Link>
            <Link to="/contactus" className="btn btn-danger">Contact Us</Link>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="container d-flex flex-column align-items-center justify-content-center text-center flex-grow-1 py-5">
        <h2 className="text-primary fw-bold">Welcome to Campus Hub!</h2>

        <div className="row row-cols-1 row-cols-md-3 g-4 w-100 px-3 px-md-5 mt-4">
          <div className="col">
            <Link to="/lostfound" className="card bg-primary text-white text-center p-4 shadow-lg hover-effect">
              <h5>Lost/Found Item Report</h5>
            </Link>
          </div>
          <div className="col">
            <Link to="/found" className="card bg-success text-white text-center p-4 shadow-lg hover-effect">
              <h5>Found Items</h5>
            </Link>
          </div>
          <div className="col">
            <Link to="/lost" className="card bg-warning text-white text-center p-4 shadow-lg hover-effect">
              <h5>Lost Items</h5>
            </Link>
          </div>
          <div className="col">
            <Link to="/result" className="card bg-purple text-white text-center p-4 shadow-lg hover-effect">
              <h5>Approved Items</h5>
            </Link>
          </div>
          <div className="col">
            <Link to="/aboutus" className="card bg-secondary text-white text-center p-4 shadow-lg hover-effect">
              <h5>About Us</h5>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-light py-3 text-center">
        <small>
          <a href="#" className="me-2">Privacy Policy</a>•<a href="#" className="ms-2">Terms of Service</a>
        </small>
      </footer>

      {/* Styles */}
      <style>
        {`
          .hover-effect {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-radius: 12px;
          }
          .hover-effect:hover {
            transform: translateY(-5px);
            box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.25);
          }
          .bg-purple {
            background-color: #6f42c1 !important;
          }
          a {
            text-decoration: none !important;
          }
        `}
      </style>
    </div>
  );
}

export default HomePage;
