import server from "./server";
import settings from "./config/settings";
import {connectToDatabase} from "./config/database";

server.listen(settings.port, async () => {
    console.log(`Listening on port ${settings.port}`);
    await connectToDatabase();
})
