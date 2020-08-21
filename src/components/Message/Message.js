import React, { forwardRef } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./Message.css";

const message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message.username;

  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography color="textPrimary" variant="h5" component="h2">
            {!isUser && `${message.username || "Unknown User"}:`}{" "}
            {message.textMessage}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default message;
