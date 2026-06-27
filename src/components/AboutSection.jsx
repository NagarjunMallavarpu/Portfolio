import about from '../assets/about.png'

const AboutSection = () => {
  return (
    <section
      className='text-white relative overflow-hidden'
      id='about'
    >
      <div
        className='max-w-[1400px] mx-auto px-6 md:grid md:grid-cols-2
        gap-12 items-center py-12 lg:px-16 relative z-10'
      >
        <div data-aos='fade-right'>
          <h2
            className='text-4xl md:text-5xl font-extrabold
            text-gray-900 dark:text-white mb-6'
          >
            Who <span>I</span> Am
          </h2>

          <p
            className='text-gray-600 dark:text-gray-400 text-base lg:text-lg
            mb-10 leading-relaxed'
          >
            I'm <strong>Nagarjun Mallavarpu</strong>, a Computer Science and Information Technology student with a passion for full-stack development, cloud computing, and software engineering. I enjoy designing and developing scalable web applications that combine clean architecture, intuitive user experiences, and reliable backend systems.
            <br /><br />
            My expertise includes <strong>React.js, Node.js, Express.js, MongoDB, JavaScript, and AWS</strong>, enabling me to build end-to-end applications from concept to deployment. Through hands-on projects and continuous learning, I've gained practical experience in RESTful APIs, authentication, database design, and modern development workflows.
            <br /><br />
            Beyond coding, I enjoy solving algorithmic challenges, exploring emerging technologies, and continuously improving my skills to stay ahead in the ever-evolving world of software development. My goal is to build technology that is not only functional and efficient but also delivers meaningful value and lasting impact.
          </p>

          <div className='grid grid-cols-3 gap-6 max-w-xl'>
            <div
              className='text-center rounded-2xl
              bg-slate-100/80 dark:bg-[#111a3e] border border-slate-200 dark:border-[#1f1641] p-5
              transition-all duration-300 hover:border-primary/50'
            >
              <h3
                className='text-primary font-bold
                text-2xl md:text-3xl'
              >
                +10
              </h3>
              <p
                className='text-xs text-gray-500 dark:text-gray-400
                uppercase tracking-wider mt-0.5'
              >
                Clients
              </p>
            </div>

            <div
              className='text-center rounded-2xl
              bg-slate-100/80 dark:bg-[#111a3e] border border-slate-200 dark:border-[#1f1641] p-5
              transition-all duration-300 hover:border-primary/50'
            >
              <h3
                className='text-primary font-bold
                text-2xl md:text-3xl'
              >
                +30
              </h3>
              <p
                className='text-xs text-gray-500 dark:text-gray-400
                uppercase tracking-wider mt-0.5'
              >
                Projects
              </p>
            </div>

            <div
              className='text-center rounded-2xl
              bg-slate-100/80 dark:bg-[#111a3e] border border-slate-200 dark:border-[#1f1641] p-5
              transition-all duration-300 hover:border-primary/50'
            >
              <h3
                className='text-primary font-bold
                text-2xl md:text-3xl'
              >
                +2
              </h3>
              <p
                className='text-xs text-gray-500 dark:text-gray-400
                uppercase tracking-wider mt-0.5'
              >
                Years
              </p>
            </div>
          </div>
        </div>

        <div
          className='mt-16 md:mt-0 flex justify-center
          lg:justify-end relative'
          data-aos='fade-left'
        >
          <div className='relative w-64 h-64 md:w-96 md:h-96 aspect-square'>
            <div
              className='absolute inset-0 z-0 rounded-full
              shadow-lg border border-primary translate-x-4
              translate-y-4'
            ></div>

            <div
              className='relative z-10 w-full h-full
              bg-slate-150 dark:bg-[#111a3e] rounded-full overflow-hidden
              border border-slate-200 dark:border-[#1f1641]'
            >
              <img
                src={about}
                alt='About'
                className='w-full h-full object-cover
                transition-transform duration-500
                hover:scale-110'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection