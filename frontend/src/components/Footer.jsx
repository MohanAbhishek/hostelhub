// src/components/Footer.jsx

function Footer() {
  return (
    <footer id="developers" className="bg-slate-900 text-white border-t border-slate-800 px-8 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">

        {/* TOP ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow">
                <span className="text-white font-black text-sm">H</span>
              </div>
              <h2 className="text-xl font-black text-white">HostelHub</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              A modern full-stack hostel booking and management platform
              built to simplify student accommodation digitally.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Explore Hostels", href: "/hostels" },
                { label: "Sign In", href: "/login" },
                { label: "Create Account", href: "/register" },
                { label: "Feedback", href: "/feedback" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-400 text-sm hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* TECH STACK */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Built With
            </h3>
            <div className="flex flex-wrap gap-2">
              {["React", "Spring Boot", "JWT Auth", "MySQL", "Tailwind CSS", "Docker"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-slate-500 text-sm">
            © 2026 HostelHub. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>Developed by</span>
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold">
              @mohan
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold">
              @sai charan
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;