export const MAX_NOTIFICATIONS = 4;
export const MIN_DISPLAY_LISTENER_DELAY = 1;
export const NOTIFICATION_DISPLAY_TIME = 3000;
export const PARALLEL_NOTIF_DELAY = 300;
export const notifType = ['success', 'info', 'warning', 'danger'];

/* action creators/sagas */
export const NOTIFICATION_DISPLAYED = 'NOTIFICATION_DISPLAYED';
export const NOTIFICATION_HIDDEN = 'NOTIFICATION_HIDDEN';
export const NOTIFICATION_DISPLAY_REQUEST = 'NOTIFICATION_DISPLAY_REQUEST';
export const NOTIFICATION_HIDE_REQUEST = 'NOTIFICATION_HIDE_REQUEST';
