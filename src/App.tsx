import React, { useState } from 'react';
import './App.scss';
import Body from './components/Body';
import Header from './components/Header';
import QuizzModal from './components/QuizzModal';

function App() {
  const [showQuizzModal, setShowQuizzModal] = useState<boolean>(false);

  const handlerShowQuizzModal = () => {
    setShowQuizzModal((prev) => !prev);
  }

  return (
    <div>
      <QuizzModal open={showQuizzModal} />
      <Header open={showQuizzModal} handlerShowQuizzModal={handlerShowQuizzModal} />
      <Body modalVisible={showQuizzModal} />
    </div>
  );
}

export default App;
