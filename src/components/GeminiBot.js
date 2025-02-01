import '../App.css';
import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function GeminiBot() {
    const [input, setInput] = useState('');
    const [chatResponse, setChatResponse] = useState({});
    const [loading, setLoading] = useState(false);
    const [typing, setTyping] = useState(false);
    
    const API_KEY = process.env.REACT_APP_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);

    const handleChange = (event) => setInput(event.target.value);

    const run = async () => {
        const prompt = input.trim();
        if (!prompt) {
            alert("Input field is empty. Please enter a prompt.");
            return;
        }
        
        setLoading(true);
        setTyping(true);

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            setChatResponse(prevRes => ({ ...prevRes, [prompt]: text }));
            setInput('');
        } catch (error) {
            const errorMessage = error.message.includes("Quota exceeded")
                ? "API quota exceeded. Please try again later."
                : "An error occurred. Please try again later.";
            
            setChatResponse(prevRes => ({ ...prevRes, [prompt]: errorMessage }));
        } finally {
            setLoading(false);
            setTyping(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            run();
        }
    };

    const formatText = (text) => {
        return text.split("\n").map((line, index) => (
            <p key={index}><b>{line}</b></p>
        ));
    };

    useEffect(() => {
        const chatContainer = document.querySelector('.chat-container');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [chatResponse]);

    const copyToClipboard = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => alert('Text copied to clipboard!'))
            .catch(() => alert('Unable to copy text to clipboard.'));
    };

    return (
        <div className="App">
            <div className="chat-container">
                <div className='d-flex justify-content-start w-70'>
                    <p className='generated-text bg-gray chat-response'>Hi, how can I help you?</p>
                </div>
                {Object.keys(chatResponse).map((userPrompt, index) => (
                    <div key={index}>
                        <div className='d-flex my-4 justify-content-end w-100'>
                            <p className='bg-dark py-2 px-2 user-msg text-white' style={{borderRadius:"8px"}} >{userPrompt}</p>
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                            <p className='generated-text bg-gray chat-response'>{formatText(chatResponse[userPrompt])}</p>
                            {!loading && (
                                <button className="copy-btn" onClick={() => copyToClipboard(chatResponse[userPrompt])}>
                                    <i className="bi bi-clipboard-fill"></i>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {typing && <p className="typing-loader">Typing<span>.</span><span>.</span><span>.</span></p>}
            </div>
            <div className='row chat-box'>
                <div className="col-7">
                    <input
                        type="text"
                        id="prompt"
                        placeholder='Type here...'
                        className='py-2 px-2'
                        value={input}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="col-3">
                    <button className='px-2 send-btn' onClick={run} disabled={loading}>
                        Send <i className="bi bi-send"></i>
                    </button>
                </div>
                <span className="developer text-dark text-center">
                    Designed and built with curiosity and experimentation by <a href="https://digvijaykadam.com/" target='_blank'>Digvijay Kadam</a>
                </span>
            </div>
        </div>
    );
}

export default GeminiBot;
