import { Calendar, School } from 'lucide-react';

const Education = () => {
  const educationData = [
    {
      id: 1,
      degree: 'B.Tech in Computer Science and Information Technology',
      institution: 'KL University',
      duration: '2023 - 2027',
      grade: 'GRADE - 9.0 CGPA',
      details: 'Pursuing B.Tech in Computer Science and Information Technology at KL University, expected to graduate in 2027. Currently maintaining a CGPA of 9.0 and actively engaged in software development, algorithms, and data structures projects.',
      icon: School,
      glow: 'shadow-primary/5 dark:shadow-[#06a2c2]/5',
      borderColor: 'border-slate-200 dark:border-primary/20 dark:hover:border-primary/50'
    },
    {
      id: 2,
      degree: 'Senior Secondary School Certificate (Class 12)',
      institution: 'Sree Narayana Junior College',
      duration: '2021 - 2023',
      grade: 'GRADE - 64.83%',
      details: 'Completed Senior Secondary School (Class 12) with a focus on Physics, Chemistry, Mathematics, and Biology (PCMB). Secured a percentage of 64.83% and actively participated in science-related activities.',
      icon: School,
      glow: 'shadow-slate-200/5 dark:shadow-purple-500/5',
      borderColor: 'border-slate-200 dark:border-purple-500/20 dark:hover:border-purple-500/50'
    },
    {
      id: 3,
      degree: 'Secondary School Certificate (10th Class)',
      institution: 'Sree Narayana Vidhyalaya',
      duration: '2020 - 2021',
      grade: 'GRADE - 74.3%',
      details: 'Completed 10th Grade / Secondary School Certificate (SSC) with a percentage of 74.3%, building a solid foundation in Mathematics, Sciences, and Languages.',
      icon: School,
      glow: 'shadow-slate-200/5 dark:shadow-emerald-500/5',
      borderColor: 'border-slate-200 dark:border-emerald-500/20 dark:hover:border-emerald-500/50'
    }
  ];

  return (
    <section 
      className='relative text-gray-900 dark:text-white py-20 overflow-hidden z-10' 
      id='education'
    >
      <div className='max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 relative z-10'>
        {/* Subtle Map Title */}
        <div className='text-center mb-16' data-aos='fade-up'>
          <p className='text-primary dark:text-[#06a2c2] text-xs uppercase tracking-[0.3em] font-extrabold mb-3'>
            TIMELINE MAP
          </p>
          <h2 className='text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white'>
            Academic Journey
          </h2>
          <div className='w-28 h-1 bg-primary mx-auto mt-4 rounded-2xl'></div>
        </div>

        {/* Timeline Map Container */}
        <div className='relative w-full py-10'>
          
          {/* Vertical timeline line */}
          <div className='absolute top-0 bottom-0 left-6 md:left-1/2 w-[2px] bg-gradient-to-b from-primary/50 via-purple-500/40 to-emerald-500/20 -translate-x-1/2' />

          {/* Timeline Cards */}
          <div className='space-y-12 md:space-y-16'>
            {educationData.map((edu, index) => {
              const isEven = index % 2 === 0;
              const Icon = edu.icon;
              return (
                <div 
                  key={edu.id} 
                  className={`relative flex flex-col md:flex-row w-full ${
                    isEven ? 'md:justify-start' : 'md:justify-end'
                  }`}
                  data-aos={isEven ? 'fade-right' : 'fade-left'}
                >
                  {/* Timeline Dot */}
                  <div 
                    className={`absolute top-8 left-6 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white dark:border-[#050816] transition-all duration-300 z-20 flex items-center justify-center ${
                      index === 0 
                        ? 'bg-primary dark:bg-[#06a2c2] shadow-[0_0_12px_rgba(6,162,194,0.6)] scale-110' 
                        : index === 1
                        ? 'bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]'
                        : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]'
                    }`}
                  />

                  {/* Card wrapper */}
                  <div className={`w-full pl-16 md:pl-0 md:w-[46%] ${
                    isEven ? 'md:mr-auto' : 'md:ml-auto'
                  }`}>
                    <div className={`bg-white/80 dark:bg-[#111a3e]/85 border ${edu.borderColor} rounded-2xl p-6 md:p-8 shadow-xl ${edu.glow} backdrop-blur-md transition-all duration-300 hover:scale-[1.02] group`}>
                      
                      <div className='flex items-center justify-between mb-4 flex-wrap gap-3'>
                        {/* Icon & Institution */}
                        <div className='flex items-center gap-3.5'>
                          <div className='w-12 h-12 rounded-xl border border-slate-200/50 dark:border-white/10 bg-slate-50 dark:bg-[#050816] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300'>
                            <Icon className='text-primary dark:text-[#06a2c2]' size={22} />
                          </div>
                          <div>
                            <h3 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight group-hover:text-primary dark:group-hover:text-[#06a2c2] transition-colors duration-200'>
                              {edu.institution}
                            </h3>
                            <p className='text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase mt-0.5 tracking-wider'>
                              {edu.degree}
                            </p>
                          </div>
                        </div>

                        {/* Date Range Badge */}
                        <div className='flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold tracking-wider text-primary dark:text-[#06a2c2] bg-primary/10 dark:bg-[#06a2c2]/10 border border-primary/20 dark:border-[#06a2c2]/20 rounded-full uppercase'>
                          <Calendar size={13} />
                          {edu.duration}
                        </div>
                      </div>

                      {/* Grade Banner */}
                      <div className='inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-extrabold tracking-wider uppercase rounded-md mb-4'>
                        {edu.grade}
                      </div>

                      {/* Details Description */}
                      <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>
                        {edu.details}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;