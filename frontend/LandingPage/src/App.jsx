import { useState } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Reason from './components/Reason';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Banner />
      <Reason />
    </>
  );
}

export default App;
