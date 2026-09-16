import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f5f7f9', color: '#18202d', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>404 - Page Not Found</h1>
        <p style={{ color: '#718094', marginBottom: '20px' }}>The requested resource does not exist on the Midnight MASS portal.</p>
        <Link href="/" style={{ background: '#4f46c9', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
          Return to Workspace
        </Link>
      </div>
    </div>
  );
}
