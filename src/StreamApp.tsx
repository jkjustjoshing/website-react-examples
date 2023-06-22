import type { StreamChatGenerics } from "./types";
import React, { useEffect, useState } from "react";
import type { ChannelFilters, ChannelOptions, ChannelSort } from "stream-chat";
import { getChannelListOptions } from "./channelListOptions";

import { Channel, Chat } from "stream-chat-react";

import {
  ChannelInner,
  CreateChannel,
  MessagingSidebar,
  MessagingThreadHeader,
  SendButton,
} from "./components";

import { GiphyContextProvider } from "./context";
import {
  useConnectUser,
  useChecklist,
  useMobileView,
  useTheme,
  useUpdateAppHeightOnResize,
} from "./hooks";

export type StreamAppProps = {
  apiKey: string;
  userToConnect: { id: string; name: string; image?: string; role: string };
  userToken: string | undefined;
  isDark: boolean;
};

export const StreamApp = (props: StreamAppProps) => {
  const { apiKey, userToConnect, userToken, isDark } = props;
  const [isCreating, setIsCreating] = useState(false);

  const chatClient = useConnectUser<StreamChatGenerics>(
    apiKey,
    userToConnect,
    userToken
  );
  const toggleMobile = useMobileView();
  const theme = useTheme(isDark);

  useChecklist(chatClient, undefined as any);
  useUpdateAppHeightOnResize();

  if (!chatClient) {
    return null; // render nothing until connection to the backend is established
  }

  const channelListOptions = getChannelListOptions(userToConnect);

  const isStaff = chatClient.user && chatClient.user.role !== "patient";
  if (!isStaff) console.log({ chatClient });

  const sidebar = (
    <MessagingSidebar
      channelListOptions={channelListOptions}
      onClick={toggleMobile}
      onCreateChannel={() => setIsCreating(!isCreating)}
      onPreviewSelect={() => setIsCreating(false)}
      theme={theme}
    />
  );

  return (
    <Chat client={chatClient} theme={`messaging ${theme}`}>
      {isStaff ? sidebar : <div style={{ display: "none" }}>{sidebar}</div>}
      <Channel
        maxNumberOfFiles={10}
        multipleUploads={true}
        SendButton={SendButton}
        ThreadHeader={MessagingThreadHeader}
        TypingIndicator={() => null}
      >
        <GiphyContextProvider>
          <ChannelInner theme={theme} toggleMobile={toggleMobile} />
        </GiphyContextProvider>
      </Channel>
      {isCreating && (
        <CreateChannel
          toggleMobile={toggleMobile}
          onClose={() => setIsCreating(false)}
        />
      )}
    </Chat>
  );
};
