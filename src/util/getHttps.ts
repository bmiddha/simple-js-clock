import https from "https";

function getFromUrl(options: {}): Promise<any> {
    return new Promise((resolve, reject) => {
        https.request(options, (response) => {
            let str = "";
            response.on("data", (chunk) => {
                str += chunk;
            });
            response.on("end", () => {
                resolve(str);
            });
            response.on("error", (err => reject(err)));
        }).end();
    });
}

export default getFromUrl;