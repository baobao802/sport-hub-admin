import {
  ref,
  onValue,
  query,
  equalTo,
  orderByChild,
  update,
} from 'firebase/database';
import { Notification } from 'src/types';
import { database } from './firebase';

export const getListUnreadNotifications = async (
  hubId: string,
  cb?: (values: any[]) => void,
) => {
  const hubNotificationRef = query(
    ref(database, `notifications/${hubId}`),
    orderByChild('marked'),
    equalTo(false),
  );
  onValue(hubNotificationRef, (snapshot) => {
    const data: any[] = [];
    snapshot.forEach((childSnapshot) => {
      data.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      });
    });
    cb && cb(data);
  });
};

export const markAsReadNotification = async (
  hubId: string,
  payload: Notification[],
  cb?: (values: any) => void,
) => {
  const updates: any = {};
  for (const item of payload) {
    updates[item.id + '/marked'] = true;
  }
  const hubNotificationRef = ref(database, `notifications/${hubId}`);
  update(hubNotificationRef, updates).then((value) => cb && cb(value));
};
