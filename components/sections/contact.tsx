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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }

    setIsLoading(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      toast.success("Message sent successfully! A confirmation email has been sent.");
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error("Error sending message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={`${axiforma.variable} relative w-full bg-[#0B0B0B] pt-20 pb-20 px-4`}>
      <div className="relative mx-auto max-w-[1325px]">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
          {/* Title Section */}
          <h2 className="text-5xl sm:text-7xl lg:text-[100px] leading-tight lg:leading-[100px] font-axiforma font-light tracking-[-0.04em] capitalize bg-gradient-to-b from-[#FAFAFA] to-[rgba(250,250,250,0.71)] bg-clip-text text-transparent lg:max-w-[529px]">
            Send<br />
            Me A<br />
            Message
          </h2>

          {/* Form Section */}
          <div className="w-full lg:w-[632px]">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-white text-[20px] leading-[30px] tracking-[-0.02em] mb-2"
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
                  className="w-full h-[80px] bg-[#101010] border-0 text-white placeholder:text-white text-xl leading-[30px] tracking-[-0.02em] px-8"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-white text-[20px] leading-[30px] tracking-[-0.02em] mb-2"
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
                  className="w-full h-[80px] bg-[#101010] border-0 text-white placeholder:text-white text-xl leading-[30px] tracking-[-0.02em] px-8"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-white text-[20px] leading-[30px] tracking-[-0.02em] mb-2"
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
                  className="w-full h-[160px] bg-[#101010] border-0 text-white placeholder:text-white text-xl leading-[30px] tracking-[-0.02em] px-8 py-6 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-[147px] h-[54px] bg-gradient-to-br from-[#1919A7] to-[#D017B8] text-white text-xl leading-[30px] tracking-[-0.02em] hover:opacity-90 disabled:opacity-50"
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
