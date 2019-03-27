const smartcontractapp = require('smartcontract-app')
const solcjs = require('solc-js')

const invoicejournal = require('../')

document.body.innerHTML = `
<style>
  .loadingspinner {
    pointer-events: none;
    width: 2.5em;
    height: 2.5em;
    border: 0.4em solid transparent;
    border-color: #eee;
    border-top-color: #3e67ec;
    border-radius: 50%;
    -webkit-animation: loadingspin 1s linear infinite;
            animation: loadingspin 1s linear infinite;
  }
  @-webkit-keyframes loadingspin {
    100% {
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
    }
  }
  @keyframes loadingspin {
    100% {
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
    }
  }
  body {
    height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    background-color: #2c323c;
  }
</style>`

start(localStorage.output)

async function start (output) {
  const spinner = document.createElement('div')
  document.body.appendChild(spinner)
  if (!output) output = await loadContract(spinner)
  const element = smartcontractapp(JSON.parse(output))
  setTimeout(() => {
    spinner.parentElement.replaceWith(element)
  }, 50)
}
async function loadContract (spinner) {
  spinner.className = 'loadingspinner'
  const select = await solcjs.versions()
  const { releases, nightly, all } = select
  const compile = await solcjs(releases[0])
  const output = await compile(invoicejournal.template)
  return localStorage.output = JSON.stringify(output)
}
