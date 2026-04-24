import { Link, NavLink } from 'react-router-dom'
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { site } from '../content'

const navLinks = site.navigation.links

const socialLinks = [
  { href: site.social.github.url, icon: Github, label: site.social.github.label },
  { href: site.social.linkedin.url, icon: Linkedin, label: site.social.linkedin.label },
  { href: `mailto:${site.social.email.address}`, icon: Mail, label: site.social.email.label },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <nav className="bg-paper/80 backdrop-blur-md border-b border-line sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="font-bold text-lg text-ink tracking-tight hover:text-green transition-colors"
          >
            {site.navigation.brand}
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    isActive ? 'text-green bg-green-soft' : 'text-muted hover:text-ink'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="flex items-center gap-1 ml-4 pl-4 border-l border-line">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted hover:text-green transition-colors"
                  aria-label={link.label}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <button
            className="md:hidden p-2 text-ink"
            onClick={handleToggle}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={handleClose}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded text-sm font-medium ${
                      isActive
                        ? 'text-green bg-green-soft'
                        : 'text-muted hover:text-ink hover:bg-paper'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-line">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted hover:text-green transition-colors"
                  aria-label={link.label}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
