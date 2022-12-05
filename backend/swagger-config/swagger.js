import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  info: {
    title: 'REST API for url-shortener', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'This is the REST API for my url-shortener', // short description of the app
  },
  host: 'url-shortener-slink.herokuapp.com', // the host or url of the app
  basePath: '/', // the basepath of your endpoint
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./swagger-docs/**/*.yaml'],
};
// initialize swagger-jsdoc
export default swaggerJSDoc(options);