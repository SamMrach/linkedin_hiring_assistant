import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { Route, Routes ,BrowserRouter,MemoryRouter as Router} from 'react-router-dom';
import { AddJob } from './pages/AddJob';
import ProfileResults from './pages/ProfileResults';
function App() {
  return (
     <div className="container">
 <Router>
       <Routes>
        <Route path="/" exact element={<Home/>} />
       <Route path="/add_job"  element={<AddJob/>} />
       <Route path="/profile_results"  element={<ProfileResults/>} />
       </Routes>
      </Router>
     </div>
     
     
       

  );
}

export default App;
