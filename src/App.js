import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './components/users/users';

function App() {
  const [items, setItems] = useState([]);

  useEffect(()=>{
    setItems(["Apple", "Banana", "Grapes"])
  },[])

  return (
    <div><h1>Hello first App</h1>
    <Users items={items}/>
    </div>
  );
}

export default App;

