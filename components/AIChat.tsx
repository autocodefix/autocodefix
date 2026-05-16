"use client";
import { useState } from 'react';

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{role:string,text:string}[]>([
    {role:'ai', text:'Hi! I am your Auto Code Fix assistant. Ask me anything about OBD2 codes!'}
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(m => [...m, {role:'user', text:userMsg}]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({message: userMsg})
      });
      const data = await res.json();
      setMessages(m => [...m, {role:'ai', text: data.reply || 'Sorry, I could not answer that.'}]);
    } catch {
      setMessages(m => [...m, {role:'ai', text:'Sorry, something went wrong.'}]);
    }
    setLoading(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000,
          background: 'var(--orange)', color: 'white', border: 'none',
          borderRadius: '50%', width: 60, height: 60, fontSize: '1.5rem',
          cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        {open ? '✕' : '🤖'}
      </button>

      {open && (
        <div style={{
          position: 'fixed', bottom: '6rem', right: '2rem', zIndex: 999,
          width: 340, height: 450, background: 'var(--dark2)',
          border: '1px solid var(--border)', borderRadius: 16,
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
        }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', background: 'var(--orange)', color: 'white', fontWeight: 700 }}>
            🤖 AI Assistant
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                background: m.role === 'user' ? 'var(--orange)' : 'var(--card)',
                color: 'white', padding: '0.6rem 1rem', borderRadius: 12,
                fontSize: '0.85rem', maxWidth: '80%'
              }}>
                {m.text}
              </div>
            ))}
            {loading && <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Thinking...</div>}
          </div>
          <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask about any OBD2 code..."
              style={{
                flex: 1, padding: '0.5rem 0.75rem', borderRadius: 8,
                border: '1px solid var(--border)', background: 'var(--dark)',
                color: 'var(--text)', fontSize: '0.85rem'
              }}
            />
            <button onClick={send} style={{
              background: 'var(--orange)', color: 'white', border: 'none',
              borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 700
            }}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
