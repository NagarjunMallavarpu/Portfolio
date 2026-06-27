import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'
import { SiCodechef, SiHackerrank } from 'react-icons/si'

const Footer = ({ theme }) => {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://www.instagram.com/mr_nagarjun_10/',
      color: 'hover:text-[#E1306C] hover:border-[#E1306C]/40 hover:shadow-[0_0_15px_rgba(225,48,108,0.3)]',
      bg: 'hover:bg-[#E1306C]/5'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/naga27/',
      color: 'hover:text-[#0077B5] hover:border-[#0077B5]/40 hover:shadow-[0_0_15px_rgba(0,119,181,0.3)]',
      bg: 'hover:bg-[#0077B5]/5'
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/NagarjunMallavarpu',
      color: 'hover:text-primary hover:border-primary/40 hover:shadow-[0_0_15px_rgba(6,162,194,0.3)]',
      bg: 'hover:bg-primary/5'
    },
    {
      name: 'CodeChef',
      icon: SiCodechef,
      url: 'https://www.codechef.com/users/kl_2300090068',
      color: 'hover:text-[#5B4636] dark:hover:text-[#B59677] hover:border-[#5B4636]/40 dark:hover:border-[#B59677]/40 hover:shadow-[0_0_15px_rgba(91,70,54,0.3)]',
      bg: 'hover:bg-[#5B4636]/5'
    },
    {
      name: 'HackerRank',
      icon: SiHackerrank,
      url: 'https://www.hackerrank.com/profile/h2300090068',
      color: 'hover:text-[#2EC866] hover:border-[#2EC866]/40 hover:shadow-[0_0_15px_rgba(46,200,102,0.3)]',
      bg: 'hover:bg-[#2EC866]/5'
    }
  ]

  return (
    <footer
      className='mt-16 border border-t-[#33353f]/30 dark:border-t-[#33353f]
      border-l-transparent border-r-transparent text-gray-900 dark:text-white bg-transparent relative z-10'
    >
      {/* Connect Digitally Section */}
      <div className="max-w-[1400px] mx-auto px-6 pt-12 pb-8 text-center" data-aos="fade-up">
        <h3 className="text-xl md:text-2xl font-extrabold mb-2 tracking-wide text-gray-900 dark:text-white">
          Connect Digitally
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Feel free to reach out or follow my work across various coding platforms and socials.
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {socialLinks.map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.name}
                href={social.url}
                target='_blank'
                rel='noopener noreferrer'
                className={`flex items-center gap-2 px-5 py-3 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 ${social.color} ${social.bg}`}
              >
                <Icon size={18} />
                <span className="text-sm">{social.name}</span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Copyright footer area */}
      <div
        className='max-w-[1400px] mx-auto px-6 py-8 flex justify-between
        flex-col md:flex-row items-center gap-4 md:gap-0 border-t border-[#33353f]/10 dark:border-t-[#33353f]/30'
      >
        <div className='text-gray-950 dark:text-white text-xl md:text-2xl font-black tracking-wide cursor-pointer group transition-all duration-300'>
          <span className={theme === 'dark'
            ? 'bg-gradient-to-r from-white via-[#06a2c2] to-[#FF9FFC] bg-clip-text text-transparent bg-[length:200%_auto] group-hover:bg-[100%_0] transition-all duration-700 ease-in-out'
            : 'text-gray-900 font-extrabold'
          }>
            NAGARJUN MALLAVARPU
          </span>
          <span className='text-primary inline-block group-hover:translate-x-1 group-hover:scale-125 transition-all duration-300'>.</span>
        </div>

        <p className='text-slate-500 dark:text-slate-400 text-sm md:text-base'>
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer