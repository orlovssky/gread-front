import { Modal, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { updatePasswordApi } from 'services/user';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { setDialogOpened } from 'store/modules/profile/changePasswordModal';

interface Props {
  userId: number;
}

const ChangePasswordModal = (props: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const notifications = useNotifications();
  const { opened } = useAppSelector((state) => state.profilechangePasswordModal);

  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      password: ''
    },

    validationRules: {
      password: (value) => !!value && value.length >= 6
    }
  });

  useEffect(() => {
    form.resetErrors();
  }, [form.values]);

  const onSubmit = () => {
    setLoading(true);

    updatePasswordApi(form.values.password, props.userId)
      .then(({ data }) => {
        if (data === 'success') {
          notifications.showNotification({
            message: t('success'),
            color: 'green'
          });
          form.reset();
          setLoading(false);
          dispatch(setDialogOpened(false));
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  };

  return (
    <Modal
      opened={opened}
      onClose={() => dispatch(setDialogOpened(false))}
      title={t('changePassword')}>
      <form onSubmit={form.onSubmit(() => onSubmit())}>
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
            {t('change')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
