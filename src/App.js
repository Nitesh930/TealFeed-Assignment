import React, { useState, useRef, useEffect, ChangeEvent, RefObject } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Importing the PrismJS theme suitable for a dark background
import 'prismjs/components/prism-javascript'; // Importing the JavaScript language definition for PrismJS
import './App.css'; // Importing the CSS file

const App = () => {
     // State to store the code entered by the user
    const [code, setCode] = useState('console.log("Hello, world!");');

    // References to the textarea and pre elements
    const textAreaRef = useRef(null);
    const preRef = useRef(null);

    // Handler to update the state when the user types in the textarea
    const handleChange = (event) => {
        setCode(event.target.value);
    };

    // Effect to synchronize the scroll positions of the textarea and pre elements
    useEffect(() => {
        const handleScroll = () => {
            preRef.current.scrollTop = textAreaRef.current.scrollTop;
            preRef.current.scrollLeft = textAreaRef.current.scrollLeft;
        };

        textAreaRef.current.addEventListener('scroll', handleScroll);
        return () => textAreaRef.current.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="App">
            <h1>Code Editor</h1>
            <div className="editor-container">
                <textarea
                    ref={textAreaRef} //Uses textAreaRef to reference the element.
                    value={code} //value={code} binds the textarea value to the code state.
                    onChange={handleChange} //onChange={handleChange} updates the code state when the user types.
                    className="code-input"//className="code-input" applies the styles from App.css.
                    placeholder="Write your code here..."//It is a placeholder which provides place holder text
                />
                
                <pre ref={preRef} className="code-output">
                    <code
                        className="language-javascript" //className="language-javascript" applies the PrismJS JavaScript syntax highlighting.
                        dangerouslySetInnerHTML={{ __html: Prism.highlight(code, Prism.languages.javascript, 'javascript') }}//dangerouslySetInnerHTML is used to set the inner HTML of the code element to the highlighted code produced by PrismJS.
                    />
                </pre>
            </div>
        </div>
    );
};

export default App;
