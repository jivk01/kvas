import "dotenv/config"
import { Telegraf } from "telegraf"
import ignoreOldMessages from "telegraf-ignore-old-messages"

import * as middlewares from "./middlewares/index.js"

import getExchangeRate from "./utils/get-exchange-rate.js"

const BOT_TOKEN = process.env.BOT_TOKEN
const bot = new Telegraf(BOT_TOKEN)

bot.use(ignoreOldMessages(1))

bot.use(middlewares.checkText)
bot.use(middlewares.getCurrency)
bot.use(middlewares.convert)


bot.launch({
    allowedUpdates: ["message"]
})