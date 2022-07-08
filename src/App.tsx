import { Spin } from 'antd';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './configs';

function App() {
  const element = useRoutes(routes);
  return <Suspense fallback={<Spin size='large' />}>{element}</Suspense>;
}

export default App;
