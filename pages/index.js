import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeService, setActiveService] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const canvasRef = useRef(null)

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  // Import images
  const servicesImages = {
    analytics: "/images/analytics.jpeg",
    design: "/images/design.png",
    development: "/images/development.jpg",
    hero: "/images/hero-bg.jpg",
    process: "/images/process.jpeg",
    team: "/images/team.jpeg"
  }

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Form functions
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', company: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const openEmailClient = () => {
    const subject = "Contact Request - T&R Technologies"
    const body = "Hello T&R Technologies,\n\nI would like to get in touch with you regarding..."
    window.location.href = `mailto:hello@tandrtechnologies.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const services = [
    {
      title: "Product Strategy",
      description: "Define your vision with process mapping, data architecture, user journeys, and detailed product specifications",
      image: servicesImages.analytics
    },
    {
      title: "UX/UI Design",
      description: "Create engaging interfaces with user-centered wireframes, prototypes, and pixel-perfect visual designs",
      image: servicesImages.design
    },
    {
      title: "Full-Stack Development",
      description: "Build scalable applications with modern frameworks, cloud architecture, and performance-optimized code",
      image: servicesImages.development
    }
  ]

  /*const stats = [
    { number: "60", label: "MVP launched", suffix: "+" },
    { number: "2", label: "Months to launch an MVP", suffix: "-3" },
    { number: "30", label: "People in the team", suffix: "+" },
    { number: "15000", label: "Minimum project price", prefix: "€ " }
  ]*/

  const processSteps = [
    {
      number: "[01]",
      title: "Define & Align",
      description: "We begin by deeply understanding your goals and requirements, ensuring we're building the right solution from day one",
      image: "/images/requirements.webp"
    },
    {
      number: "[02]",
      title: "Build & Iterate",
      description: "We develop in focused 2-week sprints, delivering tangible progress and working features for your review every iteration",
      image: "/images/sprint.jpg"
    },
    {
      number: "[03]",
      title: "Track & Update",
      description: "Receive clear weekly progress reports showing completed work, current priorities, and upcoming deliverables",
      image: "/images/report.jpeg"
    },
    {
      number: "[04]",
      title: "Connect & Collaborate",
      description: "Maintain direct access to our team through regular syncs and instant messaging—ensuring seamless communication throughout",
      image: "/images/communication.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img
                src="/images/logo.jpeg"
                alt="T&R Technologies Logo"
                className="h-14 w-auto"
              />
              <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                T&R Technologies
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Services', 'Process', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
            <a href="#contact" className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              Contact us
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 51, 102, 0.8)), url(${servicesImages.hero})`
          }}
        ></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Smart Solutions
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              For Smarter Businesses
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Design Support and Development for Modern Businesses. From Low-code websites to Full-stack Applications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Your Project
            </a>
          </div>
        </div>

        {/* Tech Stack Marquee */}
        <div className="absolute bottom-10 left-0 right-0 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Webflow', 'Figma', 'Flutter', 'AWS', 'MongoDB'].map((tech, index) => (
              <div key={index} className="mx-8 text-gray-400 text-lg font-medium">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/about-us.gif"
                alt="About T&R Technologies"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                END-TO-END DIGITAL SOLUTIONS
                <br />
                TRANSFORMING IDEAS
                <br />
                INTO EXCEPTIONAL PRODUCTS
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                A remarkable product needs a digital presence to match. We partner with you to translate your vision into a powerful online experience that drives growth and establishes your leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
            <p className="text-gray-400">Comprehensive solutions for your digital needs</p>
          </div>

          {/* Services Tabs */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {services.map((service, index) => (
                <button
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeService === index
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                >
                  {service.title}
                </button>
              ))}
            </div>

            {/* <div className="bg-gray-800 rounded-2xl p-8"> */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">{services[activeService].title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {services[activeService].description}
                </p>
              </div>
              <div className="bg-gray-700 rounded-xl overflow-hidden">
                <img
                  src={services[activeService].image}
                  alt={services[activeService].title}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
            {/*</div>*/}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Process & Management</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our process turns vision into results. With clear planning and transparent communication, we manage every step to deliver exactly what your product needs to succeed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
                <div className="h-40 bg-gray-700 overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-cyan-400 text-lg font-mono mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section 
      <section id="stats" className="py-20 relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${servicesImages.hero})` }}
        ></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">T&R Technologies In Numbers</h2>
            <p className="text-gray-400">We simplify the complex. No-code and low-code tools. High-end design. Scalable digital experiences that deliver results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {stat.prefix}{stat.number}{stat.suffix}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
            </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${servicesImages.hero})` }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Do Projects Together!</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Share your goals with us — and let's create something that makes an impact
          </p>
          <a href="#contact" className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block">
            Contact us
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to transform your business? Send us a message and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-gray-900 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    placeholder="Tell us about your project or how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending Message...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
                    Thank you! Your message has been sent. We'll get back to you within 24 hours.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
                    Failed to send message. Please email us directly at hello@tandrtechnologies.com
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                <div className="space-y-4">
                  {[
                    { title: 'Location', content: 'Dubai, United Arab Emirates' },
                    { title: 'Email', content: 'hello@tandrtechnologies.com' },
                     
                  
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-gray-800">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <div className="font-semibold text-cyan-400">{item.title}</div>
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-300 hover:text-cyan-100 transition-colors duration-200 underline"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <div className="text-gray-300">{item.content}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-cyan-400 mb-3">Quick Response</h4>
                <p className="text-gray-300 text-sm">
                  We typically respond to all inquiries within 24 hours. For urgent matters,
                  please call us directly or use the email button.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img
                src="/images/logo.jpeg"
                alt="T&R Technologies Logo"
                className="h-14 w-auto"
              />
              <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                T&R Technologies
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 T&R Technologies LLC. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}