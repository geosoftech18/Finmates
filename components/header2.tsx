"use client"

import { Mail, Phone } from "lucide-react";
import * as React from "react"

type NavLink = { name: string; url: string }

const NAV_LINKS: NavLink[] = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Services", url: "/services" },
  { name: "Contact Us", url: "/contact-us" },
  { name: "Careers", url: "/careers" },
]

export default function FinmatesHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const navRef = React.useRef<HTMLElement | null>(null)
  const [inquiryOpen, setInquiryOpen] = React.useState(false)

  // simple form state
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [service, setService] = React.useState("")
  const SERVICES = [
    "CFO Services",
    "F&A Outsourcing",
    "Direct tax and regulatory services",
    "Corporate Fundraising and M&A Advisory",
    "SME IPO readiness support",
  ]

  // Scroll state -> adds shadow/background like the original (data-scrolled)
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (menuOpen && typeof window !== "undefined" && window.innerWidth < 1024) {
      const original = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => void (document.body.style.overflow = original)
    }
  }, [menuOpen])

  // Escape to close
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false)
        setInquiryOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Lock body scroll when inquiry panel is open
  React.useEffect(() => {
    if (inquiryOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => void (document.body.style.overflow = original)
    }
  }, [inquiryOpen])

  // Simulate AOS fade-down on mount to match the original
  React.useEffect(() => {
    const el = navRef.current
    if (!el) return
    // Trigger the animation once on mount
    el.classList.add("aos-animate")
    const timer = setTimeout(() => el.classList.remove("aos-animate"), 600)
    return () => clearTimeout(timer)
  }, [])

  const toggleMenu = () => setMenuOpen((v) => !v)
  const closeMenu = () => setMenuOpen(false)

  const openInquiry = () => setInquiryOpen(true)
  const closeInquiry = () => setInquiryOpen(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Minimal client-side check
    if (!name || !email || !service) {
      alert("Please fill all fields.")
      return
    }
    // For now just log. This can be wired to API later.
    console.log({ name, email, service })
    alert("Thanks! We'll get back to you shortly.")
    setInquiryOpen(false)
    setName("")
    setEmail("")
    setService("")
  }

  return (
    <nav
      ref={navRef}
      data-scrolled={scrolled ? "true" : "false"}
      data-aos="fade-down"
      data-aos-duration="400"
      data-aos-delay="0"
      className="fixed inset-x-0 top-0 z-50 w-full bg-gray-50 data-[scrolled=true]:bg-gray-50 data-[scrolled=true]:shadow-2xl data-[scrolled=true]:!transition-all"
      aria-label="Main"
    >
      {/* Mobile top strip with Tally trigger (matches original) */}
      <div className="flex w-full px-4 bg-gray-300 lg:hidden">
        <button
          className="ml-auto py-2 font-bold underline underline-offset-4"
          data-tally-open="mO4XQk"
          data-tally-layout="modal"
          aria-haspopup="dialog"
        >
          Lets Connect
        </button>
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl justify-between gap-4 py-4 md:px-10">
        {/* Logo */}
        <a href="/" aria-label="Finmates">
          <img
            alt="Finmates"
            width={200}
            height={40}
            className="max-xsm:h-9 relative z-10 ml-2 h-16 w-full object-contain object-center"
            src="/images/finmate-logo.png"
          />
        </a>

        <div className="flex items-center md:gap-5 bg-white rounded-3xl">
          {/* Mobile menu toggle: circular button with close “X” when open */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="finmates-mobile-nav"
            onClick={toggleMenu}
            className="z-10 mx-5 ml-auto block h-max w-max cursor-pointer bg-p/80 p-1 hover:animate-pulse md:mx-0 lg:hidden"
          >
            {menuOpen ? (
              // Close (X) icon
              <svg
                stroke="currentColor"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-8 w-8 text-white bg-[#008bd0]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-white bg-[#008bd0]"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <rect x="3" y="5" width="18" height="2" rx="1" />
                <rect x="3" y="11" width="18" height="2" rx="1" />
                <rect x="3" y="17" width="18" height="2" rx="1" />
              </svg>
            )}
          </button>

          {/* Nav list (desktop inline, mobile full-screen overlay when expanded) */}
          <ul
            id="finmates-mobile-nav"
            className="flex transition-all max-lg:absolute max-lg:left-0 max-lg:top-0 max-lg:!h-0 max-lg:w-0 max-lg:flex-col max-lg:overflow-hidden max-lg:data-[expand=true]:!h-screen max-lg:data-[expand]:!w-full max-lg:data-[expand=true]:py-[4.5rem] lg:items-center lg:justify-center lg:space-x-4 lg:rounded-full lg:shadow-head"
            data-expand={menuOpen ? "true" : undefined}
            style={{ transition: "height 1s" }}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.url} className="group relative">
                <a
                  id="menu-item"
                  className="inline-block px-4 text-lg py-2 font-bold text-[#003b8d] max-lg:w-full max-lg:border-0 max-lg:border-b max-lg:border-gray-600 max-lg:bg-white max-lg:px-5 max-lg:py-4"
                  href={link.url}
                  onClick={closeMenu}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          </div>
          {/* Right-side desktop icon button (as in source) */}
          <div className="hidden md:block mt-3">
            <button type="button" aria-haspopup="dialog" aria-expanded={inquiryOpen} onClick={openInquiry}>
              <svg
                viewBox="0 0 16 16"
                className="text-xl text-[#003b8d]"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z" />
              </svg>
            </button>
          </div>
        
      </div>

      {/* Slide-in Inquiry Panel */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-white/70 transition-opacity duration-300 ${inquiryOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeInquiry}
        aria-hidden={!inquiryOpen}
      />
      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Speak To Us"
        className={`fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-[#0b2447] text-white shadow-2xl transform transition-transform duration-300 ${inquiryOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h2 className="text-lg font-semibold">Speak To Us</h2>
          <button aria-label="Close" onClick={closeInquiry} className="p-2 rounded-full hover:bg-white/10">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 1 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4Z" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-6 overflow-y-auto h-full">
          <p className="text-sm text-white/80 mb-6">We’ll help you with our valuable conversation. Fill this quick form.</p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1" htmlFor="inq-name">Name</label>
              <input id="inq-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full rounded-md px-3 py-2 bg-white text-gray-900" />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="inq-email">Email</label>
              <input id="inq-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-white rounded-md px-3 py-2 text-gray-900" />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="inq-service">Service</label>
              <select id="inq-service" value={service} onChange={(e) => setService(e.target.value)} className="w-full bg-accent rounded-md px-3 py-2 text-gray-900">
                <option value="" disabled>Select a service</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            
            <button type="submit" className="mt-2 w-full inline-flex items-center justify-center rounded-full bg-white px-6 py-2 font-semibold text-[#0b2447] hover:bg-gray-100 transition">Submit</button>
          </form>

          <div className="mt-8 grid grid-cols-2 space-y-2 text-sm">
            <div className="flex"> <Mail className="mr-2"/> info@finmates.in</div>
            <div className="flex"> <Phone className="mr-2"/>09833943176</div>
          </div>
        </div>
      </aside>

      <style jsx global>{`
        @keyframes v0FadeDown {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        nav[data-aos='fade-down'].aos-animate {
          animation: v0FadeDown 0.4s ease-out both;
        }
      `}</style>
    </nav>
  )
}
