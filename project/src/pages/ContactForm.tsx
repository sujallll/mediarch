import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { AuraGlow } from '../components/ui/aura-glow';
import { BackgroundPaths } from '../components/ui/background-paths';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message
          }
        ]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <BackgroundPaths title="Contact Us" />
      <div className="min-h-screen flex items-center justify-center relative py-12">
        <AuraGlow className="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/30" />
        <AuraGlow className="absolute bottom-1/4 -right-48 w-96 h-96 bg-yellow-500/30" />
        
        <div className="w-full max-w-2xl mx-auto px-4">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-yellow-500/20 p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Get in Touch</h2>
            
            {status === 'success' ? (
              <div className="text-center p-6 bg-yellow-500/10 rounded-lg">
                <p className="text-yellow-500 font-semibold text-lg mb-4">Thank you for your message!</p>
                <p className="text-foreground/80">We'll get back to you as soon as possible.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-yellow-500/20 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-yellow-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-yellow-500/20 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-yellow-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-black/50 border border-yellow-500/20 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-yellow-500"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-600 transition disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}