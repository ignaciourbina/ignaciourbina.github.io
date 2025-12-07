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
    <nav className="bg-navy text-white border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link to="/" className="font-semibold text-lg hover:opacity-80 transition-opacity">
            {site.navigation.brand}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded font-medium transition-opacity ${
                      isActive ? 'bg-white/10' : 'hover:opacity-80'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/20">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:opacity-80 transition-opacity"
                  aria-label={link.label}
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={handleToggle} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={handleClose}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded font-medium ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/20">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:opacity-80 transition-opacity"
                  aria-label={link.label}
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
