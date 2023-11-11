import fs from "fs"
import updateExchangeRate from "./update-exchange-rate.js"


let cache
if (fs.existsSync("./price.json")) {
    try {
        cache = JSON.parse(await fs.promises.readFile("./price.json", {encoding: "utf-8"}))
    } catch {}
}

export default async function getExchangeRate() {
    if (cache) {
        if (Date.now() > cache.nextUpdate * 1000) {
            try {
                const data = await updateExchangeRate()
                if (data) cache = data
                await fs.promises.writeFile("./price.json", JSON.stringify(cache, null, 4))
            } catch (e) {
                console.error(e)
            }
        }

        return cache
    } else {
        const data = await updateExchangeRate()
        if (!data) throw new Error("unknown error")
        cache = data
        await fs.promises.writeFile("./price.json", JSON.stringify(cache, null, 4))
        return cache
    }
}