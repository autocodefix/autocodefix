"use client";
"use client";
import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        background: 'var(--dark2)',
        borderBottom: '1px solid var(--border)',
        padding: '0.65rem 2rem',
        fontSize: '0.78rem',
        color: 'var(--muted)',
      }}
    >
      <ol
        style={{
          listStyle: 'none',
          display: 'flex',
          gap: 6,
          alignItems: 'center',
          flexWrap: 'wrap',
          maxWidth: 1180,
          margin: '0 auto',
          padding: 0,
        }}
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li
              key={i}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              {i > 0 && (
                <span style={{ color: 'var(--border)', userSelect: 'none' }} aria-hidden>›</span>
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  itemProp="item"
                  style={{
                    color: 'var(--muted)',
                    textDecoration: 'none',
                    transition: 'color .15s',
                  }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--orange)')}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--muted)')}
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span
                  itemProp="name"
                  style={{ color: isLast ? 'var(--orange)' : 'var(--muted)', fontWeight: isLast ? 600 : 400 }}
                >
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={String(i + 1)} />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
