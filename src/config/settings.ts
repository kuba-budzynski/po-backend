require("dotenv").config({ silent: true });

// Provide system variables for an app in a single object

const settings = {
    currentEnv: process.env.NODE_ENV || "development",
    port: process.env.PORT || 7000,
    db: {
        port: process.env.MONGODB_PORT || 27017,
        hostname: process.env.MONGODB_HOSTNAME || "",
        username: process.env.MONGODB_USERNAME || "",
        password: process.env.MONGODB_PASSWORD || "",
        defaultDB: process.env.MONGODB_DEFAULTDB || "",
    },
    server: {
        ip: "145.239.83.230"
    },
    authSecret: process.env.AUTH_SECRET || "",
}

export default settings;
