/* @flow */

/* Imported libraries imports */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

/* User imports */
import { hideNotifRequested } from '../actions';
import { notifType } from '../constants';

type Props = {
    holder: any,
    notifications: Array<any>,
    notifRequested: Function,
    hideNotifRequested: Function,
};

export class Notification extends Component<Props> {
    closeMessage = (id: any) => {
        this.props.hideNotifRequested(id);
    };

    notificationContent = (props: Object) => {
        const type = notifType.includes(props.type) ? props.type : null;
        const classes = classNames({ Notification: true }, type);
        return (
            <div key={props.id.toString()} className={classes}>
                <div className="Notification-Head">
                    <span className="title">
                        {props.title}
                    </span>
                    <span
                        className="close-notif"
                        onClick={() => this.closeMessage(props.id)}
                        aria-label="Close"
                        data-action="close-message"
                    >
                        <span aria-hidden="true">&times;</span>
                    </span>
                </div>

                <div className="Notification-Body">
                    {props.content}
                </div>
            </div>
        );
    };

    createNotification = (notification: Object) => {
        return ReactDOM.createPortal(
            this.notificationContent(notification),
            this.props.holder
        );
    };

    render() {
        const items = this.props.notifications.map(notif =>
            this.createNotification(notif)
        );
        return (
            <div>
                {items}
            </div>
        );
    }
}

export const mapStateToProps = (state: any) => {
    return {
        notifications: state.sagaNotifications,
    };
};

export default connect(mapStateToProps, {
    hideNotifRequested,
})(Notification);
