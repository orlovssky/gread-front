import { Button, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ConfirmSignOutModal = (): JSX.Element => {
  const modals = useModals();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const signOut = () => {
    localStorage.removeItem('api-token');
    navigate('/welcome');
  };

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: t('pleaseConfirm'),
      children: <Text size="sm">{t('signOutConfirmation')}</Text>,
      labels: { confirm: t('signOut'), cancel: t('cancel') },
      confirmProps: { color: 'red' },
      onConfirm: signOut
    });

  return (
    <Button my="xs" color="red" variant="light" fullWidth onClick={openDeleteModal}>
      {t('signOut')}
    </Button>
  );
};
export default ConfirmSignOutModal;
