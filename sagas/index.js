/* Libraries */
import { delay } from 'redux-saga';
import { put, take, call, fork } from 'redux-saga/effects';

/* User imports */
import {
    MAX_NOTIFICATIONS,
    MIN_DISPLAY_LISTENER_DELAY,
    NOTIFICATION_DISPLAY_TIME,
    PARALLEL_NOTIF_DELAY,
    NOTIFICATION_HIDE_REQUEST,
    NOTIFICATION_DISPLAY_REQUEST,
} from '../constants';

import { notificationDisplayed, notificationHidden } from '../actions';

export function* notificationSaga() {
    let pendingNotifications = [];
    let activeNotifications = [];

    // Trigger to display notification for N seconds
    function* displayNotification(notification) {
        if (activeNotifications.length < MAX_NOTIFICATIONS) {
            activeNotifications = [...activeNotifications, notification];
            yield put(notificationDisplayed(notification)); //Display the notif ( put == dispatch)
            yield call(delay, NOTIFICATION_DISPLAY_TIME); //Wait N seconds
            yield put(notificationHidden(notification)); //Hide the notification
            activeNotifications = activeNotifications.filter(
                notif => notif.id !== notification.id
            );
        }
    }

    // Hide notification watcher
    function* notificationHideWatcher() {
        while (true) {
            const notification = yield take(NOTIFICATION_HIDE_REQUEST);
            yield put(notificationHidden(notification.payload));
        }
    }

    // Everytime a notification display request is received, put it in the queue
    function* notificationRequestsWatcher() {
        while (true) {
            // take() == saga will block and wait until NOTIFICATION_DISPLAY_REQUEST action is dispatched
            const action = yield take(NOTIFICATION_DISPLAY_REQUEST);
            const newNotification = action.payload;
            pendingNotifications = [...pendingNotifications, newNotification];
        }
    }

    //Read queued notifications periodically and display it if everything is okay
    function* notificationScheduler() {
        while (true) {
            const canDisplayNotif =
                activeNotifications.length < MAX_NOTIFICATIONS &&
                pendingNotifications.length > 0;

            if (canDisplayNotif) {
                //Display the first pending notification of the queue
                const [
                    firstNotification,
                    ...remainingNotifications
                ] = pendingNotifications;
                pendingNotifications = remainingNotifications;
                // fork() == create a sub, async process which will handle the display of a notification
                yield fork(displayNotification, firstNotification);
                // Add minimal delay so two notifications wont pop up at once
                yield call(delay, PARALLEL_NOTIF_DELAY);
            } else {
                yield call(delay, MIN_DISPLAY_LISTENER_DELAY);
            }
        }
    }

    // Call the two sub sagas - one for listening to aciton requests,
    // and the other for listening and dispatching display requests
    // plus call the saga for hiding notificaitons
    yield [
        call(notificationRequestsWatcher),
        call(notificationScheduler),
        call(notificationHideWatcher),
    ];
}
