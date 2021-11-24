import {
  Paper,
  Group,
  Card,
  Container,
  Title,
  Text,
  Avatar,
  TextInput,
  ActionIcon,
  Loader
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { ChevronRightIcon, BookmarkIcon, PlusIcon } from '@modulz/radix-icons';
import { LinkModel } from 'models/link';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { postLinkApi, getLinksApi } from 'services/link';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { setLinks, setLink as storeSetLink } from 'store/modules/link/links';

const Home = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const notifications = useNotifications();
  const { t } = useTranslation();
  const navigate = useNavigate();
  function goTo(page: string) {
    navigate(`/${page}`);
  }

  const [loading, setLoading] = useState(false);
  const [showArrow, setShowArrow] = useState(0);

  const { links } = useAppSelector((state) => state.linkLinks);

  useEffect(() => {
    if (links.length === 0) {
      loadLinks();
    }
  }, []);

  const [link, setLink] = useState('');

  const onSubmit = () => {
    if (link !== '') {
      setLoading(true);
      postLinkApi(link)
        .then(({ data }) => {
          if (data) {
            setLink('');
            notifications.showNotification({
              message: t('success'),
              color: 'green'
            });

            loadLinks();
          }
        })
        .catch((e) => {
          if (
            e.response?.status === 409 &&
            e.response?.data?.error === 'cannot parse content from link'
          ) {
            notifications.showNotification({
              message: t('errors.cannotReadLinkContent'),
              color: 'red'
            });
          }
          console.log(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const loadLinks = () => {
    setLoading(true);
    getLinksApi()
      .then(({ data }) => {
        if (Array.isArray(data) && data.length) {
          dispatch(setLinks(data));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openLink = async (link: LinkModel) => {
    await dispatch(storeSetLink(link));
    goTo(`link/${link.id}`);
  };

  return (
    <Paper component="main" radius={0} className="paper_full-height">
      <Group
        direction="column"
        grow
        sx={{
          paddingTop: '60px'
        }}
        spacing={0}>
        <Container mb="lg" sx={{ display: 'flex', alignItems: 'center' }}>
          <TextInput
            icon={<BookmarkIcon />}
            placeholder={t('link')}
            value={link}
            onChange={(event) => setLink(event.currentTarget.value)}
          />
          <ActionIcon
            variant="filled"
            color="primary"
            ml="md"
            loading={loading}
            disabled={loading}
            onClick={onSubmit}>
            <PlusIcon />
          </ActionIcon>
        </Container>
        {loading && (
          <Container
            sx={{
              textAlign: 'center'
            }}
            mb="md">
            <Loader color="gray" variant="dots" />
          </Container>
        )}
        {links.map((link, index) => {
          return (
            <Container
              key={`home-links-link-${index}`}
              sx={{
                width: '100%'
              }}>
              <Card
                withBorder
                className="home__link"
                onMouseEnter={() => setShowArrow(link.id)}
                onMouseLeave={() => setShowArrow(0)}
                onClick={() => openLink(link)}>
                <Avatar radius="xl" src={link.image} mr="md" />
                <div style={{ width: '100%' }}>
                  <Title order={6}> {link.title}</Title>
                  <Text> {link.author}</Text>
                </div>
                {showArrow === link.id && (
                  <>
                    <ChevronRightIcon className="home__arrow home__arrow_second" />
                    <ChevronRightIcon className="home__arrow home__arrow_first" />
                  </>
                )}
              </Card>
            </Container>
          );
        })}
      </Group>
    </Paper>
  );
};
export default Home;
