const fs = require("fs")
const path = require("path")
class Logger {
    constructor() {
        this.logsDir = path.join(__dirname, "logs")
    }
    getTodayDate() {
        const today = new Date()
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, "0")
        const day = String(today.getDate()).padStart(2, "0")
        return `${year}-${month}-${day}`
    }
    getLogFilePath() {
        const today = this.getTodayDate()
        return path.join(this.logsDir, `${today}.json`)
    }
    formatTimestamp(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleString()
    }
    writeLog(logEntry) {
        const logFilePath = this.getLogFilePath()
        try {
            let logs = []
            if (fs.existsSync(logFilePath)) {
                const fileContent = fs.readFileSync(logFilePath, "utf8")
                logs = JSON.parse(fileContent)
            }
            logs.push(logEntry)
            fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2))
        } catch (error) {
            console.error("Error writing log:", error.message)
        }
    }
    createLogEntry(message, aiThoughts = null, aiResponse = null, aiDuration = null, aiModel = null) {
        const logEntry = {
            timestamp: this.formatTimestamp(message.createdTimestamp),
            channel: {
                name: message.channel.name
            },
            user: {
                username: message.author.username,
                displayName: message.member?.displayName || message.author.username
            },
            content: message.content
        }
        if (message.attachments.size > 0) {
            logEntry.attachments = message.attachments.map(att => ({
                name: att.name,
                url: att.url,
                size: att.size
            }))
        }
        if (message.channel.isThread()) {
            logEntry.thread = {
                name: message.channel.name,
                parentId: message.channel.parentId
            }
        }
        if (aiThoughts || aiResponse) {
            logEntry.aiProcessing = {
                thoughts: aiThoughts,
                response: aiResponse,
                model: aiModel
            }
            if (aiDuration) {
                logEntry.aiProcessing.duration = `${aiDuration}ms`
            }
        }
        return logEntry
    }
}
module.exports = Logger 
