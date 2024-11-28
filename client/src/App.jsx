import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './pages/SignupForm';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Default route for the signup form */}
          <Route path="/" element={<SignupForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
