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

# Micropush JSON payload

Here's an example JSON payload for Android:

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

Check out `/test` folder for examples.
