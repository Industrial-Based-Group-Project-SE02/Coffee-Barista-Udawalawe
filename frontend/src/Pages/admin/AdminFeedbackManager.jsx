import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminFeedbackManager = ({ mode }) => {
  const location = useLocation();
  const activeMode = mode || (location.pathname.endsWith('/visible') ? 'visible' : location.pathname.endsWith('/hidden') ? 'hidden' : 'all');

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState({});
  const [sendingId, setSendingId] = useState(null);

  useEffect(() => { fetchFeedbacks(); }, [activeMode]);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (activeMode === 'visible') {
        const res = await axios.get('http://localhost:3000/api/feedbacks');
        setFeedbacks(res.data.feedbacks);
      } else {
        const res = await axios.get('http://localhost:3000/api/feedbacks/all', { headers: { Authorization: `Bearer ${token}` } });
        let list = res.data.feedbacks || [];
        if (activeMode === 'hidden') list = list.filter(f => !f.isVisible);
        setFeedbacks(list);
      }
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
      toast.error('Error fetching feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this feedback?')) return;
    const t = toast.loading('Deleting...');
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/feedbacks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Deleted', { id: t });
      fetchFeedbacks();
    } catch (err) {
      console.error(err);
      toast.error('Delete failed', { id: t });
    }
  };

  const toggleVisibility = async (id, current) => {
    const t = toast.loading(current ? 'Hiding...' : 'Making visible...');
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:3000/api/feedbacks/${id}/visibility`, { isVisible: !current }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Updated', { id: t });
      fetchFeedbacks();
    } catch (err) {
      console.error(err);
      toast.error('Update failed', { id: t });
    }
  };

  const handleSend = async (id) => {
    const message = messages[id] || '';
    if (!message) return toast.error('Please enter a message');
    setSendingId(id);
    const t = toast.loading('Sending message...');
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:3000/api/feedbacks/${id}/message`, { message }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Message sent', { id: t });
      setMessages(prev => ({ ...prev, [id]: '' }));
    } catch (err) {
      console.error(err);
      toast.error('Send failed', { id: t });
    } finally {
      setSendingId(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Feedback Management</h1>
        <div className="flex gap-2">
          <Link to="/admin/feedback" className={`px-3 py-2 rounded ${activeMode === 'all' ? 'bg-amber-500 text-white' : 'bg-stone-800 text-amber-300'}`}>All</Link>
          <Link to="/admin/feedback/visible" className={`px-3 py-2 rounded ${activeMode === 'visible' ? 'bg-amber-500 text-white' : 'bg-stone-800 text-amber-300'}`}>Visible</Link>
          <Link to="/admin/feedback/hidden" className={`px-3 py-2 rounded ${activeMode === 'hidden' ? 'bg-amber-500 text-white' : 'bg-stone-800 text-amber-300'}`}>Hidden</Link>
        </div>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="space-y-4">
          {feedbacks.length === 0 && <p className="text-amber-300">No feedback yet</p>}
          {feedbacks.map(fb => (
            <div key={fb._id} className="glass-strong p-4 rounded-lg border border-amber-500/20">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-white">{fb.name} {fb.email && <span className="text-amber-300/70">• {fb.email}</span>}</p>
                  <p className="text-amber-300/80 mt-2">{fb.message}</p>
                  {fb.rating && <p className="text-amber-300/70 mt-2">Rating: {fb.rating}</p>}
                  <p className="text-amber-300/70 text-sm mt-2">{new Date(fb.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button onClick={() => handleDelete(fb._id)} className="px-3 py-2 bg-red-600/20 text-red-300 rounded">Delete</button>
                  <button onClick={() => toggleVisibility(fb._id, fb.isVisible)} className="px-3 py-2 bg-amber-600/10 text-amber-300 rounded">{fb.isVisible ? 'Hide' : 'Show'}</button>
                </div>
              </div>

              <div className="mt-4">
                <textarea className="w-full p-2 rounded bg-stone-900 text-white" placeholder="Message to the user..." value={messages[fb._id] || ''} onChange={(e) => setMessages(prev => ({ ...prev, [fb._id]: e.target.value }))} />
                <div className="flex justify-end mt-2">
                  <button onClick={() => handleSend(fb._id)} disabled={sendingId === fb._id} className="px-4 py-2 bg-amber-500 rounded text-white">Send Message</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFeedbackManager;
