import React from 'react';

import styles from './InputField.module.css';
const InputField = ({ message, setMessage, sendMessage }) => {
  return (
    <div className={styles.inputArea}>
      <div className={styles.plusButton}>+</div>
      <form onSubmit={sendMessage} className={styles.inputContainer}>
        <input placeholder="Type in here…" value={message} onChange={(event) => setMessage(event.target.value)} rows={1} />

        <button disabled={message === ''} type="submit" className={styles.sendButton}>
          전송
        </button>
      </form>
    </div>
  );
};

export default InputField;
