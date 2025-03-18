# Project Setup
After cloning the repository, follow these steps to get the app running:

### Install Dependencies
Run one of the following commands to install the Node dependencies:

```sh
yarn install
# or
npm install
```

### Install CocoaPods (for iOS)
Use this command to install CocoaPods:

```sh
npx pod-install
```

### Run the App
Start the app on the appropriate device using one of these commands:

- **For Android:**
  ```sh
  npx react-native run-android
  ```
- **For iOS:**
  ```sh
  npx react-native run-ios
  ```

---

### Setting Up Jest
Follow these steps to set up Jest for testing in your project:

1. **Install Jest and Required Dependencies:**
   ```sh
   yarn install --save-dev jest @testing-library/react-native @testing-library/jest-native react-test-renderer
   ```

2. **Configure Jest in `jest.config.js`:**
   Add the following section if it doesn’t exist:
   ```
   module.exports = {
     preset: 'react-native',
   };
   ```
3. **Run Jest Tests:**
   ```sh
   npm test
   ```

## Running Unit Tests
We’ve written unit tests for the API and the Character List. Run them using these commands:

- **Test the API:**
  ```sh
  npm test api.test.js
  ```
- **Test the Character List:**
  ```sh
  npm test CharacterList.test.js
  ```

---

## Pagination Details
The SWAPI (Star Wars API) uses a fixed pagination system where each API request returns a default of 10 results per page. Custom page size modifications are not supported, meaning users cannot specify a different number of results per request. To retrieve additional data, multiple requests must be made to fetch subsequent pages.

**Note:** Since SWAPI does not support custom pagination, this feature has not been implemented in the practical task.

---

## Practical Task Video
For a video of the practical , please visit the Task Video:

[Task Video](https://drive.google.com/file/d/12s4zt4qA9NuIN_iQ2euaZD-4EtoIEd-7/view?usp=sharing)


## Project Documentation
For a more detailed overview of the project, please visit the documentation:

[Project Documentation](https://github.com/mobidev86/MedalystRNHomework/wiki/Project-Documentation)

