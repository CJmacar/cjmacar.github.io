import React from 'react';

function Contact() {
    return (
        <div className="container mx-auto text-center py-10">
            <h2 className="text-deep-sea-blue text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-slate-gray mb-6">Get in touch to see how our solutions can help streamline and enhance your product development.</p>
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message"></textarea>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Contact;
