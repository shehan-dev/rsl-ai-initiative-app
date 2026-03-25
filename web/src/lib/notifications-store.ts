const readNotificationIds = new Set<string>();

export const notificationsStore = {
  isRead(id: string) {
    return readNotificationIds.has(id);
  },
  markRead(id: string) {
    readNotificationIds.add(id);
  },
  markReadMany(ids: string[]) {
    ids.forEach((id) => readNotificationIds.add(id));
  },
  clear() {
    readNotificationIds.clear();
  },
};
