import { useState, useRef, useEffect } from 'react'
import './App.css'

const portfolioData = {
  projects: {
    title: 'Projects',
    content: [
      '1. 💻 Antid Old Portfolio (React, Vite) – https://antid-website-v8.vercel.app/',
      '2. 🧭 Orbio Add Position E2E Flow – https://orbio-one.vercel.app/',
      '3. 🧰 DevToolbox (Prototyping exercise) – https://devtoolbox-two.vercel.app/'
    ]
  },
  about: {
    title: 'About Me',
    content: [
      '🎨 Bridging Design & Code',
      'Crafting exceptional digital experiences through the intersection of design and code.',
      '15+ years transforming ideas into pixel-perfect, performant products.',
      '',
      '✨ Available for new projects',
      '',
      '👋 I\'m Alex Martinez, a design engineer who bridges the gap between design',
      'and development, creating digital experiences that are both beautiful and functional.',
      '',
      '🎓 After graduating as a Graphic Designer and System Engineer in 2007, I evolved',
      'my craft through branding, motion graphics, and eventually found my passion at',
      'the intersection of design and code.',
      '',
      '🌍 Over 15 years, I\'ve had the privilege of working with big brands, startups,',
      'and agencies worldwide, helping them transform ideas into exceptional digital products.',
      '',
      '⚡ Expertise: React, Next.js, TypeScript, Tailwind CSS, Design Systems,',
      'Motion Design, Accessibility and Performance.'
    ]
  },
  contact: {
    title: 'Let\'s ship fast!',
    content: [
      '🚀 I\'m currently available for freelance projects and full-time opportunities.',
      'Let\'s discuss how we can work together to create something amazing.',
      '',
      '🐙 GitHub: https://github.com/antid',
      '💼 LinkedIn: https://www.linkedin.com/in/alex-martinez-b4335729/',
      '✉️ Email: antid at gmail.com'
    ]
  }
}

