import { useState, useEffect } from 'react'
import { Download } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiCodechef } from 'react-icons/si'
import hero from '../assets/Hero.png'

const Typewriter = ({ text, delay = 100, deleteDelay = 60, pauseDelay = 2000 }) => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timer;
    if (!isDeleting) {
      if (charIndex < text.length) {
        timer = setTimeout(() => {
          setCurrentText((prev) => prev + text[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, delay);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDelay);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setCurrentText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        }, deleteDelay);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
        }, 500);
      }
    }
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, text, delay, deleteDelay, pauseDelay]);

  return <span>{currentText}</span>;
};

const HeroSection = ({ theme }) => {
  const scrollToProjects = () => {
    const target = document.querySelector('#projects')
    if (target) {
      if (window.lenis) {
        window.lenis.scrollTo(target, { offset: -90 })
      } else {
        const offset = 90
        const bodyRect = document.body.getBoundingClientRect().top
        const elementRect = target.getBoundingClientRect().top
        const elementPosition = elementRect - bodyRect
        const offsetPosition = elementPosition - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <section className='relative w-full' data-aos='zoom-in-up'>
      {/* Background Blur Effects */}
      <div className='absolute top-0 inset-x-0 h-64 flex items-start'>
        <div className='h-24 w-2/3 bg-gradient-to-br from-[#0c7fac] blur-2xl opacity-40'></div>

        <div className='h-24 w-3/4 bg-gradient-to-r from-[#289eff] opacity-40 blur-2xl'></div>
      </div>

      <div className='w-full px-6 sm:px-8 md:px-12 lg:px-16 max-w-5xl lg:max-w-[1400px] mx-auto relative'>
        <div className='grid lg:grid-cols-2 gap-10 relative pt-24 pb-12 lg:pb-16 lg:max-w-none max-w-2xl md:max-w-3xl mx-auto'>
          {/* Left Content */}
          <div className='lg:py-6'>
            <h1 className='pt-4 text-gray-900 dark:text-white font-bold text-4xl sm:text-5xl lg:text-6xl flex flex-wrap items-center gap-x-3 gap-y-1'>
              <span>Hi, I'm</span>
              <span className={theme === 'dark' ? "gradient-text" : "text-gray-900"}>
                <Typewriter text="Nagarjun" delay={120} deleteDelay={60} pauseDelay={2500} />
              </span>
              <span className="animate-pulse border-r-3 border-primary ml-1 h-[0.9em] inline-block">&nbsp;</span>
              <span>✌️</span>
            </h1>

            <p className='text-gray-600 dark:text-gray-300 pt-8 text-center lg:text-left lg:mx-0 mx-auto max-w-2xl leading-relaxed'>
              <strong className='text-primary block mb-3 text-lg tracking-wider uppercase font-extrabold'>
                Engineering Ideas Into Reality
              </strong>
              I'm a Full-Stack Developer and Computer Science & Information Technology student passionate about building modern, scalable, and user-centric web applications. I specialize in React, Node.js, Express.js, MongoDB, and AWS, transforming ideas into fast, secure, and impactful digital experiences through clean code and thoughtful design.
              <br /><br />
              <span className="italic font-medium text-slate-500 dark:text-slate-400">
                Building the future, one project at a time.
              </span>
            </p>

            {/* Buttons */}
            <div className='flex items-center gap-3 pt-9 flex-col sm:flex-row sm:w-max lg:mx-0'>
              <button
                onClick={scrollToProjects}
                className='px-6 md:px-7 py-3 rounded-full relative group w-full sm:w-max flex justify-center'
              >
                <span className='absolute inset-0 rounded-3xl group-hover:scale-105 origin-center transition-all ease-in-out bg-primary border-2 border-transparent'></span>

                <span className='relative flex items-center justify-center text-white'>
                  View My Work
                </span>
              </button>

              <button className='border border-primary px-6 md:px-7 py-3 rounded-full relative group w-full sm:w-max flex justify-center'>
                <div className='hover:scale-105 transition-all ease-in-out flex justify-center items-center relative'>
                  <div className='svg-container'>
                    <Download size={18} className='text-primary' />
                    <div className='download-loader text-white hidden'></div>
                  </div>

                  <a
                    href='/resume.pdf'
                    download='resume.pdf'
                    className='pl-2 text-primary'
                  >
                    Download Resume
                  </a>
                </div>
              </button>
            </div>

            {/* Social Icons */}
            <div className='flex items-center gap-4 pt-8 justify-center lg:justify-start'>
              <a
                href='https://github.com/NagarjunMallavarpu'
                target='_blank'
                rel='noopener noreferrer'
                className='w-11 h-11 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(6,162,194,0.3)] transition-all duration-300'
              >
                <FaGithub size={20} />
              </a>
              <a
                href='https://www.linkedin.com/in/naga27/'
                target='_blank'
                rel='noopener noreferrer'
                className='w-11 h-11 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(6,162,194,0.3)] transition-all duration-300'
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href='https://www.codechef.com/users/kl_2300090068'
                target='_blank'
                rel='noopener noreferrer'
                className='w-11 h-11 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(6,162,194,0.3)] transition-all duration-300'
              >
                <SiCodechef size={20} />
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className='flex items-center justify-center lg:justify-end lg:h-full w-full py-6 lg:py-0'>
            <div className='relative w-60 h-72 sm:w-64 sm:h-80 md:w-72 md:h-[360px] lg:w-[300px] lg:h-[380px] animate-profile-float group'>
              {/* Decorative background outline card (slightly rotated) */}
              <div className='absolute inset-0 border-2 border-primary/40 rounded-[2rem] translate-x-3 translate-y-3 rotate-3 group-hover:rotate-0 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-out'></div>
              
              {/* Outer soft glowing background */}
              <div className='absolute -inset-1 bg-gradient-to-r from-primary to-[#FF9FFC]/60 rounded-[2rem] blur-lg opacity-25 group-hover:opacity-45 transition duration-500 pointer-events-none'></div>
              
              {/* The main image container */}
              <div className='relative w-full h-full p-1.5 bg-white/95 dark:bg-[#050816]/90 rounded-[2rem] border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-primary/60'>
                {/* Profile Image */}
                <img
                  src={hero}
                  alt='Hero img'
                  className='w-full h-full rounded-[1.7rem] object-cover transition-all duration-500 group-hover:scale-105'
                  loading='lazy'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection