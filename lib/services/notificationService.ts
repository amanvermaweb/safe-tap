import connect from '../../lib/db';
import NotificationModel from '../../models/Notification';
import { NotificationType } from '../../types';
import { emitEvent } from '../realtime';

export async function createNotification(userId: string, studentId: string | undefined, type: NotificationType, title?: string, message?: string) {
  await connect();

  const doc = await NotificationModel.create({ userId, studentId, type, title, message });

  // Emit realtime event for frontend clients
  emitEvent('notificationCreated', { id: doc._id, userId, studentId, type, title, message, createdAt: doc.createdAt });

  return doc;
}

export async function createNotificationsForParents(parentIds: string[], studentId: string, type: NotificationType, title?: string, message?: string) {
  const results = [] as any[];
  for (const userId of parentIds) {
    // create per-parent notification
    // not using transaction — each notification is independent
    // callers may call this inside a transaction if desired.
    // eslint-disable-next-line no-await-in-loop
    const n = await createNotification(userId, studentId, type, title, message);
    results.push(n);
  }
  return results;
}

export default { createNotification, createNotificationsForParents };
