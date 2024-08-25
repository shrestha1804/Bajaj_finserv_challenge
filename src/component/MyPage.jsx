import React, { useState } from 'react';
import axios from 'axios';
import './MyPage.css'; // Import the CSS file

function MyPage() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const res = await axios.post('http://localhost:5000/bfhl', parsedInput);

            setResponse(res.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON input or error in fetching data');
            setResponse(null);
        }
    };

    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOptions(
            selectedOptions.includes(value)
                ? selectedOptions.filter(option => option !== value)
                : [...selectedOptions, value]
        );
    };

    return (
        <div className="App">
            <h3>Enter the API below</h3>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON here...'
                className="json-input"
            />
            <br />
            <button 
                onClick={handleSubmit} 
                className="submit-button"
            >
                Submit
            </button>

            {error && <p className="error-message">{error}</p>}

            {response && (
                <div className="response-section">
                    <h3>Select Options</h3>
                    <label className="checkbox-label">
                        <input type="checkbox" value="Alphabets" onChange={handleOptionChange} />
                        Alphabets
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" value="Numbers" onChange={handleOptionChange} />
                        Numbers
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" value="HighestLowercaseAlphabet" onChange={handleOptionChange} />
                        Highest lowercase alphabet
                    </label>

                    <div className="response-output">
                        <h3>Response</h3>
                        <p>
                            Filtered Response: {JSON.stringify([
                                ...(selectedOptions.includes('Alphabets') ? response.alphabets : []),
                                ...(selectedOptions.includes('Numbers') ? response.numbers : []),
                                ...(selectedOptions.includes('HighestLowercaseAlphabet') ? response.highest_lowercase_alphabet : [])
                            ])}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyPage;
