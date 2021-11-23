import { Paper, Grid, Col, TextInput, Button, PasswordInput, Title, Text } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { EnvelopeClosedIcon } from '@modulz/radix-icons';
import { SignUpUserModel } from 'models/auth';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signUpUserApi } from 'services/auth';

const SignUp = (): JSX.Element => {
  const { t } = useTranslation();
  const notifications = useNotifications();
  const navigate = useNavigate();
  function goTo(page: string) {
    navigate(`/${page}`);
  }

  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      firstname: '',
      lastname: '',
      password: ''
    },

    validationRules: {
      email: (value) =>
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/.test(
          value
        ),
      password: (value) => !!value && value.length >= 6
    }
  });

  useEffect(() => {
    form.resetErrors();
  }, [form.values]);

  const onSubmit = () => {
    setLoading(true);

    const { email, password, username, firstname, lastname } = form.values;
    const user: SignUpUserModel = {
      email: email,
      password: password,
      username: username ? username : null,
      firstname: firstname ? firstname : null,
      lastname: lastname ? lastname : null
    };

    signUpUserApi(user)
      .then(({ data }) => {
        if (data && data.token) {
          localStorage.setItem('api-token', data.token);
          notifications.showNotification({
            message: t('success'),
            color: 'green'
          });
          goTo('');
        }
      })
      .catch((e) => {
        if (e.response?.status === 409 && e.response?.data?.error === 'this user already exists') {
          notifications.showNotification({
            message: t('errors.userAlreadyExists'),
            color: 'red'
          });
        }
        console.log(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Paper
      component="main"
      radius={0}
      className="paper_full-height"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
      <Grid gutter={0} sx={{ width: '100%', marginTop: '60px' }}>
        <Col
          span={12}
          sx={{
            textAlign: 'center',
            marginBottom: '16px'
          }}>
          <Title order={4}>{t('registration')}</Title>
        </Col>
        <Col span={10} offset={1} sm={6} offsetSm={3} lg={4} offsetLg={4}>
          <form onSubmit={form.onSubmit(() => onSubmit())}>
            <TextInput
              color="dark"
              icon={<EnvelopeClosedIcon />}
              type="email"
              label={t('email')}
              error={form.errors.email && t('validation.email')}
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              disabled={loading}
              variant={form.errors.email ? 'filled' : 'default'}
            />

            <TextInput
              mt="md"
              label={t('username')}
              value={form.values.username}
              onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
              disabled={loading}
              variant="default"
            />
            <Text color="gray" size="xs">
              {t('validation.optional')}
            </Text>

            <TextInput
              mt="md"
              label={t('firstname')}
              value={form.values.firstname}
              onChange={(event) => form.setFieldValue('firstname', event.currentTarget.value)}
              disabled={loading}
              variant="default"
            />
            <Text color="gray" size="xs">
              {t('validation.optional')}
            </Text>

            <TextInput
              mt="md"
              label={t('lastname')}
              value={form.values.lastname}
              onChange={(event) => form.setFieldValue('lastname', event.currentTarget.value)}
              disabled={loading}
              variant="default"
            />
            <Text color="gray" size="xs">
              {t('validation.optional')}
            </Text>

            <PasswordInput
              mt="md"
              label={t('password')}
              error={form.errors.password && t('validation.password')}
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              disabled={loading}
              variant={form.errors.password ? 'filled' : 'default'}
            />
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Button type="submit" mt="xs" loading={loading}>
                {t('signUp')}
              </Button>
            </div>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Button variant="light" my="xs" onClick={() => goTo('signin')}>
                {t('signIn')}
              </Button>
            </div>
          </form>
        </Col>
      </Grid>
    </Paper>
  );
};
export default SignUp;
