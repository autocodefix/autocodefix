"use client";
import Link from 'next/link';
import { OBDCode, sevHex } from '@/lib/codes-db';

interface Props {
  currentCode?: string;
  codes: OBDCode[];
}

export default function RelatedCodes({ codes }: Props) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {codes.map(c => (
        <Link
          key={c.code}
          href={`/${c.code.toLowerCase()}`}
          style={{ textDecoration: 'none', padding: '4px 12px', borderRadius: 20, border: '1px solid var(--border)', fontSize: '0.85rem', color: 'var(--text)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--orange)'; (e.currentTarget as HTMLElement).style.color = 'var(--orange)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text)' }}
        >
          {c.code}
        </Link>
      ))}
    </div>
  );
}
