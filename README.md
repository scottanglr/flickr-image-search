# Overview

This project was created to showcase a high-quality frontend built with React. The application allows users to search images on flickr using its public feed API. This application was bootstrapped with create-react-app.

## Usability Improvements

Usability wise it would be better to show more images on the screen and require less scrolling. Having just a maximum of 3 columns does not adequately fill the space. However, filling the screen up with more columns means that I would be unable to showcase lazy loading which happens when you scroll down. The issue is that the public flickr feed is limited to just 20 images, which means that the Google Images style lazy loading would be missed. If more pages could be requested from the feed, then the the user could infinitely scroll and have the images take up the full width.

## Code Improvements

Further component testing should be introduced. Tests have been written for all components, and all render successfully according to their props, however state changes are not comprehensively tested. All states of a component should be tested to ensure that HTML elements are displayed as expected.

If the user scrolls quickly then there is no guarantee that columns will be an equal size. This could be mitigated by ensuring that images are added to the shortest column. However, if the flickr feed was not limited to 20 images then any whitespace would be filled by the component. 

## Available Scripts

In the project directory, you can run:

### `yarn dev-frontend`

Runs the frontend of the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn dev-backend`

Runs the backend Node.js server to connect to the flickr API. The React development server will proxy API requests through on port 3001.

### `yarn test-frontend`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn dev`

Runs the backend and frontend development servers concurrently.

### `yarn build`

Builds the frontend app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

The Node.js server does not need to be built. After this command has been run `yarn start` can be called to serve the project.

### `yarn start`

Runs the Node.js server in production and serves resources from the build directory. `yarn build` must be run first

### `yarn eject-frontend`

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

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
