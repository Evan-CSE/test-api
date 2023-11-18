import mongoose from "mongoose";
import APP from "./app";
import config from "./app/config";


async function main() {
    try {
        await mongoose.connect(config.MONGODB_BASE_URL as string, {
            serverSelectionTimeoutMS: 3000
        })
        .then(() => console.log('Connected to mongodb'));
        APP.listen(config.PORT, () => {
            console.log(`inside app`)
            console.log(`Listening on port: ${config.PORT}`);
        })
    } catch (err) {
        console.log(`Encountered error: ${err}`);
    }

}

main();