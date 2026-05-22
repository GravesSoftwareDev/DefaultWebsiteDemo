import { useState } from 'react'
import './Contact.css'
import type { Contact } from '../../../Types'
import { submitContactForm } from '../../../jsTools/API'

type FormErrors = {
    first_name?: string
    email?: string
    message?: string
}

export default function Contact() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_num: '',
        message: '',
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const validate = (): FormErrors => {
        const errs: FormErrors = {}
        if (!formData.first_name.trim()) errs.first_name = 'Required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            errs.email = 'Valid email required'
        if (!formData.message.trim()) errs.message = 'Required'
        return errs
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length > 0) {
            setErrors(errs)
            return
        }
        setSubmitting(true)
        try {
            await submitContactForm({
                first_name: formData.first_name.trim(),
                last_name: formData.last_name.trim() || undefined,
                email: formData.email.trim(),
                phone_num: formData.phone_num.trim() || undefined,
                message: formData.message.trim(),
            })
            setSubmitted(true)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="contact-page">
            <section className="contact-hero">
                <h1>Contact Us</h1>
                <p>
                    Have a question or want to get in touch?
                    We'd love to hear from you.
                </p>
            </section>

            <div className="contact-body">
                <section className="contact-form-section">
                    <p className="section-label">Send a message</p>

                    {submitted ? (
                        <div className="success-state">
                            <div className="success-icon">✓</div>
                            <h2>Message Sent</h2>
                            <p>
                                Thank you for reaching out. We'll get back to
                                you as soon as possible.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="first_name">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        placeholder="Jane"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                    />
                                    {errors.first_name && (
                                        <span className="error-msg">
                                            {errors.first_name}
                                        </span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="last_name">
                                        Last Name{' '}
                                        <span className="optional">
                                            (optional)
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        placeholder="Smith"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="jane@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && (
                                        <span className="error-msg">
                                            {errors.email}
                                        </span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone_num">
                                        Phone{' '}
                                        <span className="optional">
                                            (optional)
                                        </span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone_num"
                                        name="phone_num"
                                        placeholder="(417) 555-0100"
                                        value={formData.phone_num}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell us what you're looking for…"
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                                {errors.message && (
                                    <span className="error-msg">
                                        {errors.message}
                                    </span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={submitting}
                            >
                                {submitting ? 'Sending…' : 'Send Message'}
                            </button>
                        </form>
                    )}
                </section>

                <section className="contact-info-section">
                    <p className="section-label">Get in touch</p>

                    <div className="info-item">
                        <h3>Office</h3>
                        <p>
                            123 street st
                            <br />
                            Anytown, USA 12345
                        </p>
                    </div>

                    <div className="info-item">
                        <h3>Hours</h3>
                        <p>
                            Monday – Friday: 9am – 5pm
                            <br />
                            Saturday: By appointment
                        </p>
                    </div>

                    <div className="info-item">
                        <h3>Phone</h3>
                        <a href="tel:+11231231234">(123) 123-1234</a>
                    </div>

                    <div className="info-item">
                        <h3>Email</h3>
                        <a href="mailto:temp@example.com">
                            temp@example.com
                        </a>
                    </div>
                </section>
            </div>
        </div>
    )
}