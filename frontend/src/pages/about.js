import Head from 'next/head';
import Layout from '@/components/Layout';

const AboutPage = () => {
  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>
      <div className="container mx-auto py-8 px-20 text-center md:px-32 lg:px-60 ">
        <h1 className="text-4xl font-bold mb-8 text-primary">About Epic Reads</h1>
        <p className="text-lg text-base-content">
          Epic Reads is an online library platform where you can discover and explore a wide range of books. Whether you
          are looking for the latest bestseller or a timeless classic, Epic Reads has something for everyone. Join us on
          a literary adventure and immerse yourself in the world of books.
        </p>
      </div>
    </Layout>
  );
};

export default AboutPage;
