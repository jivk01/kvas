const EXCHANGE_API_KEY = process.env.EXCHANGE_API_KEY

export default async function getCurrency() {
    console.log("fetching api")
    const url = `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/UAH`
    const data = await (await fetch(url)).json()

    if (!data) throw new Error("unknown error")

    const usd = Math.round(1 / data.conversion_rates.USD * 100) / 100
    const eur = Math.round(1 / data.conversion_rates.EUR * 100) / 100
    const nextUpdate = data.time_next_update_unix

    return {
        usd: usd,
        eur: eur,
        nextUpdate: nextUpdate
    }
}