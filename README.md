To start the application in development mode:

- Create a copy of .env.example and name it .env.development
- Change values inside this file if necessary
- Run `yarn start`

To check your branch for lint errors, static tests and unit tests, run `yarn ci`.

To deploy the application to staging or production:

- Create a copy of .env.example and name it .env.staging or .env.production
- Change values inside this file if necessary
- Run `yarn build-stg` or `yarn build`
- Export the `dist` folder to your server or CDN
- Set it up so that all routes forward to `index.html` so that the route is controlled internally by `react-router-dom`
