import type { ChannelFilters, ChannelOptions, ChannelSort } from "stream-chat";

/**
 * Exports few channel list configuration options. See the docs for more information:
 * - https://getstream.io/chat/docs/sdk/react/core-components/channel_list/
 *
 * @param disableChannelNameFilter set it to true if you want to see all channels where the given user is a member.
 * @param user the user id.
 */
export const getChannelListOptions = (user: { id: string; role: string }) => {
  const filters: ChannelFilters = {
    type: "patient-chat",
    members: user.role === "patient" ? { $in: [user.id] } : undefined,
  };

  const options: ChannelOptions = {
    state: true,
    watch: true,
    presence: true,
    limit: 8,
  };

  const sort: ChannelSort = {
    last_message_at: -1,
    updated_at: -1,
  };

  return {
    filters,
    options,
    sort,
  };
};
