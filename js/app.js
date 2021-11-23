import { html, render } from '../js/spux.js'
import Navbar from '../components/Navbar.js'
import Footer from '../components/Footer.js'

const creditsUri = './webcredits/webcredits.json'

globalThis.spux = {}
spux.month = []
spux.monthTotal = 0
spux.year = []
spux.yearTotal = 0
spux.items = []
spux.totals = []

spux.date = new Date().getDate()

spux.all = []
spux.today = []

const genesis = 'gitmark:48a5e0fbf0cf4e660d10d20544e67e003eb973bdb80589cc6560d1bd6c6f1cbb:1'

fetch(creditsUri)
  .then(response => response.json())
  .then(log => {
    console.log(log)
    spux.items = log.map(i => {
      let d = new Date(i.timestamp * 1000)
      let points = parseInt(i.amount)
      let date = d.getDate()
      var ret = {
        time: d,
        points: points,
        description: i.description
      }

      let month = d.getMonth()
      let fullYear = d.getFullYear()

      if (month === undefined) return

      if (!spux.all[fullYear]) spux.all[fullYear] = []
      if (!spux.all[fullYear][month]) spux.all[fullYear][month] = []
      if (!spux.all[fullYear][month][date])
        spux.all[fullYear][month][date] = 0
      spux.all[fullYear][month][date] += points

      // today
      if (
        d.getDate() === new Date().getDate() &&
        d.getMonth() === new Date().getMonth() &&
        d.getFullYear() === new Date().getFullYear()
      ) {
        const hour = d.getHours()
        if (!spux.today[hour]) spux.today[hour] = 0
        spux.today[hour] += points
      }

      return ret
    })

    console.log(spux.items)

    renderAll()
  })

function renderAll() {
  spux.month = spux.items?.filter(
    i =>
      i.time.getMonth() === new Date().getMonth() &&
      i.time.getFullYear() === new Date().getFullYear()
  )
  spux.month.forEach(i => {
    // console.log(i)
    let date = i.time.getDate()
    spux.totals[date] = spux.totals[date] || 0
    spux.totals[date] += i.points
    spux.monthTotal += i.points
  })

  console.log('today', spux.today)

  render(
    html`
      <${Navbar} title="Chores" />

      <pre>
        Hour${'\n'}${'\n'}

        ${spux.today.map(
      (i, j) =>
        html`
                    ${j} ${i}${'\n'}
                  `
    )}
      </pre
      >

      <pre>
        Day${'\n'}${'\n'}

        ${spux.totals.map(
      (i, j) =>
        html`
                    ${j} ${i}${'\n'}
                  `
    )}
      </pre
      >

      <pre>
        Month${'\n'}${'\n'}

        ${spux.all[new Date().getFullYear()].map((i, j) => {
      return html`
                  ${j + 1}${' '}
                  ${i.reduce((total, num) => {
        return Math.abs(total) + Math.abs(num)
      })}${'\n'}
                `
    })}
      </pre
      >

      <pre>
        Month Tot: ${spux.monthTotal} ${'\n'}
        Daily Ave: ${spux.monthTotal / spux.date}${'\n'}
      </pre
      >

      <${Footer} text="Chores App" genesis=${genesis.toString()} />

      `,
    document.body
  )
}

renderAll()
