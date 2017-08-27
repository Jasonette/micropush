# Micropush

Dead simple Microservice for push notifications on iOS and Android.

# Install

1. Download

    ```
    git clone https://github.com/Jasonette/micropush.git
    ```

2. Set up

    1. **Get private keys**
        - iOS : [Generate a p8 file from Apple developers website](http://help.apple.com/xcode/mac/current/#/dev54d690a66?sub=dev73a37248c) and paste the p8 file into micropush root folder
        - Android : Sign up to Google Firebase and [get your Firebase Cloud Messaging API key](https://stackoverflow.com/questions/37337512/where-can-i-find-the-api-key-for-firebase-cloud-messaging)

    2. **Update `.env` file:** Open the `.env` file inside the root directory and make changes.
        - If supporting iOS
            1. update the `ios_p8` attribute value with the name of the `p8` file you pasted (example: `apns.p8`)
            2. update both the `ios_keyid` and `ios_teamid` with corresponding values ([Learn how to retrieve keyid and teamid](https://www.google.com/search?q=apns+teamid+keyid&oq=apns+teamid+keyid))
        - If supporting Android, 
            1. update the `android_apikey` attribute with the api key we got from "Get private keys" step.

3. Deploy

    - Development: Just run `npm start` to run the server on localhost
    - Production: Push to heroku or wherever you want. That's it!

# Usage

Sending a push is a simple as:

- making a POST request of `'Content-Type': 'application/json'`
- to your Micropush server endpoint
- with a JSON payload that follows the convention described below:


# Micropush JSON protocol

The payload contains two attributes:

1. **type**: Either `$push.android` or `$push.ios`
2. **options**: options to send to micropush. Micropush will interpret this JSON depending on whether it's `$push.android` or `$push.ios`.

Micropush will interpret the `options` object based on the `type` attribute. See below section for details.

# Options syntax

## Android

In case of Android, the protocol is straight-forward. It completely follows the Firebase Cloud Messaging HTTP protocol: https://firebase.google.com/docs/cloud-messaging/http-server-ref

Here's an example (Notice that the `options` object follows the [FCM Downstream HTTP messages protocol](https://firebase.google.com/docs/cloud-messaging/http-server-ref#downstream-http-messages-json) :

```
{
  "type": "$push.android",
  "options": {
    "to": "[DEVICE_TOKEN_GOES_HERE]",
    "data": {
      "href": {
        "url": "https://news.ycombinator.com",
        "view": "web"
      }
    },
    "priority": "high",
    "notification": {
      "title": "android",
      "sound": "default",
      "body": "this is a message for android"
    }
  }
}
```

## iOS

In case of iOS it's not interpreted literally. Instead there are **3 attributes:**

1. **to**: Must contain two sub-attributes "token" and "topic"
    - **token**: Device token to send push to
    - **topic**: Your app's bundle id
2. **notification**: This part represents the [aps payload](https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html#//apple_ref/doc/uid/TP40008194-CH17-SW1) you send to APNS.
3. **data**: Custom JSON payload which is accessible as `userInfo` inside [application:didReceiveRemoteNotification:](https://developer.apple.com/documentation/appkit/nsapplicationdelegate/1428430-application)

Here's an example JSON payload for iOS:

```
{
  "type": "$push.ios",
  "options": {
    "to": {
      "token": "[DEVICE_TOKEN_GOES_HERE]",
      "topic": "[APP_BUNDLE_ID_GOES_HERE]"
    },
    "data": {
      "href": {
        "url": "https://news.ycombinator.com",
        "view": "web"
      }
    },
    "notification": {
      "alert": "\uD83D\uDCE7 \u2709 You have a new message",
      "sound": "default"
    }
  }
}
```

## Example

- Check out `/test` folder for console based examples.
- Check out [Micropusher](https://github.com/Jasonette/micropusher) to instantly try on the web
