import { html } from 'https://unpkg.com/spux?module'

export default function Footer(props) {
  if (props.genesis) {
    var tx = props.genesis.toString().split(':')[1]
    return html`
    <footer>
      ${props.text} | Genesis | <i><a style="color:blue" target="_blank" href="https://gitmark.info/${tx}">${props.genesis}</a></i> | <a style="color:blue" target="_blank" href="https://git-mark.com/">Gitmark</a>
    </footer>`
  } else {
    return html`
    <footer>
      ${props.text}
    </footer>
    `
  }
}