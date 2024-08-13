import Head from 'next/head';
import Link from 'next/link';

const Custom500 = () => {
  return (
    <>
      <Head>
        <title>500 - Internal Server Error</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-base-content">
        <h1 className="text-6xl font-bold mb-4">500</h1>
        <p className="text-xl mb-8">Oops! Something went wrong on our end.</p>
        <Link href="/homepage" className="btn btn-primary">Go Home </Link>
      </div>
    </>
  );
};

export default Custom500;
