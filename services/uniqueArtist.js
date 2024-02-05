import { appendFileSync } from "node:fs";

const path = "artists.txt";
const path2 = "artists2.txt";

const file = Bun.file(path);
const arrBuf = await file.arrayBuffer();

const decoder = new TextDecoder();
const str = decoder.decode(arrBuf);

const artists = {};

str.split("\n").map(item => {
    const [name, spotifyId] = item.split(",");
    if (artists[name] === undefined) {
        artists[name] = spotifyId;
        appendFileSync(path2, `${name},${spotifyId}\n`, "utf8");
    }
})