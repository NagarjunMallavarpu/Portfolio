import { Menu, X } from 'lucide-react';
import React from 'react';
import { AnimatedThemeToggler } from './AnimatedThemeToggler';

const Header = ({ theme, setTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certificates' },
  ];

  const scrollToSection = (href) => {
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      if (window.lenis) {
        window.lenis.scrollTo(target, { offset: -110 });
      } else {
        const offset = 110;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = target.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[1200px] backdrop-blur-lg bg-white/80 dark:bg-[#0a0f26]/80 border border-slate-200/50 dark:border-[#1e295d]/30 rounded-full px-6 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between w-full">
        {/* Logo / Name */}
        <div 
          onClick={() => scrollToSection('#home')}
          className="text-gray-900 dark:text-white text-xs sm:text-base md:text-lg font-black tracking-wider cursor-pointer group transition-all duration-300 flex items-center shrink-0"
        >
          <span className={theme === 'dark'
            ? "bg-gradient-to-r from-white via-[#06a2c2] to-[#FF9FFC] bg-clip-text text-transparent bg-[length:200%_auto] group-hover:bg-[100%_0] transition-all duration-700 ease-in-out font-black"
            : "text-gray-900 font-extrabold"
          }>
            NAGARJUN MALLAVARPU
          </span>
          <span className="text-primary inline-block group-hover:translate-x-1 group-hover:scale-125 transition-all duration-300">.</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 lg:gap-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => scrollToSection('#contact')}
            className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shadow-md hover:shadow-primary/20"
          >
            Contact
          </button>

          {/* Theme Toggle Desktop */}
          <AnimatedThemeToggler
            theme={theme}
            onThemeChange={setTheme}
            className="p-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white/5 hover:bg-black/5 dark:hover:bg-white/5 text-gray-800 dark:text-gray-300 transition-all duration-300 cursor-pointer flex items-center justify-center w-8 h-8"
            aria-label="Toggle Theme"
          />
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <AnimatedThemeToggler
            theme={theme}
            onThemeChange={setTheme}
            className="p-1.5 rounded-full text-gray-800 dark:text-white cursor-pointer flex items-center justify-center w-7 h-7"
            aria-label="Toggle Theme"
          />

          <button
            className="text-gray-800 dark:text-white cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80
        bg-white dark:bg-[#0a0f26] border-l border-gray-100 dark:border-gray-800/40 z-50 transition-transform duration-300
        md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } p-8 flex flex-col`}
      >
        <button
          className="self-end text-gray-800 dark:text-white mb-10 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          <X size={28} />
        </button>

        <ul className="flex flex-col gap-6">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => scrollToSection(item.href)}
                className="text-gray-800 dark:text-white text-lg uppercase tracking-wider font-semibold hover:text-primary transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            </li>
          ))}

          <li className="pt-6">
            <button
              onClick={() => scrollToSection('#contact')}
              className="w-full bg-primary text-white py-3 rounded-full text-sm uppercase tracking-wider font-bold cursor-pointer hover:bg-primary/95 transition-colors shadow-md"
            >
              Contact Me
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;