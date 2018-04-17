/* @flow */

import { NOTIFICATION_DISPLAYED, NOTIFICATION_HIDDEN } from '../constants';

type State = Array<any>;

const INITIAL_STATE: State = [];

export const actionsMap = {
    [NOTIFICATION_DISPLAYED]: (state: any, action: Object) => {
        return [...state, action.payload];
    },
    [NOTIFICATION_HIDDEN]: (state: any, action: Object) => {
        return state.filter(
            notif => notif.id.toString() !== action.payload.id.toString()
        );
    },
};

export default function sagaNotifications(
    state: State = INITIAL_STATE,
    action: any = {}
) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}
