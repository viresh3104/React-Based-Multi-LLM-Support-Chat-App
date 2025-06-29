import { Route, Routes } from 'react-router-dom';
import Homepage from './components/homepage';
import Chatinterface from './components/chatinterface';
import { useState } from 'react';

const App = () => {
  const [pdfText, setPdfText] = useState("");
  const [modelName, setModelName] = useState("gemini");
  const [fileName, setFileName] = useState("");
  
  const hanldeUpdateModel = (model: string) => {
    setModelName(model);
  };

  return (
    <Routes>
      <Route path="/" element={<Homepage modelName={modelName} setFileName={setFileName} setPdfText={setPdfText} hanldeUpdateModel={hanldeUpdateModel}/>} />
      <Route path="/chat" element={<Chatinterface pdfText={pdfText} modelName={modelName} fileName={fileName}/>} />
    </Routes>
  );
};

export default App;