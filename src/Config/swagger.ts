import {Express} from "express";
import swaggerUi from "swagger-ui-express";

const configSwagger = (app: Express) => {
    app.use("/docs", swaggerUi.serve, async (req, res) => res.send(
        swaggerUi.generateHTML(await import("../_generated/swagger.json"))
    ))
}

export default configSwagger


