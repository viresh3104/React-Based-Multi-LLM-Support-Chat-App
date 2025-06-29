import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Groq from "groq-sdk";

interface ChatinterfaceProps {
  pdfText: string;
  modelName: string;
  fileName?: string;
}

interface message {
  role: "user" | "assistant";
  content: string;
}

function Chatinterface({ pdfText, modelName, fileName }: ChatinterfaceProps) {
  const [messages, setMessages] = useState<message[]>([]);
  const [question, setQuestion] = useState("");
  const [firstMessage, setFirstMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_KEY_Gemini = import.meta.env.VITE_API_KEY_GEMINI ?? "";
  const API_kEY_groq = import.meta.env.VITE_API_KEY_GROQ;
  const groq = new Groq({
    apiKey: API_kEY_groq,
    dangerouslyAllowBrowser: true,
  });
  const genAI = new GoogleGenerativeAI(API_KEY_Gemini);

  // gemini
  const askGemini = async (question: string) => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(question);
    const response = await result.response;
    return response.text();
  };

  const askLamma = async (question: string) => {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
  };

  const askDeekseek = async (question: string) => {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
      model: "deepseek-r1-distill-llama-70b",
    });
  };

  const askMistral = async (question: string) => {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
      model: "mistral-saba-24b",
    });
  };

  const askGemma = async (question: string) => {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
      model: "gemma2-9b-it",
    });
  };

  const askQwen = async (question: string) => {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
      model: "qwen-qwq-32b",
    });
  };

  const handleAsk = async () => {
    if (!question) return;
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setFirstMessage(true);
    setLoading(true); // Start loading
    const fullQuestion = pdfText
      ? `${question}\n\nContext: ${pdfText}`
      : question;

    var aiResponse = "";
    setQuestion("");
    if (modelName == "gemini") {
      aiResponse = await askGemini(fullQuestion);
    }
    if (modelName == "lamma") {
      const lamma = await askLamma(fullQuestion);
      aiResponse = lamma.choices?.[0]?.message?.content || "";
    }
    if (modelName == "deepseek") {
      const deepseek = await askDeekseek(fullQuestion);
      aiResponse = deepseek.choices?.[0]?.message?.content || "";
    }
    if (modelName == "mistral") {
      const mistral = await askMistral(fullQuestion);
      aiResponse = mistral.choices?.[0]?.message?.content || "";
    }
    if (modelName == "gemma") {
      const Gemma = await askGemma(fullQuestion);
      aiResponse = Gemma.choices?.[0]?.message?.content || "";
    }
    if (modelName == "qwen") {
      const Qwen = await askQwen(fullQuestion);
      aiResponse = Qwen.choices?.[0]?.message?.content || "";
    }

    const newMessage: message = {
      role: "assistant",
      content: aiResponse,
    };
    setMessages((prev) => [...prev, newMessage]);
    setLoading(false); // Stop loading
  };

  return (
    <div className="chat-interface">
      <div className="chat-input">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything"
          className="input-field"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAsk();
            }
          }}
        />

        <button onClick={handleAsk} className="ask">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
      {firstMessage === false && (
        <div className="welcome-message">
          <h2 style={{ margin: "0em", fontSize: "5em" }}>
            What's on Your Mind
          </h2>
          {fileName && (
            <p style={{ margin: "0em", fontSize: "1.2em" }}>File: {fileName}</p>
          )}
          {modelName && (
            <p style={{ margin: "0em", fontSize: "1.2em" }}>
              Selected Model: {modelName.toUpperCase()}
            </p>
          )}
        </div>
      )}
      {firstMessage === true && (
        <div>
          <div className="chat-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.role}`} // 👈 add class by role
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    p: ({ children }) => (
                      <p
                        style={{
                          margin: "0.5em 0",
                          fontSize: "1em",
                          lineHeight: "1.6",
                        }}
                      >
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong style={{ fontWeight: 600 }}>{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em style={{ fontStyle: "italic" }}>{children}</em>
                    ),
                    code: ({ children }) => (
                      <code
                        style={{
                          backgroundColor: "#f5f5f5",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          fontFamily: "monospace",
                          fontSize: "0.95em",
                        }}
                      >
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre
                        style={{
                          backgroundColor: "#2b2a2a",
                          color: "#ffffff",
                          padding: "1em",
                          borderRadius: "8px",
                          overflowX: "auto",
                          fontSize: "0.9em",
                          marginTop: "0.5em",
                        }}
                      >
                        {children}
                      </pre>
                    ),
                    li: ({ children }) => (
                      <li style={{ marginBottom: "0.3em" }}>{children}</li>
                    ),
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            ))}
            {loading && (
              <div className="chat-message assistant loading">
                <em>Loading...</em>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatinterface;
