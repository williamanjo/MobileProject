import OneSignal from 'react-native-onesignal';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from "react-native";
import { KEY_APP_ONESIGNAL } from 'react-native-dotenv';
async function componentDidMount  () {
        /* O N E S I G N A L   S E T U P */
        OneSignal.setAppId(KEY_APP_ONESIGNAL);
        OneSignal.setLogLevel(6, 0);
        OneSignal.setRequiresUserPrivacyConsent(this.state.requiresPrivacyConsent);
        OneSignal.promptForPushNotificationsWithUserResponse(response => {
            this.OSLog("Prompt response:", response);
        });

        /* O N E S I G N A L  H A N D L E R S */
        OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
            this.OSLog("OneSignal: notification will show in foreground:", notifReceivedEvent);
            let notif = notifReceivedEvent.getNotification();

            const button1 = {
                text: "Cancel",
                onPress: () => { notifReceivedEvent.complete(); },
                style: "cancel"
            };

            const button2 = { text: "Complete", onPress: () => { notifReceivedEvent.complete(notif); }};

            Alert.alert("Complete notification?", "Test", [ button1, button2], { cancelable: true });
        });
        OneSignal.setNotificationOpenedHandler(notification => {
            this.OSLog("OneSignal: notification opened:", notification);
        });
        OneSignal.setInAppMessageClickHandler(event => {
            this.OSLog("OneSignal IAM clicked:", event);
        });
        OneSignal.addEmailSubscriptionObserver((event) => {
            this.OSLog("OneSignal: email subscription changed: ", event);
        });
        OneSignal.addSubscriptionObserver(event => {
            this.OSLog("OneSignal: subscription changed:", event);
            this.setState({ isSubscribed: event.to.isSubscribed})
        });
        OneSignal.addPermissionObserver(event => {
            this.OSLog("OneSignal: permission changed:", event);
        });

        const deviceState = await OneSignal.getDeviceState();

        this.setState({
            isSubscribed : deviceState.isSubscribed
        });
    }
export default function App()  {


useEffect(() => {
    componentDidMount();
    }, [])

  return (
    <>

    </>
  );
};