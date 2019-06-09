import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

function getMessages(): Promise<{}> {
    return new Promise((resolve, reject): void => {
        const url = "";
        fetch(url).then((res): {} => res.json()).then((result: {}): void => resolve(result))
            .catch((err): void => reject(err));
    });
}

export default getMessages;