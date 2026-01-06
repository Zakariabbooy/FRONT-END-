import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      value: '+212 6 63 29 18 61',
      color: 'from-blue-500 to-cyan-500',
      delay: '0.2s',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      value: 'anaselm83@gmail.com',
      color: 'from-purple-500 to-pink-500',
      delay: '0.3s',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Address',
      value: 'Fes, Morocco',
      color: 'from-green-500 to-emerald-500',
      delay: '0.4s',
    },
  ];

  return (
    <div className="min-h-screen py-12 dark-gradient-bg particle-bg relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-500 animate-scale-in">
              <span className="text-4xl">📧</span>
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-4 gradient-text animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Contact Us
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="mb-6 glass-card border-2 border-green-500/50 rounded-2xl p-6 flex items-center space-x-4 shadow-xl animate-fade-in-up">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-scale-in">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-300 font-bold text-lg">Message sent successfully! We'll get back to you soon.</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start lg:items-center">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6 flex flex-col justify-center">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift border border-white/10 hover:border-purple-500/50 animate-fade-in-up"
                style={{ animationDelay: info.delay }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {info.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg mb-1">{info.title}</h3>
                      <p className="text-white/70 font-medium mt-1 sm:mt-0 sm:ml-4 sm:text-right whitespace-normal sm:whitespace-nowrap">
                        {info.value}
                      </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-3">💬</span>
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <Input
                      label="Your Name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                    <Input
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                  <Input
                    label="Subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div className="w-full animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                  <label htmlFor="message" className="block text-sm font-semibold text-white/90 mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-5 py-4 glass-card border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-white placeholder:text-white/40 ${
                      errors.message
                        ? 'border-red-500 focus:ring-red-500/20 animate-shake'
                        : 'border-white/20 hover:border-purple-300/50 focus:scale-[1.01]'
                    }`}
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-400 flex items-center animate-fade-in">
                      <svg className="w-4 h-4 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="animate-fade-in-up pt-2" style={{ animationDelay: '1s' }}>
                  <Button
                    type="submit"
                    className="w-full text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      '🚀 Send Message'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
