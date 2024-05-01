import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './components/HomePage';
import { useState } from 'react';
function App() {
  const [log,setlog]=useState(0);
  console.log(log);
  return (
    <div className="App">
      <HomePage log={log} setlog={setlog}/>
    </div>
  );
}

export default App;
