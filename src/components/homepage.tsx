import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Sidebar from "./sidebar";
import { useState } from "react";
import pdfToText from "react-pdftotext";
import { useNavigate } from "react-router-dom";

interface HomepageProps {
  setPdfText: (text: string) => void;
  hanldeUpdateModel: (model: string) => void;
  setFileName: (name: string) => void;
  modelName?: string;
}

const Homepage = ({
  setPdfText,
  modelName,
  hanldeUpdateModel,
  setFileName,
}: HomepageProps) => {
  const [IsSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setSidebarOpen(!IsSidebarOpen);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const name = file.name;
    setFileName(name as string);

    try {
      const text = await pdfToText(file);
      setPdfText(text);
      navigate("/chat");
    } catch (error) {
      alert("Failed to extract text from PDF");
    }
  };

  const handleStartChat = () => {
    navigate("/chat");
  };

  return (
    <div>
      <div className="navbar">
        <div>
          <button
            onClick={toggleSidebar}
            style={{
              position: "fixed",
              top: "1em",
              left: "0.6em",
              padding: "10px 20px",
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              fontWeight: "400",
              borderRadius: "1em",
              cursor: "pointer",
              fontSize: "1em",
              zIndex: 2,
            }}
          >
            Previous Chats
          </button>
          <Sidebar isOpen={IsSidebarOpen} />
        </div>
        <div className="model-selector">
          <Box sx={{ minWidth: 170 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Model</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={modelName}
                label="Model"
                onChange={(e) => hanldeUpdateModel(e.target.value)}
              >
                <MenuItem value={"gemini"}>Gemini</MenuItem>
                <MenuItem value={"lamma"}>Lamma</MenuItem>
                <MenuItem value={"deepseek"}>DeepSeek</MenuItem>
                <MenuItem value={"mistral"}>Mistral</MenuItem>
                <MenuItem value={"gemma"}>Gemma</MenuItem>
                <MenuItem value={"qwen"}>Qwen</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      <h1 className="title">Welcome to Genie</h1>
      <p className="centered">
        This is a simple application that allows you to chat with different LLM's
      </p>

      <div className="chat-options centered">
        <div className="option">
          <h2>Chat with PDF</h2>
          <p>Upload a PDF file to start chatting.</p>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>

        <div className="option">
          <h2>Chat</h2>
          <p>Continue To normal Chat</p>
          <button
            style={{
              width : "20em",
              padding: "10px 20px",
              backgroundColor: "#2196F3",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleStartChat}
          >
            Start Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
