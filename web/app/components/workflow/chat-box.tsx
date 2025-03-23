import React, { useState } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put('/api/workflow', { description: input });
      setResponse(res.data);
    } catch (error) {
      console.error('Error submitting input:', error);
    }
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Describe your workflow automation requirements..."
      />
      <button onClick={handleSubmit}>Submit</button>
      {response && (
        <div>
          <h3>Generated Workflow</h3>
          <pre>{JSON.stringify(response.workflow, null, 2)}</pre>
          <h3>Generated Tool</h3>
          <pre>{JSON.stringify(response.tool, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
