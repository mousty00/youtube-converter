import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontSize: '3rem', color: '#ff6347' }}>Oops! Page Not Found</h1>
      <p style={{ fontSize: '1.25rem' }}>We couldn't find the page you're looking for.</p>
      <Link href="/" style={{ fontSize: '1rem', color: '#0070f3' }}>
        Go back to home
      </Link>
    </div>
  )
}
