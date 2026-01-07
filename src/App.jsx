import { useState, useRef, useEffect } from 'react'
import './App.css'

const portfolioData = {
  work: {
    title: 'Featured Work',
    content: [
      '💼 A curated selection of projects that showcase my design and development capabilities.',
      '',
      '1. 🌐 Company Website (Design & Development) - Stratum Security',
      '2. 📝 Code Snippets App (Product Design) - Codiga',
      '3. 🔍 Static Code Analysis (Product Design) - Codiga',
      '4. 🎯 XFIL (UX • UI • Design System) - SaaS • Security Tools',
      '5. 🎨 Incetar (Branding • Company Website)',
      '6. 📖 Design System (Design System Definition) - Codiga',
      '',
      'Use: project <number> for more details'
    ]
  },
  process: {
    title: 'My Process',
    content: [
      '🛠️ A proven methodology refined over 15 years:',
      '',
      '01 🔎 Discovery & Research',
      '   Deep diving into user needs through research, interviews, and competitive analysis.',
      '',
      '02 💡 Ideation & Strategy',
      '   Defining problems, ideating solutions, and creating strategic frameworks.',
      '',
      '03 🎨 Design & Development',
      '   Crafting high-fidelity designs and building production-ready code.',
      '',
      '04 ✅ Testing & Launch',
      '   Rigorous testing, refinement, and deployment.'
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
      'Motion Design, Accessibility, Performance, User Research'
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
      '✉️ Email: available on GitHub'
    ]
  }
}

function App() {
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
    'antid.co — Portfolio CLI',
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
      'work              - Show featured work',
      'process           - Show my process',
      'about             - About me',
      'contact           - Contact information',
      'project <number>  - View specific project (1-6)',
      'exit              - Close the terminal',
      ''
    ],
    clear: () => {
      return []
    },
    exit: () => ['Thanks for visiting! Goodbye.', ''],
    work: () => portfolioData.work.content,
    process: () => portfolioData.process.content,
    about: () => portfolioData.about.content,
    contact: () => portfolioData.contact.content,
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
        'antid.co — Portfolio CLI',
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

    if (trimmed.startsWith('project ')) {
      const projectNum = parseInt(trimmed.split(' ')[1])
      if (projectNum >= 1 && projectNum <= 6) {
        setCurrentPage('work')
        const projectsInfo = {
          1: ['Company Website', 'Design & Development', 'Stratum Security', 'A modern company website showcasing brand identity and user-friendly design.'],
          2: ['Code Snippets App', 'Product Design', 'Codiga', 'An innovative platform for managing and sharing code snippets with team collaboration features.'],
          3: ['Static Code Analysis', 'Product Design', 'Codiga', 'A powerful tool for analyzing code quality and identifying potential issues before deployment.'],
          4: ['XFIL', 'UX • UI • Design System', 'SaaS • Security Tools', 'A comprehensive security tool with intuitive interface and robust design system.'],
          5: ['Incetar', 'Branding • Company Website', '', 'Complete brand identity development and website design for a modern startup.'],
          6: ['Design System', 'Design System Definition', 'Codiga', 'A scalable design system ensuring consistency across all digital products.']
        }
        const project = projectsInfo[projectNum]
        newHistory.push('', `Project ${projectNum}: ${project[0]}`, `Type: ${project[1]}`, `Company: ${project[2]}`, `${project[3]}`, '')
      } else {
        newHistory.push('Project not found. Use: project <1-6>')
        newHistory.push('')
      }
    } else if (commands[trimmed]) {
      const output = commands[trimmed]()
      if (output.length > 0) {
        newHistory.push('')
        newHistory.push(...output)
        newHistory.push('')
      }
      if (trimmed !== 'clear') {
        setCurrentPage(trimmed === 'work' ? 'work' : trimmed === 'process' ? 'process' : trimmed === 'about' ? 'about' : trimmed === 'contact' ? 'contact' : currentPage)
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
        'w': 'work',
        'p': 'process',
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
              {line}
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
          <span className="command-item" onClick={() => handleCommand('work')}>[<span className="cmd-key">w</span>]ork</span>
          <span className="command-item" onClick={() => handleCommand('process')}>[<span className="cmd-key">p</span>]rocess</span>
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
