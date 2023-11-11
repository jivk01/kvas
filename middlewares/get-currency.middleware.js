import { Composer } from "telegraf"
const composer = new Composer()

composer.use(async (ctx, next) => {
    const regExp = /(?<value>\d+(\.\d+)?)\s?(?<currency>₴|грн|гривн|гривень|uah|hryvnia|\$|долар|usd|dollar|€|євро|eur|квас|kvas|kvs)/i
    const query = ctx.message.text.match(regExp)
    if (!query) return

    const groups = query.groups
    if (!(groups.value && groups.currency)) return

    groups.currency = groups.currency.toLowerCase()
    if (/(₴|грн|гривн|гривень|hryvnia)/.test(groups.currency)) groups.currency = "uah"
    if (/(\$|долар|dollar)/.test(groups.currency)) groups.currency = "usd"
    if (/(€|євро)/.test(groups.currency)) groups.currency = "eur"
    if (/(квас|kvas)/.test(groups.currency)) groups.currency = "kvs"

    ctx.data = groups
    next()
})

export default composer