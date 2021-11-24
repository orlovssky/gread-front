import { ActionIcon, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useNotifications } from '@mantine/notifications';
import { TrashIcon } from '@modulz/radix-icons';
import { LinkModel } from 'models/link';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { deleteLinkApi } from 'services/link';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { setLinks } from 'store/modules/link/links';

const ConfirmDeleteModal = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const modals = useModals();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const notifications = useNotifications();
  const { t } = useTranslation();
  const { link, links } = useAppSelector((state) => state.linkLinks);

  const deleteLink = () => {
    if (link) {
      setLoading(true);
      deleteLinkApi(link.id)
        .then(({ data }) => {
          if (data === 'success') {
            notifications.showNotification({
              message: t('success'),
              color: 'green'
            });
            dispatch(setLinks(links.filter((i: LinkModel) => i.id !== link.id)));
            setLoading(false);
            navigate('/');
          }
        })
        .catch((e) => {
          console.log(e.message);
          setLoading(false);
        });
    }
  };

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: t('pleaseConfirm'),
      children: <Text size="sm">{t('removeLinkConfirmation')}</Text>,
      labels: { confirm: t('remove'), cancel: t('cancel') },
      confirmProps: { color: 'red' },
      onConfirm: deleteLink
    });

  return (
    <ActionIcon loading={loading} onClick={openDeleteModal}>
      <TrashIcon />
    </ActionIcon>
  );
};
export default ConfirmDeleteModal;
