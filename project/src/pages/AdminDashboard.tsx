import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AuraGlow } from '../components/ui/aura-glow';
import { Check, X } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
  status: 'pending' | 'responded' | 'rejected';
}

export function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchContacts();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin');
    }
  };

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Map the read status to our status enum
      const mappedContacts = (data || []).map(contact => ({
        ...contact,
        status: contact.read ? 'responded' : 'pending'
      }));
      
      setContacts(mappedContacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const markAsResponded = async (contact: Contact) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ read: true })
        .eq('id', contact.id);

      if (error) throw error;
      
      setContacts(contacts.map(c => 
        c.id === contact.id ? { ...c, status: 'responded' } : c
      ));
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const markAsRejected = async (contact: Contact) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ read: true })
        .eq('id', contact.id);

      if (error) throw error;
      
      setContacts(contacts.map(c => 
        c.id === contact.id ? { ...c, status: 'rejected' } : c
      ));
    } catch (error) {
      console.error('Error rejecting contact:', error);
    }
  };

  return (
    <div className="min-h-screen p-8 relative">
      <AuraGlow className="fixed top-1/4 -left-48 w-96 h-96 bg-primary/30" />
      <AuraGlow className="fixed bottom-1/4 -right-48 w-96 h-96 bg-accent/30" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Contact Submissions</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition"
          >
            Logout
          </button>
        </div>

        {loading ? (
          <div className="text-center text-foreground/60">Loading...</div>
        ) : contacts.length === 0 ? (
          <div className="text-center text-foreground/60">No contact submissions yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="text-left py-4 px-6 text-primary font-semibold">Name</th>
                  <th className="text-left py-4 px-6 text-primary font-semibold">Email</th>
                  <th className="text-left py-4 px-6 text-primary font-semibold">Message</th>
                  <th className="text-right py-4 px-6 text-primary font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className={`border-b border-primary/10 transition-all ${
                      contact.status === 'pending' ? 'bg-secondary/30' :
                      contact.status === 'responded' ? 'bg-secondary/20' :
                      'bg-red-500/10'
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="font-semibold text-foreground">{contact.name}</div>
                      <div className="text-sm text-foreground/60">
                        {new Date(contact.created_at).toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-primary">{contact.email}</td>
                    <td className="py-4 px-6 text-foreground/80">
                      <div className="max-w-md whitespace-pre-wrap">{contact.message}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end gap-2">
                        {contact.status === 'pending' && (
                          <>
                            <button
                              onClick={() => markAsResponded(contact)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded text-sm bg-primary text-background hover:bg-primary/90"
                            >
                              <Check size={16} />
                              Mark Responded
                            </button>
                            <button
                              onClick={() => markAsRejected(contact)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded text-sm bg-red-500/10 text-red-500 hover:bg-red-500/20"
                            >
                              <X size={16} />
                              Reject
                            </button>
                          </>
                        )}
                        {contact.status === 'responded' && (
                          <span className="flex items-center gap-1 px-3 py-1.5 rounded text-sm bg-primary/10 text-primary">
                            <Check size={16} />
                            Responded
                          </span>
                        )}
                        {contact.status === 'rejected' && (
                          <span className="flex items-center gap-1 px-3 py-1.5 rounded text-sm bg-red-500/10 text-red-500">
                            <X size={16} />
                            Rejected
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}