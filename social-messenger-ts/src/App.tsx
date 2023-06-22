import { getImage } from "./assets";
import React, { useMemo, useState } from "react";
import "stream-chat-react/dist/css/v2/index.css";
import "./styles/index.css";

import { users } from "./config";

import { StreamApp, type StreamAppProps } from "./StreamApp";

const flex = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  justifyContent: "stretch",
} as const;

type AppProps = Pick<StreamAppProps, "apiKey">;

const App = (props: AppProps) => {
  return (
    <div style={{ ...flex, overflowY: "scroll", paddingRight: 20 }}>
      {users.map((user, index) => {
        const userToken = user.token;

        const userToConnect = {
          id: user.userId,
          name: user.userId,
          image: getImage(user.userId),
          role: user.role,
        };

        return (
          <div
            style={{
              background: index % 2 ? "#444" : "#fff",
              ...flex,
            }}
          >
            <h2
              style={{
                color: index % 2 ? "#fff" : "#333",
                textDecoration: "underline",
              }}
            >
              {user.userId}
            </h2>
            <StreamApp
              key={user.userId}
              apiKey={props.apiKey}
              isDark={Boolean(index % 2)}
              userToConnect={userToConnect}
              userToken={userToken}
            />
          </div>
        );
      })}
    </div>
  );
};

export default App;
