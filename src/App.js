
import './App.css';
import React from 'react'
import { RouterProvider } from "react-router-dom";
import routes from './Routes'
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container>
    <RouterProvider router={routes} />
    </Container>
  );
}

export default App;
