

export default function Header() {
return(
<header className=" shadow-sm xsm:bg-transparent fixed inset-x-0 top-0 z-50 w-full bg-white data-[scrolled=true]:bg-white data-[scrolled=true]:shadow-2xl data-[scrolled=true]:!transition-all"
        data-aos="fade-down"
        data-aos-duration="400"
        data-aos-delay="0"
        data-scrolled="true">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Logo */}
            <div className="flex flex-col">
              <a href="/">
              <img  src="/images/logo.svg" alt="" className="w-40 h-10" />
              </a>
            </div>

            {/* Center - Navigation Menu */}
            <nav className="hidden md:block">
              <div className="bg-white rounded-full px-8 py-3 shadow-lg border border-gray-100">
                <ul className="flex items-center space-x-8">
                  <li>
                    <a href="/" className="font-semibold transition-colors duration-200" style={{ color: "#003b8d" }}>
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      className="font-semibold transition-colors duration-200 hover:text-blue-500"
                      style={{ color: "#003b8d" }}
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services"
                      className="font-semibold transition-colors duration-200 hover:text-blue-500"
                      style={{ color: "#003b8d" }}
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact-us"
                      className="font-semibold transition-colors duration-200 hover:text-blue-500"
                      style={{ color: "#003b8d" }}
                    >
                      Contact Us
                    </a>
                  </li>
                  {/* <li>
                    <a
                      href="#"
                      className="font-semibold transition-colors duration-200 hover:text-blue-500"
                      style={{ color: "#002244" }}
                    >
                      Locations
                    </a>
                  </li> */}
                  <li>
                    <a
                      href="/careers"
                      className="font-semibold transition-colors duration-200 hover:text-blue-500"
                      style={{ color: "#003b8d" }}
                    >
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            {/* Right Side - Grid Icon */}
            <div className="flex items-center">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <svg
                  stroke="#003b8d"
                  fill="#003b8d"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  className="text-xl"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
)
}