function App() {
  const urlRegex = /(https?:\/\/[^\s]+)/g

  const [history, setHistory] = useState([
    '                   /                                                            ',
    '                  /%%,                                                         ',
    '                  /%%%%*                                                        ',
    '                  /%%%%%%.                                                      ',
    '                  /%%/%%%%%(                                                   ',
    '       %%%%%%%%%%%%%%%, ,%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#    ',
    '     ,%%%#,     (%%%%%,    %%%%%*   ,#%(            /%/   /%%*         ,/%%%%%, ',
    '    ,%%%%        #%%%%,      %%%     #%%%###    /##%%%.   .%%     (###/    %%%%*',
    '    %%%%.   %%    %%%%,       ,#     #%%%%%%    (%%%%%.   .%%     #%%%%%    *%%%',
    '   %%%%/   #%%(   .%%%,    %(        #%%%%%%    (%%%%%.   .%%     #%%%%%    *%%%',
    "  (%%%#            /%%,    %%%/      #%%%%%%    (%%%%%.   .%%              %%%%*",
    ' /%%%.    %%%%%%*   *%/   *%%%%%#    #%%%%%%,  .#%%%%%/   /%%,         ,*%%%%%# ',
    '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#  #%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%/   ',
    '                                (%%%/#%%%#((((((((((((((((((((((((((.           ',
    '                                  .%%%%%%                                      ',
    '                                    *%%%%                                      ',
    '                                      /%%                                        ',
    '',
    '👋 Hi! I\'m Alex Martinez and this is an interactive CLI-style portfolio showcasing my work as a Design Engineer.',
    'Navigate through my projects, process, and experience using commands.',
    '',
    'Type "help" or press Ctrl+H to see available commands.'
  ])
  const [currentPage, setCurrentPage] = useState('about')
  const [input, setInput] = useState('')
  const terminalRef = useRef(null)
  const inputRef = useRef(null)
  const commandsWrapperRef = useRef(null)
  const [showCommandsOverflow, setShowCommandsOverflow] = useState(false)

  const pages = Object.keys(portfolioData)

  const commands = {
    help: () => [
      'Available commands:',
      'help              - Show this help message',
      'clear             - Clear the terminal',
      'projects          - Show projects',
      'about             - About me',
      'contact           - Contact information',
      'exit              - Close the terminal',
      ''
    ],
    clear: () => {
      return []
    },
    exit: () => ['Thanks for visiting! Goodbye.', ''],
    projects: () => portfolioData.projects.content,
    about: () => portfolioData.about.content,
    contact: () => portfolioData.contact.content,
  }

  const renderLineWithLinks = (line) => {
    if (typeof line !== 'string') return line
    const parts = []
    let lastIndex = 0
    const punctSet = '.,);]!?'
    for (const match of line.matchAll(urlRegex)) {
      const start = match.index || 0
      const url = match[0]
      if (start > lastIndex) parts.push(line.slice(lastIndex, start))
      let display = url
      let trailing = ''
      while (display.length && punctSet.includes(display.slice(-1))) {
        trailing = display.slice(-1) + trailing
        display = display.slice(0, -1)
      }
      parts.push(<a key={`link-${start}`} href={display} target="_blank" rel="noopener noreferrer">{display}</a>)
      if (trailing) parts.push(trailing)
      lastIndex = start + url.length
    }
    if (lastIndex < line.length) parts.push(line.slice(lastIndex))
    return parts.length ? parts : line
  }

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    
    if (!trimmed) return

    if (trimmed === 'clear') {
      setHistory([
        '                   /                                                            ',
        '                  /%%,                                                         ',
        '                  /%%%%*                                                        ',
        '                  /%%%%%%.                                                      ',
        '                  /%%/%%%%%(                                                   ',
        '       %%%%%%%%%%%%%%%, ,%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#    ',
        '     ,%%%#,     (%%%%%,    %%%%%*   ,#%(            /%/   /%%*         ,/%%%%%, ',
        '    ,%%%%        #%%%%,      %%%     #%%%###    /##%%%.   .%%     (###/    %%%%*',
        '    %%%%.   %%    %%%%,       ,#     #%%%%%%    (%%%%%.   .%%     #%%%%%    *%%%',
        '   %%%%/   #%%(   .%%%,    %(        #%%%%%%    (%%%%%.   .%%     #%%%%%    *%%%',
        "  (%%%#            /%%,    %%%/      #%%%%%%    (%%%%%.   .%%              %%%%*",
        ' /%%%.    %%%%%%*   *%/   *%%%%%#    #%%%%%%,  .#%%%%%/   /%%,         ,*%%%%%# ',
        '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#  #%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%/   ',
        '                                (%%%/#%%%#((((((((((((((((((((((((((.           ',
        '                                  .%%%%%%                                      ',
        '                                    *%%%%                                      ',
        '                                      /%%                                        ',
        '',
        '👋 Hi! I\'m Alex Martinez and this is an interactive CLI-style portfolio showcasing my work as a Design Engineer.',
        'Navigate through my projects, process, and experience using commands.',
        '',
        'Type "help" or press Ctrl+H to see available commands.'
      ])
      setInput('')
      return
    }

    const newHistory = [...history, `$ ${cmd}`]

    if (commands[trimmed]) {
      const output = commands[trimmed]()
      if (output.length > 0) {
        newHistory.push('')
        newHistory.push(...output)
        newHistory.push('--------------------------------')
        newHistory.push('')
      }
      if (trimmed !== 'clear') {
        setCurrentPage(trimmed === 'projects' ? 'projects' : trimmed === 'about' ? 'about' : trimmed === 'contact' ? 'contact' : currentPage)
      }
    } else {
      newHistory.push(`Command not found: ${trimmed}. Type "help" for available commands.`)
    }

    newHistory.push('')
    setHistory(newHistory)
    setInput('')
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const firstBlankIndex = history.findIndex((l) => l === '')

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!e.ctrlKey && !e.metaKey) return
      
      const keyMap = {
        'h': 'help',
        'c': 'clear',
        'p': 'projects',
        'a': 'about',
        'o': 'contact',
        'e': 'exit'
      }
      
      const command = keyMap[e.key.toLowerCase()]
      if (command) {
        e.preventDefault()
        handleCommand(command)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [history, currentPage])

  useEffect(() => {
    const checkOverflow = () => {
      const el = commandsWrapperRef.current
      if (!el) return setShowCommandsOverflow(false)
      const hasOverflow = el.scrollWidth > el.clientWidth + 1
      // show indicator only when there's content overflowing to the right
      setShowCommandsOverflow(hasOverflow && el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    const el = commandsWrapperRef.current
    if (el) el.addEventListener('scroll', checkOverflow)
    return () => {
      window.removeEventListener('resize', checkOverflow)
      if (el) el.removeEventListener('scroll', checkOverflow)
    }
  }, [])

  return (
    <div className="cli-container" onClick={(e) => {
      // Only focus input if no text is currently selected
      const selection = window.getSelection().toString()
      if (!selection && (e.target === terminalRef.current || e.target.className === 'cli-container')) {
        inputRef.current?.focus()
      }
    }}>
      <div className="cli-terminal" ref={terminalRef}>
        {history.map((line, idx) => {
          const isAscii = firstBlankIndex !== -1 && idx < firstBlankIndex
          return (
            <div key={idx} className={"terminal-line" + (isAscii ? ' ascii-art' : '')}>
              {renderLineWithLinks(line)}
            </div>
          )
        })}
        <div className="terminal-input">
          <span className="prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            autoCapitalize="off"
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => {
              // Scroll to bottom on mobile when input is focused
              setTimeout(() => {
                if (terminalRef.current) {
                  terminalRef.current.scrollTop = terminalRef.current.scrollHeight
                }
              }, 100)
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCommand(input)
              }
            }}
            autoFocus
            className="input-field"
          />
        </div>
      </div>
      <div className={`cli-commands ${showCommandsOverflow ? 'scrollable' : ''}`}>
        <div className="commands-wrapper" ref={commandsWrapperRef} onScroll={() => {
          // onScroll will trigger the effect's listener as well, but keep this for immediate feedback
          const el = commandsWrapperRef.current
          if (!el) return
          const hasOverflow = el.scrollWidth > el.clientWidth + 1
          setShowCommandsOverflow(hasOverflow && el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
        }}>
          <span className="command-item" onClick={() => handleCommand('help')}>[<span className="cmd-key">h</span>]elp</span>
          <span className="command-item" onClick={() => handleCommand('clear')}>[<span className="cmd-key">c</span>]lear</span>
          <span className="command-item" onClick={() => handleCommand('projects')}>[<span className="cmd-key">p</span>]rojects</span>
          <span className="command-item" onClick={() => handleCommand('about')}>[<span className="cmd-key">a</span>]bout</span>
          <span className="command-item" onClick={() => handleCommand('contact')}>c[<span className="cmd-key">o</span>]ntact</span>
          <span className="command-item" onClick={() => handleCommand('exit')}>[<span className="cmd-key">e</span>]xit</span>
        </div>
        <div className="copyright">© 2026 All rights reserved</div>
      </div>
    </div>
  )
}

export default App
