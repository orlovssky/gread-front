import { Paper, Grid, Col, Button, Group } from '@mantine/core';
import WelcomeTitle from 'components/welcome/WelcomeTitle';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Welcome = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  function goTo(page: string) {
    navigate(`/${page}`);
  }
  return (
    <Paper
      component="main"
      radius={0}
      className="paper_full-height"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}>
      <WelcomeTitle />
      <Grid
        gutter={0}
        sx={{
          marginTop: '60px'
        }}>
        <Col span={10} offset={1} sm={6} offsetSm={3} lg={4} offsetLg={4}>
          <Group direction="column" spacing="xs" grow mb="xs">
            <Button onClick={() => goTo('signup')}>{t('signUp')}</Button>
            <Button variant="light" onClick={() => goTo('signin')}>
              {t('signIn')}
            </Button>
          </Group>
        </Col>
      </Grid>
    </Paper>
  );
};
export default Welcome;
