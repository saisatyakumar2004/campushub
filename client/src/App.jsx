import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import HomePage from './HomePage';
import ResetPassword from './ResetPassword';
import ForgotPassword from './ForgotPassword'; 
import Login from './Login';
import LostFoundForm from './LostFoundForm';
import AdminDashboard from './AdminDashboard';
import Lost from './Lost'; 
import Result from './Result';
import Found from './Found'; 
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import FoundItemForm from './FoundItemForm';
import LostItemForm from './LostItemForm';
import HowItWorks from './HowItWorks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lostfound" element={<LostFoundForm />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/lost" element={<Lost />} />
        <Route path="/found" element={<Found />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/found/:itemId" element={<FoundItemForm />} />
        <Route path="/lost/:itemId" element={<LostItemForm />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/result" element={<Result />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
