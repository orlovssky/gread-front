import { Paper, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const Error404 = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Paper
      component="main"
      radius={0}
      className="paper_full-height"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
      <Text
        component="h1"
        sx={{
          fontSize: 'calc(1rem + 8vw)',
          margin: '0'
        }}
        variant="gradient"
        gradient={{ from: 'primary', to: 'primary', deg: 45 }}>
        404
      </Text>
      <Text
        component="h2"
        sx={{
          fontSize: 'calc(1rem + 2vw)',
          margin: '0'
        }}
        variant="gradient"
        gradient={{ from: 'primary', to: 'primary', deg: 45 }}>
        {t('error404')}
      </Text>
    </Paper>
  );
};

export default Error404;
