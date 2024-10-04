import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-dvh'>
      <h1 className='mb-10'>404 Error Page</h1>
      <Link to={'/'}>
        <button className='btn btn-primary'>Go to homepage</button>
      </Link>
    </div>
  );
};
