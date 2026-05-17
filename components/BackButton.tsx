'use client'
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: 'rgba(255,87,34,0.08)',
        border: '1px solid rgba(255,87,34,0.25)',
        borderRadius: 20, padding: '6px 14px',
        cursor: 'pointer', color: 'var(--muted)',
        fontSize: '0.82rem', fontWeight: 500,
        transition: 'all 0.2s', marginBottom: '1.5rem',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.color = 'var(--orange)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--orange)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,87,34,0.25)';
      }}
    >
      ← Back
    </button>
  )
}
