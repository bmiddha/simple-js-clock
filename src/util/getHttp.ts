import http from "http";

function getHttp(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        http.request(url, (response) => {
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

export default getHttp;