import https from 'https'
import cron from 'cron'

const job = new cron.CronJob('0 */14 * * * *', () => {
  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200)
        console.log(`Cron Job: Successfully pinged ${process.env.API_URL}`)
      else
        console.log(
          `Cron Job: Failed to ping ${process.env.API_URL} - Status Code: ${res.statusCode}`
        )
    })
    .on('error', (err) => {
      console.error(
        `Cron Job: Error pinging ${process.env.API_URL} - ${err.message}`
      )
    })
})

export default job
