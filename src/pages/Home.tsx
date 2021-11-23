import {
  Paper,
  Group,
  Card,
  Container,
  Title,
  Text,
  Avatar,
  TextInput,
  ActionIcon
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { ChevronRightIcon, BookmarkIcon, PlusIcon } from '@modulz/radix-icons';
import { LinkModel } from 'models/link';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { postLinkApi, getLinksApi } from 'services/link';

const Home = (): JSX.Element => {
  const notifications = useNotifications();
  const { t } = useTranslation();
  const navigate = useNavigate();
  function goTo(page: string) {
    navigate(`/${page}`);
  }

  const [links, setLinks] = useState<LinkModel[]>([]);
  const [showArrow, setShowArrow] = useState(0);

  useEffect(() => {
    loadLinks();
  }, []);

  const [loading, setLoading] = useState(false);
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
          console.log(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const loadLinks = () => {
    getLinksApi().then(({ data }) => {
      if (Array.isArray(data) && data.length) {
        setLinks(data);
      }
    });
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
                onClick={() => goTo(`link/${link.id}`)}>
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
