Setting Up the Project
After cloning the app, follow these steps to get it running:

Install Dependencies
Run one of the following commands to install the Node dependencies:

yarn install
# or
npm install

Install CocoaPods (for iOS)
Use this command to install CocoaPods:

npx pod-install

Run the App
Start the app on the appropriate device using one of these commands:

For Android:    npx react-native run-android
For iOS:        npx react-native run-ios

Running Unit Tests
We’ve written unit tests for the API and the character list. Run them using these commands:

Test the API:                   npm test api.test.js
Test the Character List:        npm test CharacterList.test.js

Pagination Details:
The SWAPI (Star Wars API) uses a fixed pagination system where each API request returns a default 10 results per page. Custom page size modifications are not supported, meaning users cannot specify a different number of results per request. To retrieve additional data, multiple requests must be made to fetch subsequent pages.

Note: Since SWAPI does not support custom pagination, I have not implemented this feature in the practical task. 