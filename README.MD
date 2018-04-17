Steps by step integration:

//////////////  STORE SETUP  //////////////
- Add the notification folder contents to the application
- Install redux-saga ( yarn add redux-saga/ npm install redux-saga)
- Add the sagaMiddleware middleware to store ( https://github.com/redux-saga/redux-saga )
    const sagaMiddleware = createSagaMiddleware();
    createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            sagaMiddleware
        )
    );
- Import the saga from saga/index
    import { notificationSaga } from notifications/sagas;
- Run the middleware
    sagaMiddleware.run(notificationSaga);

- Import the reducer from notification/reducers and add it to the combineReducers()

//////////////  PORTALS SETUP  //////////////

- add a container inside the HTML/JSX for the PORTALS
    e.g:
        <body>
          <div id="root" />
          <div id="notifications" />
        </body>  
- import notification/components/Notification component inside the App.js
- Add the <Notification> component inside the JSX, with a holder PROPS<HTML node>
    e.g:
        cont holder = document.getElementById('notifications')
        <Notification holder={hodler} />

////////////// REQUEST A NOTIFICATION ///////////////

- import the notification/actions
- dispatch notifRequested() to request a notification
    e.g: notifRequested({title: "TEST", content: "THIS IS A MESSAGE", type: 'info'});
- hiding notifications is automatically managed by the sagas

////////////// Available types ///////////////
'success'
'info'
'warning'
'danger'
