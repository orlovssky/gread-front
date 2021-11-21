import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Header from 'components/main/header';
import SettingsDrawer from 'components/main/settings';
import Routes from 'routes';
import { useAppSelector } from 'store/hooks';

import './App.css';

function App(): JSX.Element {
  const { theme } = useAppSelector((state) => state.mainTheme);
  return (
    <MantineProvider theme={theme}>
      <NotificationsProvider>
        <div className="App">
          <SettingsDrawer />
          <Header />
          <Routes />
        </div>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
