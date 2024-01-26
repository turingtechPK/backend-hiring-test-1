import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import morgan  from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const middleware = require('express').Router();
import { Request, Response, NextFunction } from "express";

const PORT = process.env.PORT || 5002;
const SERVER = process.env.SERVER || "localhost";

middleware.use(morgan("dev"));
middleware.use(function (req: Request, res: Response, next: NextFunction) {
  // Stops malformed requests (such as /%FF)
  let err = null;
  try {
    decodeURIComponent(req.path);
  } catch (e) {
    err = e;
  }
  if (err) return res.redirect('/404');
  next();
});

// CORS
middleware.use(cors({ origin: "*" }));
middleware.use(compression());

//Swagger
const swaggerDefinition = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API for Twilio Integration',
      version: '1.0.0',
      description: 'This is a REST API application to test Twilio APIs',
      servers: [{
        url: `http://${SERVER}:${PORT}`,
        description: 'Development server',
      }],
    },
  },
  apis: ["./src/controllers/*.ts", "./src/lib/*.ts"],
}

const swaggerSpec = swaggerJSDoc(swaggerDefinition);
middleware.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Parsing the body
middleware.use(bodyParser.json());
middleware.use(bodyParser.urlencoded({ extended: true }));

module.exports = middleware;
