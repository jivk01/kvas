import fs from "fs/promises"

export default async function getKvasPrice() {
    console.log("fetching atb")
    const url = "https://www.atbmarket.com/product/kvas-2l-svoa-linia-hlibnij"
    const page = await (await fetch(url)).text()

    const regExp = /\"price\": \"(?<number>[\d\.]+)\"/
    const price = page.match(regExp)?.[1]
    
    if (!price) throw new Error("unknown error")
    if (isNaN(price)) throw new Error("price isn't number")

    return +price
}