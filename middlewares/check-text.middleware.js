import { Composer } from "telegraf"
const composer = new Composer()

composer.use(async (ctx, next) => {
    if (ctx.message?.text) next()
})

export default composer