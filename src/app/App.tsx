import { MantineProvider } from '@mantine/core';
import Routes from 'routes';

import './App.css';

function App(): JSX.Element {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }}>
      <div className="App">
        <Routes />
      </div>
    </MantineProvider>
  );
}

export default App;
