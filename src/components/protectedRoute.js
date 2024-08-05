import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
      router.push('/');
    }
  }, [router]);

  return children;
};

export default ProtectedRoute;