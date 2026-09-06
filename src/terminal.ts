type TerminalCommandEvent = CustomEvent<{ command: string }>
type TerminalCommandHandler = (args: string[], context: TerminalContext) => string[]

type TerminalContext = {
  files: Map<string, string>
  activeFile: string | null
}

export const virtualFileSystem = new Map<string, string>([
  ['/me.txt', [
    '世有八气，其中炎热之气与寒冰之气分别处于世界南方荒漠与北方雪原。',
    '一日两气于中原相遇，凝聚成人形，此为冰火使者。',
    '都是什么玩意',
    '学习过 Assembly, C, C++, C#, Go, Java, JavaScript, Python',
    '会玩 After Effect'
  ].join('\n')]
])

const context: TerminalContext = { files: virtualFileSystem, activeFile: null }
const commandHandlers = new Map<string, TerminalCommandHandler>()
const commandDescriptions = new Map<string, string>()

export const registerTerminalCommand = (name: string, handler: TerminalCommandHandler, description = '') => {
  commandHandlers.set(name.toLowerCase(), handler)
  commandDescriptions.set(name.toLowerCase(), description)
}

const appendTerminalLine = (output: HTMLElement, text: string, className = '') => {
  const line = document.createElement('p')
  if (className) line.className = className
  line.textContent = text
  output.append(line)
}

const appendCommandLine = (output: HTMLElement, command: string) => {
  const line = document.createElement('p')
  line.className = 'terminal-command-line'
  const user = document.createElement('span')
  user.className = 'prompt-user'
  user.textContent = 'root@iafenvoy'
  const path = document.createElement('span')
  path.className = 'prompt-path'
  path.textContent = ' ~'
  const value = document.createElement('span')
  value.className = 'prompt-command'
  value.textContent = ` ${command}`
  line.append(user, path, value)
  output.append(line)
}

const normalizePath = (path: string) => path.startsWith('/') ? path : `/${path}`

export const mountVirtualFile = (path: string, content: string) => {
  virtualFileSystem.set(normalizePath(path), content)
}

registerTerminalCommand('echo', (args) => [args.join(' ')], '输出文本')
registerTerminalCommand('vim', (args, terminalContext) => {
  const path = normalizePath(args[0] ?? '')
  const file = terminalContext.files.get(path)
  if (file === undefined) return [`vim: ${path}: 文件不存在`]
  terminalContext.activeFile = path
  return file.split('\n')
}, '查看虚拟文件')
registerTerminalCommand('help', () => [...commandHandlers].map(([name]) => `  ${name.padEnd(12)} ${commandDescriptions.get(name) ?? ''}`), '显示帮助')

const runCommand = (output: HTMLElement, command: string, render = true) => {
  if (render) appendCommandLine(output, command)
  const [name = '', ...args] = command.split(/\s+/)
  const handler = commandHandlers.get(name.toLowerCase())
  if (!handler) {
    if (render) appendTerminalLine(output, `${name}: command not found`, 'terminal-command-error')
    return
  }
  const result = handler(args, context)
  if (render) result.forEach((line) => appendTerminalLine(output, line, 'terminal-command-result'))
}

const resizeInput = (input: HTMLInputElement) => {
  input.style.width = `${Math.max(0.35, input.value.length + 1)}ch`
}

const scrollTerminalToBottom = (output: HTMLElement) => {
  const body = output.closest<HTMLElement>('.terminal-body')
  if (body) body.scrollTop = body.scrollHeight
}

export const initTerminalInput = () => {
  const terminal = document.querySelector<HTMLElement>('.terminal-window')
  const input = document.querySelector<HTMLInputElement>('#terminal-input')
  const output = document.querySelector<HTMLElement>('#terminal-output')
  if (!terminal || !input || !output) return

  const history: string[] = []
  let historyIndex = -1

  runCommand(output, 'vim /me.txt', false)
  resizeInput(input)
  input.addEventListener('input', () => resizeInput(input))
  terminal.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) return
    input.focus()
  })
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const command = input.value.trim()
      if (!command) {
        appendCommandLine(output, '')
        scrollTerminalToBottom(output)
        return
      }
      history.push(command)
      historyIndex = -1
      runCommand(output, command)
      scrollTerminalToBottom(output)
      input.value = ''
      resizeInput(input)
      input.dispatchEvent(new CustomEvent<TerminalCommandEvent['detail']>('terminal-command', { detail: { command } }))
      return
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      if (!history.length) return
      event.preventDefault()
      historyIndex = event.key === 'ArrowUp'
        ? Math.min(history.length - 1, historyIndex + 1)
        : Math.max(-1, historyIndex - 1)
      input.value = historyIndex < 0 ? '' : history[history.length - 1 - historyIndex]
      resizeInput(input)
    }
  })
}
