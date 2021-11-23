import { Paper, Grid, Col, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { EnvelopeClosedIcon } from '@modulz/radix-icons';
import ChangePasswordModal from 'components/profile/ChangePasswordModal';
import ConfirmSignOutModal from 'components/profile/ConfirmSignOutModal';
import { UserModel, UpdateUserModel } from 'models/user';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getUser, updateUser } from 'services/user';
import { useAppDispatch } from 'store/hooks';
import { setDialogOpened } from 'store/modules/profile/changePasswordModal';

const Profile = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const notifications = useNotifications();

  const [loading, setLoading] = useState(false);
  const [disableSave, setDisableSave] = useState(true);

  const [user, setUser] = useState<UserModel>({
    id: 0,
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: ''
  });

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      firstname: '',
      lastname: ''
    },

    validationRules: {
      email: (value) =>
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/.test(
          value
        )
    }
  });

  useEffect(() => {
    getUser().then(({ data }) => {
      if (data) {
        setUser(data);
        form.setValues(data);
      }
    });
  }, []);

  useEffect(() => {
    form.resetErrors();
    const { email, username, firstname, lastname } = form.values;
    if (
      email !== user.email ||
      username !== user.username ||
      firstname !== user.firstname ||
      lastname !== user.lastname
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [form.values]);

  const onSubmit = () => {
    setLoading(true);

    const { email, username, firstname, lastname } = form.values;
    const userForUpdate: UpdateUserModel = {
      firstname: firstname ? firstname : null,
      lastname: lastname ? lastname : null
    };
    if (email !== user.email) {
      userForUpdate.email = email;
    }
    if (username !== user.username) {
      userForUpdate.username = username ? username : null;
    }

    updateUser(userForUpdate, user.id)
      .then(({ data }) => {
        if (data === 'success') {
          notifications.showNotification({
            message: t('success'),
            color: 'green'
          });
        }
      })
      .catch((e) => {
        console.log(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <ChangePasswordModal userId={user.id} />
      <Paper component="main" radius={0} className="paper_full-height">
        <Grid gutter={0} sx={{ width: '100%', paddingTop: '60px' }}>
          <Col span={10} offset={1} sm={6} offsetSm={3} lg={4} offsetLg={4}>
            <form onSubmit={form.onSubmit(() => onSubmit())}>
              <TextInput
                icon={<EnvelopeClosedIcon />}
                type="email"
                label={t('email')}
                error={form.errors.email && t('validation.email')}
                value={form.values.email}
                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                disabled={loading}
              />

              <TextInput
                mt="md"
                label={t('username')}
                value={form.values.username}
                onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                disabled={loading}
              />

              <TextInput
                mt="md"
                label={t('firstname')}
                value={form.values.firstname}
                onChange={(event) => form.setFieldValue('firstname', event.currentTarget.value)}
                disabled={loading}
              />

              <TextInput
                mt="md"
                label={t('lastname')}
                value={form.values.lastname}
                onChange={(event) => form.setFieldValue('lastname', event.currentTarget.value)}
                disabled={loading}
              />
              <Button
                mt="md"
                fullWidth
                variant="light"
                onClick={() => dispatch(setDialogOpened(true))}>
                {t('changePassword')}
              </Button>

              <ConfirmSignOutModal />

              <div style={{ width: '100%', textAlign: 'center' }}>
                <Button type="submit" my="xs" loading={loading} disabled={disableSave}>
                  {t('save')}
                </Button>
              </div>
            </form>
          </Col>
        </Grid>
      </Paper>
    </>
  );
};
export default Profile;
