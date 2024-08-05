import '../styles/globals.css';
import Layout from '../components/layout';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from '../components/protectedRoute';

const noAuthRequired = ['/', '/recoverPassword'];

function MyApp({ Component, pageProps, router }) {

  const isNoAuthRequired = noAuthRequired.includes(router.pathname);

  if (isNoAuthRequired) {
    return <Component {...pageProps} />;
  }

  return (
    <ProtectedRoute>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProtectedRoute>
  );
}

export default MyApp;
