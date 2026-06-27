import { useState, useEffect } from 'react'
import { FaMapMarkedAlt } from 'react-icons/fa'

const ContactSection = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitError, setSubmitError] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [location, setLocation] = useState('Vijayawada, Andhra Pradesh, India')

    useEffect(() => {
        const APP_KEY = 'a8w84w5m'
        const KEY = 'location'
        
        // 1. Check for owner parameter in URL (?owner=true)
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.get('owner') === 'true') {
            localStorage.setItem('portfolio_owner_device', 'true')
            // Clean the URL query params without reloading
            const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname
            window.history.replaceState({ path: cleanUrl }, '', cleanUrl)
            console.log('Owner device registered!')
        }

        const isOwner = localStorage.getItem('portfolio_owner_device') === 'true'

        const updateOwnerLocation = async () => {
            try {
                let city, region, country;
                
                // Try ipwho.is first (CORS-friendly, free public API)
                try {
                    const response = await fetch('https://ipwho.is/')
                    if (response.ok) {
                        const data = await response.json()
                        if (data && data.success) {
                            city = data.city
                            region = data.region
                            country = data.country
                        }
                    }
                } catch (e) {
                    console.warn('Failed to fetch location from ipwho.is, trying fallback...', e)
                }

                // Try freeipapi.com as fallback if ipwho.is failed
                if (!city) {
                    const response = await fetch('https://freeipapi.com/api/json')
                    if (!response.ok) throw new Error('Failed to fetch IP location from fallback')
                    const data = await response.json()
                    city = data.cityName
                    region = data.regionName
                    country = data.countryName
                }

                if (city && region && country) {
                    const newLocation = `${city}, ${region}, ${country}`
                    setLocation(newLocation)
                    
                    // Save to the KV database for other users to see
                    const updateUrl = `https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${APP_KEY}/${KEY}/${encodeURIComponent(newLocation)}`
                    await fetch(updateUrl, { method: 'POST' })
                    console.log('Location updated successfully:', newLocation)
                }
            } catch (err) {
                console.error('Error auto-updating owner location:', err)
                readSavedLocation()
            }
        }

        const readSavedLocation = async () => {
            try {
                const getUrl = `https://keyvalue.immanuel.co/api/KeyVal/GetValue/${APP_KEY}/${KEY}`
                const response = await fetch(getUrl)
                if (response.ok) {
                    const data = await response.text()
                    if (data) {
                        const parsedData = data.replace(/^"|"$/g, '').trim()
                        if (parsedData && parsedData !== 'null' && parsedData !== 'undefined') {
                            setLocation(parsedData)
                        }
                    }
                }
            } catch (err) {
                console.error('Error reading saved location:', err)
            }
        }

        if (isOwner) {
            updateOwnerLocation()
        } else {
            readSavedLocation()
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitError(null)

        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

        if (!accessKey || accessKey === 'your_access_key_here') {
            setSubmitError('Please configure your Web3Forms Access Key in the .env file.')
            setIsSubmitting(false)
            return
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    name: name,
                    email: email,
                    message: message,
                    subject: 'New Contact Form Submission from Portfolio',
                    from_name: name || 'Portfolio Contact Form',
                }),
            })

            const data = await response.json()

            if (data.success) {
                setSubmitSuccess(true)
                setName('')
                setEmail('')
                setMessage('')
                setTimeout(() => {
                    setSubmitSuccess(false)
                    setShowForm(false)
                }, 5000)
            } else {
                setSubmitError(data.message || 'Something went wrong. Please try again.')
            }
        } catch {
            setSubmitError('Failed to send message. Please check your internet connection and try again.')
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <section className='py-12 text-gray-900 dark:text-white' id='contact'>
            <div className='max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16'>
                <div className='text-center mb-8'>
                    <h2 className='text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2'>
                        Let's Connect.
                    </h2>
                    <div className='w-28 h-1 bg-primary mx-auto mt-2 rounded-2xl'></div>
                </div>

                <div className='grid md:grid-cols-2 gap-8'>
                    <div className='flex flex-col justify-center h-full'>
                        <p className='text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-md'>
                            Let's connect and build something amazing together. I'm available
                            for collaborations, internships, and exciting opportunities.
                        </p>

                        {/* Beautiful Location Card */}
                        <div className='bg-slate-50/50 dark:bg-[#111a3e]/50 border border-slate-200/60 dark:border-[#1f1641]/80 rounded-2xl p-6 shadow-lg backdrop-blur-md hover:border-primary/40 transition-all duration-300 group max-w-md'>
                            <div className='flex items-center gap-4 mb-4'>
                                <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-inner'>
                                    <FaMapMarkedAlt size={22} className='text-primary' />
                                </div>
                                <div>
                                    <span className='text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-semibold'>Current Base</span>
                                    <h4 className='text-gray-900 dark:text-white font-bold text-base md:text-lg'>
                                        {location}
                                    </h4>
                                </div>
                            </div>
                            
                            <div className='h-px bg-slate-200 dark:bg-slate-800/80 my-4'></div>
                            
                            <div className='space-y-3'>
                                <div className='flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400'>
                                    <span className='relative flex h-2.5 w-2.5'>
                                        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
                                        <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500'></span>
                                    </span>
                                    <span className='font-medium'>Available for Relocation & Remote Work</span>
                                </div>
                                <div className='flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400'>
                                    <span className='text-primary'>🕒</span>
                                    <span>Timezone: <span className='font-semibold text-gray-800 dark:text-gray-300'>IST (UTC +5:30)</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white/80 dark:bg-[#111a3e] border border-slate-200 dark:border-[#1f1641] rounded-xl p-6 relative overflow-hidden shadow-lg backdrop-blur-md flex flex-col justify-center min-h-[350px] transition-all duration-300'>
                        {submitSuccess && (
                            <div className='absolute inset-0 bg-white/95 dark:bg-[#111a3e]/95 flex flex-col items-center justify-center text-center p-6 z-10 transition-all duration-300'>
                                <div className='w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400 font-bold text-xl'>
                                    ✓
                                </div>
                                <h3 className='text-gray-900 dark:text-white font-bold text-lg mb-1'>Message Sent!</h3>
                                <p className='text-gray-600 dark:text-gray-400 text-sm'>Thank you, I'll get back to you as soon as possible.</p>
                            </div>
                        )}
                        
                        {!showForm ? (
                            <div className='flex flex-col items-center justify-center text-center py-6 px-2 animate-fade-in'>
                                <div className='w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5 text-primary'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.63 7.15a6 6 0 1 1-.82-2.18l2.13-2.13a2.38 2.38 0 0 0 .79 1.48 4.25 4.25 0 0 1 1.25 3.06" />
                                    </svg>
                                </div>
                                <h3 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2'>
                                    Have a project in mind?
                                </h3>
                                <p className='text-gray-600 dark:text-gray-400 mb-6 text-sm max-w-sm leading-relaxed'>
                                    Let's collaborate and turn your ideas into something extraordinary.
                                </p>
                                <button
                                    onClick={() => setShowForm(true)}
                                    className='w-full px-6 py-3.5 bg-primary text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:bg-primary/95 hover:scale-[1.01] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group text-sm md:text-base'
                                >
                                    <span>Let's Collaborate & Start a Project</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className='w-full animate-fade-in'>
                                <div className='flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800/80'>
                                    <h3 className='text-base font-bold text-gray-900 dark:text-white'>
                                        Send a Message
                                    </h3>
                                    <button
                                        type='button'
                                        onClick={() => setShowForm(false)}
                                        className='text-xs text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors flex items-center gap-1 cursor-pointer font-medium'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                        </svg>
                                        Back
                                    </button>
                                </div>

                                {submitError && (
                                    <div className='mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center font-medium animate-pulse'>
                                        {submitError}
                                    </div>
                                )}
                                <div className='mb-4'>
                                    <label htmlFor='name' className='text-gray-800 dark:text-white block mb-2 text-sm font-medium'>
                                        Your Name
                                    </label>
                                    <input
                                        type='text'
                                        id='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className='w-full px-4 py-2.5 bg-white dark:bg-[#050816] border border-slate-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:border-primary transition-colors'
                                        placeholder='John Doe'
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor='email' className='text-gray-800 dark:text-white block mb-2 text-sm font-medium'>
                                        Email Address
                                    </label>
                                    <input
                                        type='email'
                                        id='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='w-full px-4 py-2.5 bg-white dark:bg-[#050816] border border-slate-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:border-primary transition-colors'
                                        placeholder='your.email@example.com'
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor='message' className='text-gray-800 dark:text-white block mb-2 text-sm font-medium'>
                                        Your Message
                                    </label>
                                    <textarea
                                        id='message'
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className='w-full px-4 py-2.5 bg-white dark:bg-[#050816] border border-slate-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:border-primary transition-colors'
                                        placeholder='How can I help you today?'
                                        rows='4'
                                        required
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>

                                <button
                                    type='submit'
                                    disabled={isSubmitting}
                                    className='w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer'
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection