import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import proj1 from '../assets/proj1.png'
import proj2 from '../assets/proj2.png'
import proj3 from '../assets/proj3.png'
import ScrollStack, { ScrollStackItem } from './ScrollStack'

const Projects = () => {
  const projects = [
    {
      id: 1,
      image: proj1,
      title: 'Terra-Vista',
      desc: 'Modern e-commerce for Farmers to sell directly to consumers.',
      tech: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/NagarjunMallavarpu/Terra-Vista',
      live: '#'
    },
    {
      id: 2,
      image: proj2,
      title: 'Quizora',
      desc: 'The smart way to test knowledge. Create customized quizzes as a teacher, join instantly with a code as a student, and get personalized AI insights.',
      tech: ['React', 'Vite', 'Supabase', 'Hugging Face API'],
      github: 'https://github.com/NagarjunMallavarpu/Quizbuilder',
      live: 'https://quizora27.netlify.app/'
    },
    {
      id: 3,
      image: proj3,
      title: 'Hotel-Booking System',
      desc: 'Complete hotel booking application with dashboard analytics and user panel.',
      tech: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/NagarjunMallavarpu/Hotel-Room-Booking-System-main',
      live: '#'
    }
  ]

  return (
    <section className='py-12 text-gray-900 dark:text-white' id='projects'>
      <div className='max-w-[1000px] mx-auto px-6 md:px-12 lg:px-16'>
        <div className='text-center mb-8' data-aos="fade-down">
          <h2
            className='text-4xl md:text-5xl font-extrabold
            text-gray-900 dark:text-white'
          >
            Projects.
          </h2>

          <div
            className='w-28 h-1 bg-primary mx-auto mt-2
            rounded-2xl'
          ></div>
        </div>

        <ScrollStack useWindowScroll={true} itemDistance={80} itemStackDistance={35} baseScale={0.88} itemScale={0.03}>
          {projects.map((project) => (
            <ScrollStackItem key={project.id}>
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center w-full bg-white/50 dark:bg-[#0c1535]/50 backdrop-blur-lg border border-slate-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl p-6 md:p-8 hover:shadow-[0_20px_50px_rgba(6,162,194,0.15)] hover:border-primary/40 transition-all duration-500 group">
                {/* Left: Image Container with aspect ratio and hover effect */}
                <a
                  href={project.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-full md:w-[42%] aspect-[16/10] overflow-hidden relative border border-slate-200/50 dark:border-white/5 rounded-2xl block shrink-0'
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className='w-full h-full object-cover group-hover:scale-[1.05] transition-all duration-700 ease-out'
                  />
                  
                  {/* Hover Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-slate-200/90 dark:from-[#050816]/75 via-[#050816]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                    <span className='px-4 py-2 bg-slate-100/80 dark:bg-primary/20 backdrop-blur-md border border-slate-300 dark:border-primary/30 rounded-full text-gray-800 dark:text-white text-xs font-semibold tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
                      Explore Code &rarr;
                    </span>
                  </div>
                </a>

                {/* Right: Project Details */}
                <div className='flex flex-col justify-between flex-grow w-full py-2'>
                  <div>
                    <h3
                      className='text-2xl font-black text-gray-900 dark:text-white
                      hover:text-primary transition-colors duration-300'
                    >
                      {project.title}
                    </h3>

                    <p className='text-gray-600 dark:text-gray-400 text-sm mt-3 leading-relaxed'>
                      {project.desc}
                    </p>
                  </div>

                  <div>
                    {/* Tech Pills */}
                    <div className='flex flex-wrap gap-1.5 mt-5 mb-6'>
                      {project.tech.map((tec, idx) => (
                        <span
                          key={idx}
                          className='text-[10px] md:text-xs px-3 py-1
                          bg-slate-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded-full border border-slate-200 dark:border-white/5 font-medium tracking-wide shadow-inner'
                        >
                          {tec}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className='flex items-center gap-5 pt-4 border-t border-slate-200 dark:border-white/5'>
                      <a
                        href={project.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-300 font-semibold'
                      >
                        <FaGithub size={16} /> Code
                      </a>
                      {project.live !== '#' && (
                        <a
                          href={project.live}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center gap-2 text-sm text-primary hover:text-white transition-colors duration-300 font-semibold'
                        >
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  )
}

export default Projects