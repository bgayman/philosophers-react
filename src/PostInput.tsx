import React, { useState } from 'react';
import colors from './color';
import OwlImage from './OwlImage';

interface PostInputProps {
  onPost: (text: string) => void; // Accept a handler for post action
}

const PostInput: React.FC<PostInputProps> = ({ onPost }) => {
  const [text, setText] = useState('');

  // Function to handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // Function to handle posting the text
  const handlePost = () => {
    if (text.trim()) {
      onPost(text); // Trigger the onPost handler with the current text
      setText(''); // Clear the input after posting
    }
  };

  // Function to handle pressing Enter/Return key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent adding a newline
      handlePost(); // Trigger the post action
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '500px',
      margin: 'auto',
      backgroundColor: colors.white,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'end',
      paddingTop: '20px',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '4px',
        width: '100%'
      }}>
        <OwlImage width="50px" height="50px" />
        <textarea
          placeholder="What's happening?!"
          value={text}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} // Handle pressing Enter/Return key
          rows={1}
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontSize: '1.2em',
            fontFamily: 'inherit',
            lineHeight: '1.5',
            overflow: 'hidden',
            backgroundColor: colors.white,
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto'; // Reset height to auto to calculate new height
            target.style.height = `${target.scrollHeight}px`; // Set height to scroll height
          }}
        />
      </div>
      <button
        style={{
          marginTop: '10px',
          marginBottom: '10px',
          padding: '10px 15px',
          backgroundColor: colors.blue,
          color: '#fff',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '1em',
        }}
        onClick={handlePost} // Trigger post when the button is clicked
      >
        Post
      </button>
    </div>
  );
};

export default PostInput;