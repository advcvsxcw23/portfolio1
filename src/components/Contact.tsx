import React, { useState, useEffect, useRef } from 'react';
import { Send, Linkedin, Github, Mail, Terminal } from 'lucide-react';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '> Terminal initialized...',
    '> Available commands loaded',
    '> Ready for input'
  ]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    const newOutput = [...terminalOutput, `> ${command}`];

    // Handle clear command first (special case)
    if (cmd === 'clear') {
      setTerminalOutput(['> Terminal cleared']);
      return;
    }

    // Handle help command
    if (cmd === 'help') {
      newOutput.push(`Available commands:
  connect --linkedin    Open LinkedIn profile
  connect --github     Open GitHub profile
  connect --email      Open email client
  send-message        Activate contact form
  clear               Clear terminal
  help                Show this help message`);
      setTerminalOutput(newOutput);
      return;
    }

    // Handle connect commands
    if (cmd.startsWith('connect')) {
      const arg = cmd.split('--')[1];
      switch (arg) {
        case 'linkedin':
          newOutput.push('Opening LinkedIn profile...');
          setTimeout(() => window.open('http://www.linkedin.com/in/albaraa-alolabi-0693b5278', '_blank'), 500);
          break;
        case 'github':
          newOutput.push('Opening GitHub profile...');
          setTimeout(() => window.open('https://github.com/AlBaraa-1', '_blank'), 500);
          break;
        case 'email':
          newOutput.push('Opening email client...');
          setTimeout(() => window.location.href = 'mailto:666645@gmail.com', 500);
          break;
        default:
          newOutput.push('Invalid connect command. Available options: --linkedin, --github, --email');
          newOutput.push('Example: connect --linkedin');
      }
    }
    // Handle send-message command
    else if (cmd === 'send-message') {
      newOutput.push('Message form activated. Please fill out the form below.');
      const formElement = document.querySelector('input[name="name"]') as HTMLInputElement;
      if (formElement) {
        formElement.focus();
      }
    }
    // Handle unknown commands
    else {
      newOutput.push(`Command not found: ${cmd}`);
      newOutput.push('Type "help" for available commands');
    }

    setTerminalOutput(newOutput);
    
    setTerminalOutput(newOutput);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOutput = [...terminalOutput];
    newOutput.push('> send-message --submit');
    newOutput.push('Message sent successfully! ✅');
    newOutput.push('Thank you for reaching out. I\'ll get back to you soon!');
    setTerminalOutput(newOutput);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
              Terminal Interface
            </span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Execute commands to connect with me or send a message through the terminal.
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Terminal Interface */}
          <div className="code-block">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-opacity-30" 
                 style={{ borderColor: 'var(--border)' }}>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <Terminal className="ml-4 w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                contact_terminal
              </span>
            </div>

            {/* Available Commands */}
            <div className="mb-6">
              <div className="terminal-prompt mb-2" style={{ color: 'var(--accent)' }}>
                Available Commands:
              </div>
              <div className="space-y-1 text-sm ml-4" style={{ color: 'var(--text-secondary)' }}>
                <div>connect --linkedin    [Opens LinkedIn profile]</div>
                <div>connect --github      [Opens GitHub profile]</div>
                <div>connect --email       [Opens email client]</div>
                <div>send-message         [Contact form]</div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => handleCommand('connect --linkedin')}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-300 hover:scale-105"
                style={{ 
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                  backgroundColor: 'transparent'
                }}
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </button>
              
              <button
                onClick={() => handleCommand('connect --github')}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-300 hover:scale-105"
                style={{ 
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                  backgroundColor: 'transparent'
                }}
              >
                <Github className="w-4 h-4" />
                GitHub
              </button>
              
              <button
                onClick={() => handleCommand('connect --email')}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-300 hover:scale-105"
                style={{ 
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                  backgroundColor: 'transparent'
                }}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
              
              <button
                onClick={() => handleCommand('send-message')}
                className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg-primary)'
                }}
              >
                <Send className="w-4 h-4" />
                Message
              </button>
            </div>

            {/* Terminal Output */}
            <div className="bg-black bg-opacity-50 rounded-lg p-4 h-48 overflow-y-auto font-mono text-sm">
              <div className="h-full flex flex-col">
                <div 
                  className="flex-1 overflow-y-auto scroll-smooth"
                  ref={(el) => {
                    // Auto scroll to bottom when content changes
                    if (el) {
                      el.scrollTo({
                        top: el.scrollHeight,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  {terminalOutput.map((line, index) => (
                    <div key={index} className="mb-1" style={{ color: 'var(--terminal-green)' }}>
                      {line}
                    </div>
                  ))}
                </div>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.currentTarget.elements.namedItem('command') as HTMLInputElement;
                    const command = input.value.trim();
                    if (command) {
                      handleCommand(command);
                      input.value = '';
                    }
                  }}
                  className="flex items-center mt-2"
                >
                  <span style={{ color: 'var(--accent)' }}>&gt; </span>
                  <input
                    type="text"
                    name="command"
                    className="flex-1 ml-2 bg-transparent border-none outline-none"
                    style={{ color: 'var(--terminal-green)' }}
                    placeholder="Type a command..."
                    autoComplete="off"
                    spellCheck="false"
                  />
                </form>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="code-block">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-opacity-30" 
                 style={{ borderColor: 'var(--border)' }}>
              <Send className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                send_message.form
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 terminal-prompt" 
                       style={{ color: 'var(--accent)' }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border bg-transparent transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-primary)'
                  }}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 terminal-prompt" 
                       style={{ color: 'var(--accent)' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border bg-transparent transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-primary)'
                  }}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 terminal-prompt" 
                       style={{ color: 'var(--accent)' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border bg-transparent transition-all duration-300 focus:outline-none focus:ring-2 resize-none"
                  style={{ 
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-primary)'
                  }}
                  placeholder="Enter your message"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold text-lg border-2 transition-all duration-300 hover:scale-105"
                style={{ 
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                  backgroundColor: 'transparent'
                }}
              >
                <Send className="w-5 h-5" />
                <span>&gt;</span> Submit Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;