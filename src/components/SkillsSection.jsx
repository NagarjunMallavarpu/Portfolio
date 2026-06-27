import { 
  SiC, 
  SiCplusplus, 
  SiJavascript, 
  SiTypescript, 
  SiPython, 
  SiHtml5, 
  SiCss, 
  SiReact, 
  SiTailwindcss, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiExpress, 
  SiSpringboot, 
  SiPostgresql, 
  SiMongodb, 
  SiMysql 
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const SkillsSection = () => {
  const skillGroups = [
    {
      title: 'Languages',
      classes: 'bg-blue-50/40 dark:bg-blue-950/10 border-blue-200/60 dark:border-blue-800/30 text-blue-600 dark:text-blue-400',
      circleBorder: 'border-blue-300 dark:border-blue-700/50',
      skills: [
        { name: 'C', icon: <SiC className="w-6 h-6 text-[#A8B9CC]" /> },
        { name: 'C++', icon: <SiCplusplus className="w-6 h-6 text-[#00599C]" /> },
        { name: 'JavaScript', icon: <SiJavascript className="w-6 h-6 text-[#F7DF1E]" /> },
        { name: 'TypeScript', icon: <SiTypescript className="w-6 h-6 text-[#3178C6]" /> },
        { name: 'Python', icon: <SiPython className="w-6 h-6 text-[#3776AB]" /> },
        { name: 'Java', icon: <FaJava className="w-6 h-6 text-[#007396]" /> }
      ]
    },
    {
      title: 'Backend',
      classes: 'bg-purple-50/40 dark:bg-purple-950/10 border-purple-200/60 dark:border-purple-800/30 text-purple-600 dark:text-purple-400',
      circleBorder: 'border-purple-300 dark:border-purple-700/50',
      skills: [
        { name: 'Spring Boot', icon: <SiSpringboot className="w-6 h-6 text-[#6DB33F]" /> },
        { name: 'Node.js', icon: <SiNodedotjs className="w-6 h-6 text-[#339933]" /> },
        { name: 'Express', icon: <SiExpress className="w-6 h-6 text-gray-700 dark:text-gray-250" /> },
        { name: 'Next.js', icon: <SiNextdotjs className="w-6 h-6 text-gray-900 dark:text-white" /> }
      ]
    },
    {
      title: 'Frontend',
      classes: 'bg-cyan-50/40 dark:bg-cyan-950/10 border-cyan-200/60 dark:border-cyan-800/30 text-cyan-600 dark:text-cyan-400',
      circleBorder: 'border-cyan-300 dark:border-cyan-700/50',
      skills: [
        { name: 'HTML5', icon: <SiHtml5 className="w-6 h-6 text-[#E34F26]" /> },
        { name: 'CSS3', icon: <SiCss className="w-6 h-6 text-[#1572B6]" /> },
        { name: 'React', icon: <SiReact className="w-6 h-6 text-[#61DAFB]" /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-6 h-6 text-[#06B6D4]" /> },
        { name: 'Next.js', icon: <SiNextdotjs className="w-6 h-6 text-gray-900 dark:text-white" /> }
      ]
    },
    {
      title: 'Databases',
      classes: 'bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-200/60 dark:border-emerald-800/30 text-emerald-600 dark:text-emerald-400',
      circleBorder: 'border-emerald-300 dark:border-emerald-700/50',
      skills: [
        { name: 'PostgreSQL', icon: <SiPostgresql className="w-6 h-6 text-[#4169E1]" /> },
        { name: 'MongoDB', icon: <SiMongodb className="w-6 h-6 text-[#47A248]" /> },
        { name: 'MySQL', icon: <SiMysql className="w-6 h-6 text-[#4479A1]" /> }
      ]
    }
  ];

  return (
    <section className="py-12 bg-transparent text-gray-900 dark:text-white relative z-10" id="skills">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div data-aos="fade-right">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Technical Skills
            </h2>
            <div className="w-24 h-1 bg-primary mt-3 rounded-full"></div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-md text-sm md:text-base leading-relaxed md:text-right font-medium" data-aos="fade-left">
            Full-stack proficiency from systems programming to database administration.
          </p>
        </div>

        {/* Skill Groups Grid - 2 Column Layout for horizontal cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {skillGroups.map((group, idx) => (
            <div 
              key={idx}
              className={`p-8 border rounded-[2rem] backdrop-blur-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg dark:hover:shadow-primary/5 flex flex-col justify-between relative ${group.classes}`}
              data-aos={idx % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-delay={idx * 150}
            >
              <div>
                {/* Title */}
                <h3 className="text-xs font-bold uppercase tracking-widest mb-6 opacity-75">
                  {group.title}
                </h3>

                {/* Skills Horizontal Row */}
                <div className="flex flex-row flex-wrap gap-5 items-center">
                  {group.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex flex-col items-center gap-2 group/icon">
                      <div className="w-14 h-14 rounded-full bg-white dark:bg-gray-900 shadow-md border border-slate-100 dark:border-white/5 flex items-center justify-center transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:-translate-y-1.5 group-hover/icon:border-primary/40 group-hover/icon:shadow-[0_0_15px_rgba(6,162,194,0.3)]">
                        {skill.icon}
                      </div>
                      <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-300 transition-colors group-hover/icon:text-primary">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
