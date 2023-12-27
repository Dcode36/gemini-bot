import '../App.css';
import { useState, useEffect } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";


function GeminiBot() {

    const [input, setInput] = useState('');
    const [text, setText] = useState('Hey, How can i help You')
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(" ");
    const [chatResponse, setChatResponse] = useState([])

    const API_KEY = process.env.REACT_APP_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);

    const handleChange = (event) => {
        setInput(event.target.value);

    }


    const run = async () => {
        // For text-only input, use the gemini-pro model

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = input.trim();
        if (!prompt) {
            alert("Input field is empty. Please enter a prompt.");
            return;
        }
        setLoading(true);
        setUser(input)
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            setChatResponse(prevRes => ({ ...prevRes, [prompt]: text }))
            setText(text);
        } catch (error) {
            if (error.message.includes("Quota exceeded")) {
                // Show a specific error message to the user
                setText("API quota exceeded. Please try again later.");
            } else {
                // Handle other errors
                console.error(error);
                setText("An error occurred. Please try again later.");
            }
        }
        finally {
            setLoading(false);
        }

    }


    const formatText = (text) => {
        const textLines = text.split("\n");
        return textLines.map((line, index) => {
            if (line.startsWith(":") || line.includes('class="title"') || line.startsWith("#")) {
                return <span key={index} dangerouslySetInnerHTML={{ __html: `<b>${line}</b>` }}></span>;
            } else {
                return <p key={index}>{line}</p>;
            }
        });
    };
    useEffect(() => {
        // Scroll to the bottom of the chat-container after each update
        const chatContainer = document.querySelector('.chat-container');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [chatResponse]);

    const copyToClipboard = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert('Text copied to clipboard:', textToCopy);
            })
            .catch((err) => {
                alert('Unable to copy text to clipboard', err);
            });
    };
    return (
        <div className="App ">
            <div className="chat-container">
                <div className='d-flex justify-content-start w-70'><p className='genrated-text bg-gray chat-response ' data-aos="fade-up">Hi, how can i help you</p></div>
                {
                    Object.keys(chatResponse).map((userPrompt, index) => (
                        <div key={index} >
                            <div className='d-flex my-4 justify-content-end w-100'><p className='bg-dark py-2 px-2 user-msg text-white border border-round user-prompt' > {userPrompt} </p></div>
                           
                                    
                                    <div className='d-flex justify-content-start flex-column'>
                                        <p className='genrated-text bg-gray chat-response ' >{formatText(chatResponse[userPrompt])} <span></span></p>
                                        <button className="copy-btn" onClick={() => copyToClipboard(chatResponse[userPrompt])}><i class="bi bi-clipboard-fill"></i></button>
                                    </div>
                            


                        </div>
                    ))

                }

            </div>

            <div className='row  chat-box'>
                {
                    loading ? <p className='py-1 text-center' id='loading'>Loading...</p> : <p className='genrated-tex'> { }</p>
                }
                <div className="col-7"><input type="text" id="prompt" placeholder='type here .....' className=' py-2 px-2' required onChange={handleChange} /></div>
                <div className="col-3"><button className=' px-2 send-btn' onClick={run}>Send <i className="bi bi-send"></i></button></div>
                <span className="developer text-dark text-center">Designed and built with curiosity and experimentation by <a href="https://digvijaykadam.com/" className='text-dark' target='_blank'>Digvijay Kadam</a></span>
            </div>

        </div >
    );
}

export default GeminiBot;
