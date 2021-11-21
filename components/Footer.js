import { html } from 'https://unpkg.com/spux?module'

export default function Footer(props) {
  return html`
    <footer>
      <i>${props.text} ${props.genesis ? ' | genesis: ' + props.genesis : ''}</i>
    </footer>
  `
}
