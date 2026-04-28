import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../components/useScrollReveal';
import '../styles/InnerPage.css';
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMailLock } from "react-icons/md";
import { LuAlarmClock } from "react-icons/lu";
import { BsChat } from "react-icons/bs";
import { GrLocationPin } from "react-icons/gr";

const Contact = () => {
  useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="inner-page">
      <div className="page-hero">
        <div className="page-hero-grid" />
        <div className="page-hero-watermark">CONTACT</div>
        <div className="content-wrap">
          <div className="page-hero-breadcrumb">
            <Link to="/">Home</Link> › <span>Contact</span>
          </div>
          <h1>GET IN <span className="hl">TOUCH</span></h1>
          <p className="page-hero-sub">Ready to start building? Reach out and our team will respond within 24 hours to discuss your project.</p>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <section className="ip-section">
        <div className="contact-grid">
          {/* INFO */}
          <div className="contact-info sr-l">
            <div className="sec-tag">Contact Info</div>
            <h2 className="sec-title">Let's <span className="hl">Connect</span></h2>
            <p className="sec-desc" style={{ marginBottom: 40 }}>
              We'd love to discuss your project. Whether you have a clear vision or just an idea, our team is here to guide you every step of the way.
            </p>

            <div className="contact-cards">
              <div className="contact-card">
                <div className="cc-icon"><IoLocationOutline /> </div>
                <div>
                  <div className="cc-lbl">Our Office</div>
                  <div className="cc-val">22/26 G.K Tower, Opp Bismi Hyper Mart,<br />Near Stadium Bus Stand, Palakkad - 678001</div>
                </div>
              </div>
              <div className="contact-card">
                <div className="cc-icon"><FiPhoneCall /></div>
                <div>
                  <div className="cc-lbl">Phone</div>
                  <div className="cc-val"><a href="tel:+919072097374">+91 907 209 7374</a></div>
                  <div className="cc-val"><a href="tel:+919388006262">+91 938 800 6262</a></div>
                </div>
              </div>
              <div className="contact-card">
                <div className="cc-icon"><MdOutlineMailLock /></div>
                <div>
                  <div className="cc-lbl">Email</div>
                  <div className="cc-val"><a href="mailto:orchiddesignerspkd@gmail.com">orchiddesignerspkd@gmail.com</a></div>
                  <div className="cc-val"><a href="mailto:orchidbuilderspgt@gmail.com">orchidbuilderspgt@gmail.com</a></div>
                </div>
              </div>
              <div className="contact-card">
                <div className="cc-icon"><LuAlarmClock /></div>
                <div>
                  <div className="cc-lbl">Working Hours</div>
                  <div className="cc-val">Mon – Sat: 9:00 AM – 6:00 PM</div>
                  <div className="cc-val">Sunday: By Appointment</div>
                </div>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="contact-social">
              <div className="cc-lbl" style={{ marginBottom: 14 }}>Follow Us</div>
              <div className="contact-social-row">
                {['f', 'in', 'ig', 'yt'].map(s => (
                  <a key={s} href="#!" className="f-soc" style={{ textDecoration: 'none' }}>{s}</a>
                ))}
              </div>
            </div>

            <a href="https://wa.me/919388006262" className="btn-glow wa-contact-btn" target="_blank" rel="noreferrer"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 32 }}>
              <BsChat /> Chat on WhatsApp
            </a>
          </div>

          {/* FORM */}
          <div className="contact-form-side sr-r">
            <div className="contact-form-wrap">
              <div className="cf-header">
                <div className="sec-tag">Quick Connect</div>
                <h3 className="cf-title">Send Us a Message</h3>
              </div>

              {sent && (
                <div className="cf-success">
                  ✅ Message sent! We'll get back to you within 24 hours.
                </div>
              )}

              <form className="cf-form" onSubmit={submit}>
                <div className="cf-row">
                  <div className="cf-field">
                    <label>Full Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handle} placeholder="Your full name" required />
                  </div>
                  <div className="cf-field">
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handle} placeholder="+91 XXXXX XXXXX" required />
                  </div>
                </div>
                <div className="cf-row">
                  <div className="cf-field">
                    <label>Email Address</label>
                    <input type="email" name="email" value={form.email} onChange={handle} placeholder="your@email.com" />
                  </div>
                  <div className="cf-field">
                    <label>Service Required</label>
                    <select name="subject" value={form.subject} onChange={handle}>
                      <option value="">Select a service</option>
                      <option>Design & Construction</option>
                      <option>Renovation & Remodeling</option>
                      <option>Interior Design</option>
                      <option>Project Management</option>
                      <option>Vasthu Consultancy</option>
                      <option>Landscaping</option>
                      <option>Property Consultancy</option>
                      <option>Other / Free Quote</option>
                    </select>
                  </div>
                </div>
                <div className="cf-field">
                  <label>Your Message *</label>
                  <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us about your project — location, size, timeline, budget..." rows={5} required />
                </div>
                <button type="submit" className="btn-glow cf-submit">Send Message →</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="ip-section ip-alt-sec" style={{ paddingTop: 0 }}>
        <div className="map-wrap sr">
          <div className="map-placeholder">
            <div className="map-pin"><GrLocationPin /></div>
            <div className="map-text">
              <strong>Orchid Builders</strong><br />
              22/26 G.K Tower, Near Stadium Bus Stand, Palakkad 1, Kerala
            </div>
            <a href="https://goo.gl/maps/palakkad" target="_blank" rel="noreferrer" className="btn-glow" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginTop: 20 }}>
              Open in Maps
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;