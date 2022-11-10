import { Spin, Typography } from 'antd';
import moment from 'moment';
import { Suspense, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate, useRoutes } from 'react-router-dom';
import 'moment/locale/vi';
import { routes } from './configs';
import { useGetCitiesQuery } from './services/placeApi';
import { useLazyGetMyHubQuery } from './modules/hubs/services/hubApi';
import { useAuthentication } from './contexts/authContext';

moment().locale('vi');

function App() {
  const { isAuthenticating, userInfo } = useAuthentication();
  const element = useRoutes(routes);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const cities = useGetCitiesQuery({});
  const [getMyHub, hubState] = useLazyGetMyHubQuery({});

  useEffect(() => {
    if (userInfo) {
      getMyHub({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  useEffect(() => {
    if (hubState.error && (hubState.error as any).status === 404) {
      navigate('/create-hub');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hubState.error]);

  if (isAuthenticating) {
    return <Typography.Text>Logging In ....!!!</Typography.Text>;
  }

  return (
    <HelmetProvider>
      <Suspense fallback={<Spin size='large' />}>{element}</Suspense>
    </HelmetProvider>
  );
}

export default App;
