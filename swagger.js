const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "VeterinaryAPI",
    version: "1.0.0",
    description: "Documentación con Swagger",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "Daniel Alejandro Guerra - Silvana Gutierrez Chaparro - Ian Mateo Rodriguez",
      url: "https://ni.idea.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Server to Training",
    },
  ],
};
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
