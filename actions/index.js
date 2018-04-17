/* @flow */

/* User imports */
import {
    NOTIFICATION_DISPLAYED,
    NOTIFICATION_HIDDEN,
    NOTIFICATION_DISPLAY_REQUEST,
    NOTIFICATION_HIDE_REQUEST,
} from '../constants';

export const notifRequested = (notification: Object) => {
    return {
        type: NOTIFICATION_DISPLAY_REQUEST,
        payload: {
            ...notification,
            //TOBE checked
            id: new Date().getUTCDate(),
        },
    };
};

export const hideNotifRequested = (id: number) => {
    return {
        type: NOTIFICATION_HIDE_REQUEST,
        payload: {
            id,
        },
    };
};

export const notificationDisplayed = (notification: Object) => {
    return {
        type: NOTIFICATION_DISPLAYED,
        payload: {
            ...notification,
        },
    };
};

export const notificationHidden = (notification: Object) => {
    return {
        type: NOTIFICATION_HIDDEN,
        payload: {
            ...notification,
        },
    };
};
