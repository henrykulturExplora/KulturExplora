import { useState } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Reason from './components/Reason';
import How from './components/How';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Banner />
      <Reason />
      <How />
    </>
  );
}

export default App;
