# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Thanks for the original Author
Here we have to thank Karl Hadwen on his really great job for building the project as a reference for everybody and you can find the original project in the following GitHub: https://github.com/karlhadwen/instagram link.

## Enhancements And Fixed Bugs
### Major
1. In useAuthListener: make the listener to return both user account/auth user and the user profile at the same time, to reduce database accessing.
Therefore I deleted the use-user hook.

2. Create a ConditionaldRedirectRoute.js to redirect based on condition paramter and I used it to redirect to dashboard componenet from both login and signout componenets in case of the user is already looged in.

3. Solving the issue that has the follwoing scenario:
    After success sign up, and in the dashboard if the user try to follow a person from the suggested list, the timeline will not be re-renderd.
    Along with that I did some changes to be sure that the same thing will work if the user toggle follow/unfollow button in a visited profile and then click on home icon in the main header to return back to his dashboard.
    
    below is a list for the files that have been changed for fixing the bug:
        - pages/sign-up.js
        - pages/dashboard.js
        - components/header.js
        - components/timeline.js
        - post/add-comment.js
        - sidebar/index.js
        - sidebar/suggestions.js
        - sidebar/suggested-profile.js

### Minor
1. Adding infiinet scroll feature to the timeline.js component.  
2. Rename some methods in firebase.js in service folder.
3. Rename some methods that called from useEffects in some compoenents.
4. Rename the returned values from use-auth-listener inside hooks folder. 
5. Adding global-app-actions.js inside services folder to hold all common actions that could be shred beteween multiple componenets.
6. Remove the toggleFollow function from firebase.js in service folder. 


