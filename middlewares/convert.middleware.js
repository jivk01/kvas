import getExchangeRate from "../utils/get-exchange-rate.js"

import { Composer } from "telegraf"
const composer = new Composer()

composer.use(async (ctx, next) => {
    const data = ctx.data
    const exchangeRate = await getExchangeRate()

    const hrivnias = data.currency === "uah" ? +data.value : Math.round(data.value * exchangeRate[data.currency] * 100) / 100
    const dollars = Math.round(hrivnias / exchangeRate.usd * 100) / 100
    const euros = Math.round(hrivnias / exchangeRate.eur * 100) / 100
    const kvasses = Math.round(hrivnias / exchangeRate.kvs * 100) / 100

    const message = 
`<strong>${data.value} ${data.currency.toUpperCase()}</strong>

🇺🇦: ${hrivnias} UAH
🇺🇸: ${dollars} USD
🇪🇺: ${euros} EUR

🍺: ${kvasses} KVS
<strong>Вистачить на</strong>
${Math.round(kvasses * 1.5 * 10) / 10}-${Math.round(kvasses * 2 * 10) / 10} днів
${Math.round(kvasses / 2 * 10) / 10} днів в компанії`

    const message_id = ctx.message.message_id
    await ctx.reply(message, {reply_to_message_id: message_id, parse_mode: "HTML"})
})

export default composer