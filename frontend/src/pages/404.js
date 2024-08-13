import Head from 'next/head';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-base-content">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Sorry, the page you are looking for could not be found.</p>
        <Link href="/homepage"className="btn btn-primary">Go Home </Link>
      </div>
    </>
  );
};

export default Custom404;
