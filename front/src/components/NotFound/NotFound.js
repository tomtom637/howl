import {Link} from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container">
      <h1 className='page-title'>404 Page not found</h1>
      <p>It seems you hit a wrong path...</p>
      <p>
        <Link
          style={{
            color: 'var(--secondary)',
            fontSize: '1.2rem',
          }}
          to="/">Back to the homepage</Link>
      </p>
    </div>
  );
}

export default NotFound;