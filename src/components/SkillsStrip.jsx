import LogoLoop from './LogoLoop';
import { 
  SiC, 
  SiCplusplus, 
  SiJavascript, 
  SiTypescript, 
  SiPython, 
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

const SkillsStrip = () => {
  const skillLogos = [
    { node: <SiC className="text-[#A8B9CC]" /> },
    { node: <SiCplusplus className="text-[#00599C]" /> },
    { node: <SiJavascript className="text-[#F7DF1E]" /> },
    { node: <SiTypescript className="text-[#3178C6]" /> },
    { node: <SiPython className="text-[#3776AB]" /> },
    { node: <FaJava className="text-[#007396]" /> },
    { node: <SiSpringboot className="text-[#6DB33F]" /> },
    { node: <SiNodedotjs className="text-[#339933]" /> },
    { node: <SiExpress className="text-gray-700 dark:text-gray-250" /> },
    { node: <SiReact className="text-[#61DAFB]" /> },
    { node: <SiTailwindcss className="text-[#06B6D4]" /> },
    { node: <SiNextdotjs className="text-gray-900 dark:text-white" /> },
    { node: <SiPostgresql className="text-[#4169E1]" /> },
    { node: <SiMongodb className="text-[#47A248]" /> },
    { node: <SiMysql className="text-[#4479A1]" /> }
  ];

  return (
    <div className="w-full py-8 bg-slate-50/30 dark:bg-[#0c1535]/20 backdrop-blur-md border-y border-slate-200/50 dark:border-white/5 overflow-hidden">
      <LogoLoop 
        logos={skillLogos} 
        speed={60} 
        logoHeight={36} 
        gap={60} 
        pauseOnHover={true}
        scaleOnHover={true}
        fadeOut={true}
      />
    </div>
  );
};

export default SkillsStrip;
