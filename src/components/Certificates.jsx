import { Bookmark } from 'lucide-react'

const Certificates = () => {
    const certifications = [
        {
            id: 1,
            title: 'AWS Certified Cloud Practitioner',
            issuer: 'AWS',
            desc: 'AWS Certified Cloud Practitioner – Validated knowledge of AWS Cloud services, architecture, security, and cloud computing fundamentals.',
            year: '2026',
            borderColor: 'border-slate-200 dark:border-sky-500/20',
            glowColor: 'shadow-sky-500/5',
            dotColor: 'bg-sky-500',
            issuerColor: 'text-sky-400',
            link: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/77a7ea40bb524e5cab78f63a5a9c0dc1'
        },
        {
            id: 2,
            title: 'MongoDB Certified Associate Developer',
            issuer: 'MongoDB',
            desc: 'MongoDB Certified Associate Developer – validated expertise in designing, building, and optimizing applications using MongoDB document database.',
            year: '2026',
            borderColor: 'border-slate-200 dark:border-emerald-500/20',
            glowColor: 'shadow-emerald-500/5',
            dotColor: 'bg-emerald-500',
            issuerColor: 'text-emerald-400',
            link: 'https://ti-user-certificates.s3.amazonaws.com/ae62dcd7-abdc-4e90-a570-83eccba49043/6f7f0078-9e6c-45f3-8f2a-ea64990a72f9-nagarjun-mallavarpu-187a5563-28f2-4f5f-b801-8fcde622159b-certificate.pdf'
        },
        {
            id: 3,
            title: 'MongoDB Certified DBA',
            issuer: 'MongoDB',
            desc: 'MongoDB Certified DBA Associate – validated expertise in deploying, managing, and maintaining MongoDB database clusters and operations.',
            year: '2026',
            borderColor: 'border-slate-200 dark:border-orange-500/20',
            glowColor: 'shadow-orange-500/5',
            dotColor: 'bg-orange-500',
            issuerColor: 'text-orange-400',
            link: 'https://ti-user-certificates.s3.amazonaws.com/ae62dcd7-abdc-4e90-a570-83eccba49043/6f7f0078-9e6c-45f3-8f2a-ea64990a72f9-nagarjun-mallavarpu-99be20c9-6108-435f-9a79-2c54a6e7aa2d-certificate.pdf'
        }
    ]

    return (
        <section className='bg-transparent text-gray-900 dark:text-white py-12 relative z-10' id='certificates'>
            <div className='max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16'>
                {/* Header Section */}
                <div className='flex items-center gap-3 mb-8'>
                    <Bookmark className='text-sky-500 fill-sky-500/10' size={22} />
                    <h2 className='text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold'>
                        Certifications
                    </h2>
                </div>

                {/* Certifications List */}
                <div className='flex flex-col gap-5'>
                    {certifications.map((cert) => (
                        <a
                            href={cert.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            key={cert.id}
                            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-md border ${cert.borderColor} rounded-2xl shadow-lg ${cert.glowColor} transition-all duration-300 hover:scale-[1.01] hover:bg-slate-50 dark:hover:bg-[#030712]/95 block`}
                        >
                            <div className='flex gap-4 items-start'>
                                {/* Colored Dot */}
                                <div className={`w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${cert.dotColor}`}></div>
                                
                                <div>
                                    {/* Title */}
                                    <h3 className='text-gray-900 dark:text-white font-semibold text-lg md:text-xl mb-1'>
                                        {cert.title}
                                    </h3>
                                    
                                    {/* Issuer */}
                                    <p className={`text-sm font-medium mb-3 ${cert.issuerColor}`}>
                                        {cert.issuer}
                                    </p>
                                    
                                    {/* Description */}
                                    <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-3xl'>
                                        {cert.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Year Pill */}
                            <div className='mt-4 sm:mt-0 self-end sm:self-center shrink-0'>
                                <span className='text-xs px-3.5 py-1.5 bg-slate-200/50 dark:bg-[#1f2937]/50 text-gray-700 dark:text-gray-400 rounded-full font-medium tracking-wide'>
                                    {cert.year}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Certificates