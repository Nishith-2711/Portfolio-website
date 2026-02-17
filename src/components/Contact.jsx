import React, { useState, useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [ref, isVisible] = useScrollAnimation(0.2);
    const form = useRef();
    const [status, setStatus] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');

        // Replace these with your actual EmailJS service, template, and public key
        // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')

        // Simulating success for now
        setTimeout(() => {
            setStatus('success');
            e.target.reset();
            setTimeout(() => setStatus(''), 5000);
        }, 1500);
    };

    return (
        <section id="contact" className={`contact section ${isVisible ? 'visible' : ''}`} ref={ref}>
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>
                <div className="contact-content">
                    <div className="contact-info">
                        <h3>Let's Connect</h3>
                        <p>
                            I'm currently looking for new opportunities. Whether you have a question or just want to say hi,
                            I'll try my best to get back to you!
                        </p>
                        <div className="contact-details">
                            <div className="contact-item">
                                <span className="contact-label">Email:</span>
                                <a href="mailto:nishithhingoo@gmail.com" className="contact-link">nishithhingoo@gmail.com</a>
                            </div>
                        </div>
                    </div>
                    <form ref={form} onSubmit={sendEmail} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="user_name" id="name" required placeholder="Your Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="user_email" id="email" required placeholder="Your Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea name="message" id="message" required placeholder="Your Message" rows="5"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>
                        {status === 'success' && <p className="success-message">Message sent successfully!</p>}
                        {status === 'error' && <p className="error-message">Failed to send message. Please try again.</p>}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
