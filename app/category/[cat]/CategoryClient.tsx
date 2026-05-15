"use client";
import Link from 'next/link';

export default function CategoryClient({ codes, meta, catLabel, sevHex, sevLabel }: any) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
      {codes.map((c: any) => (
        <Link
          key={c.code}
          href={`/${c.code.toLowerCase()}`}
          style={{ background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem', textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden', transition: 'border-color .2s, transform .2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--orange)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
        >
          {c.name}
        </Link>
      ))}
    </div>
  );
}
