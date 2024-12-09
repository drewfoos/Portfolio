'use client';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { axiforma } from '@/app/fonts';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

export const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'hiddenField') {
      setHoneypot(value);
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot.trim() !== '') {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }

    setIsLoading(true);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        toast.error("Email service is not properly configured. Please try again later.");
        setIsLoading(false);
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        publicKey
      );

      toast.success("Message sent successfully!");
      setFormData({ name: '', email: '', message: '' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}. Please try again later.`);
      } else {
        toast.error("Error sending message. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={`${axiforma.variable} relative w-full bg-[#0B0B0B] py-12 md:py-16 lg:py-20 px-4 lg:px-0`}>
      <div className="relative mx-auto max-w-4xl">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-12">
          {/* Title Section */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.1] lg:leading-[80px] font-axiforma font-light tracking-[-0.04em] capitalize bg-gradient-to-b from-[#FAFAFA] to-[rgba(250,250,250,0.71)] bg-clip-text text-transparent lg:max-w-[400px] mb-6 lg:mb-0">
            Send<br />
            Me A<br />
            Message
          </h2>

          {/* Form Section */}
          <div className="w-full lg:w-[500px]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field */}
              <div className="hidden">
                <label htmlFor="hiddenField">Do not fill this field</label>
                <input
                  type="text"
                  name="hiddenField"
                  id="hiddenField"
                  value={honeypot}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-white text-base md:text-lg leading-normal tracking-[-0.02em] mb-2"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="w-full h-[50px] md:h-[60px] bg-[#101010] border-0 text-white placeholder:text-white/60 text-base md:text-lg leading-normal tracking-[-0.02em] px-4 md:px-6"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-white text-base md:text-lg leading-normal tracking-[-0.02em] mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="w-full h-[50px] md:h-[60px] bg-[#101010] border-0 text-white placeholder:text-white/60 text-base md:text-lg leading-normal tracking-[-0.02em] px-4 md:px-6"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-white text-base md:text-lg leading-normal tracking-[-0.02em] mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="w-full h-[120px] md:h-[140px] bg-[#101010] border-0 text-white placeholder:text-white/60 text-base md:text-lg leading-normal tracking-[-0.02em] px-4 md:px-6 py-4 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-8 h-[50px] bg-gradient-to-br from-[#1919A7] to-[#D017B8] text-white text-base md:text-lg leading-normal tracking-[-0.02em] hover:opacity-90 disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Submit'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;