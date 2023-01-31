import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Controllers } from './components/Controllers.js';
import { NavBar } from './components/NavBar.js';
import { isConnected, selectIsConnected } from './features/RobotSlice.js';
import { Modes } from './components/Modes.js';

import './App.css';
import { MessagesStack } from './components/MessagesStack.js';
// import { Gamepad } from './components/Gamepad.js';

// Per poter utilizzare il Joystick scommentare il componente Gamepad e le 
// parti di codice presenti nei componenti MovementController e InclinationController
function App() {
  const dispatch = useDispatch()
  const connected = useSelector(selectIsConnected)

  // Verifica ogni 1000ms se il server è connesso al cane
  useEffect(() => {
      const intervalID = setInterval(async () => {
        dispatch(isConnected())
    }, 1000)
    return () => clearInterval(intervalID)
  })
  
  return (
    <div className="App">
      <NavBar />
      <div className="main">
        <Modes />
        <Controllers />
        <div className={`info ${connected ? "green" : "red"}`}>
          {connected ? "Robot connesso" : "Robot non connesso"}
        </div>
        {/* <Gamepad /> */}
        <MessagesStack />
      </div>
    </div>
  );
}
export default App;