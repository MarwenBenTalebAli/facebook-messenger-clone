import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, FormLabel, Input, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Message from "../components/Message/Message";
import db from "../firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";

const App = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([
    { key: "", username: "", textMessage: "", timestamp: null },
  ]);
  const [username, setUsername] = useState("");

  /* when the app loads, we need to listen to the database and fetch new todos 
      as they get added/removed */
  useEffect(() => {
    // this code here... fires when the app.js loads
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            key: doc.id,
            username: doc.data().username,
            textMessage: doc.data().textMessage,
            timestamp: doc.data().timestamp,
          }))
        );
      });
  }, []);

  /* useState = variable in React */
  /* useEffect = run code on a condition in React */
  useEffect(
    () => {
      /* run code here */
      setUsername(prompt("Please enter your name"));
      /* if its blank inside [], this code runs once when the app component louds */
    },
    /* condition */
    []
  );

  const handleMessageInput = (event) => setInputMessage(event.target.value);

  const sendMessageHandler = (event) => {
    event.preventDefault();

    const newInputMessage = inputMessage;
    let items = [];

    const newMessage = {
      username: username,
      textMessage: newInputMessage,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    db.collection("messages").add(newMessage);

    if (newInputMessage !== "") {
      items = [
        ...messages,
        {
          username: username,
          textMessage: newInputMessage,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        },
      ];
    }

    setMessages(items);
    setInputMessage("");
  };

  const listMessages = (
    <FlipMove>
      {messages.map((message) => (
        <Message username={username} message={message} key={message.key} />
      ))}
    </FlipMove>
  );

  return (
    <div className="App">
      <img className="app__img" src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" alt="Facebook Messenger App image"></img>
      <h1>Messenger App</h1>
      <h2>Welcome {username}</h2>
      <form className="app__form">
        <FormControl className="app__formControl">
          <FormLabel></FormLabel>
          <Input className="app__input"
            placeholder="Enter a message..."
            value={inputMessage}
            onChange={handleMessageInput}
          />
          <IconButton className="app__iconButton"
            type="submit"
            disabled={!inputMessage}
            size="medium"
            variant="contained"
            color="primary"
            onClick={sendMessageHandler}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      {listMessages}
    </div>
  );
};

export default App;
