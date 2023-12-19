import '../App.css';
import { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";


function GeminiBot() {

    const [input, setInput] = useState('');
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(" ");
    const API_KEY = process.env.REACT_APP_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);

    const handleChange = (event) => {
        setInput(event.target.value);

    }


    const run = async () => {
        // For text-only input, use the gemini-pro model

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = input;
        setLoading(true);
        setUser(input)
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
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
    const textLines = text.split("\n");

    const formattedText = textLines.map((line, index) => {
        if (line.startsWith(":") || line.includes('class="title"') || line.startsWith("#")) {

            // Use a library like react-html-parser to render HTML in text
            return <span dangerouslySetInnerHTML={{ __html: `<b>${line}</b>` }}></span>;
        } else {
            return <p key={index}>{line}</p>;
        }
    });

    return (
        <div className="App  position-relative">
            <div className='row  '>
                <div className="col-8"><input type="text" id="prompt" className='w-100' onChange={handleChange} /></div>
                <div className="col-3"><button onClick={run}>generate</button></div>


                <p> Your Prompt : {user}</p>
                {
                    loading ? <p>Loading...</p> : <p className='genrated-text bg-gray'>Generated Text : {formattedText}</p>
                }


            </div>

        </div >
    );
}

export default GeminiBot;
