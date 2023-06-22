import "./MessagingChannelPreview.css";
import {
  ChannelPreviewUIComponentProps,
  ChatContextValue,
  useChatContext,
} from "stream-chat-react";
import { AvatarGroup } from "../";

import type { MouseEventHandler } from "react";
import type { Channel, ChannelMemberResponse } from "stream-chat";
import type { StreamChatGenerics } from "../../types";

const getTimeStamp = (channel: Channel) => {
  let lastHours = channel.state.last_message_at?.getHours();
  let lastMinutes: string | number | undefined =
    channel.state.last_message_at?.getMinutes();
  let half = "AM";

  if (lastHours === undefined || lastMinutes === undefined) {
    return "";
  }

  if (lastHours > 12) {
    lastHours = lastHours - 12;
    half = "PM";
  }

  if (lastHours === 0) lastHours = 12;
  if (lastHours === 12) half = "PM";

  if (lastMinutes.toString().length === 1) {
    lastMinutes = `0${lastMinutes}`;
  }

  return `${lastHours}:${lastMinutes} ${half}`;
};

type MessagingChannelPreviewProps = ChannelPreviewUIComponentProps & {
  channel: Channel;
  onClick: MouseEventHandler;
  setActiveChannel?: ChatContextValue["setActiveChannel"];
};

const MessagingChannelPreview = (props: MessagingChannelPreviewProps) => {
  const { channel, lastMessage, setActiveChannel, onClick } = props;
  const { channel: activeChannel, client } =
    useChatContext<StreamChatGenerics>();

  const getChannelName = (members: ChannelMemberResponse[]) => {
    const defaultName = "Unknown patient name";

    const patient = members.find(({ user }) => user?.role === "patient");
    return patient?.user?.name || defaultName;
  };

  const members = Object.values(channel.state.members).filter(({ user }) => {
    return user?.role === "patient";
  });
  console.log(client.userID, client, channel);
  const inChat = client.userID && channel.state.members[client.userID];

  const leaveOrJoin = async () => {
    if (!client.userID) return;

    const text = `${client.user?.id} has ${
      inChat ? "left" : "joined"
    } the chat`;
    const message = {
      text,
      user: { id: client.userID },
      type: "system",
    };

    if (inChat) {
      await channel.sendMessage(message);
      await channel.removeMembers([client.userID]);
    } else {
      await channel.addMembers([client.userID]);
      await channel.sendMessage(message);
    }
  };

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "channel-preview__container selected"
          : "channel-preview__container"
      }
      onClick={(e) => {
        onClick(e);
        setActiveChannel?.(channel);
      }}
    >
      <AvatarGroup members={members} />
      <div className="channel-preview__content-wrapper">
        <div className="channel-preview__content-top">
          <p className="channel-preview__content-name">
            {getChannelName(members)}
          </p>
          <p className="channel-preview__content-time">
            {getTimeStamp(channel)}
          </p>
        </div>
        <p className="channel-preview__content-message">
          {lastMessage?.text ?? "Send a message"}
        </p>
      </div>
      <button onClick={leaveOrJoin}>{inChat ? "Leave" : "Join"}</button>
    </div>
  );
};

export default MessagingChannelPreview;
