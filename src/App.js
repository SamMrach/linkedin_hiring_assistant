import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { Route, Routes ,BrowserRouter,MemoryRouter as Router} from 'react-router-dom';
import { AddJob } from './pages/AddJob';
function App() {
  return (
     <div className="container">
 <Router>
       <Routes>
        <Route path="/" exact element={<Home/>} />
       <Route path="/add_job"  element={<AddJob/>} />
       </Routes>
      </Router>
     </div>
     
     
       

  );
}

export default App;
