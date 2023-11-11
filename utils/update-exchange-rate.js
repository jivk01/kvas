import getKvasPrice from "./get-kvas-price.js"
import getCurrency from "./get-currency.js"

export default async function updateExchangeRate() {
    try {
        const kvs = await getKvasPrice()
        const { nextUpdate, usd, eur } = await getCurrency()

        return {
            nextUpdate: nextUpdate,
            kvs: kvs,
            usd: usd,
            eur: eur
        }
    } catch (e) {
        console.error(e)
        return null
    }
}