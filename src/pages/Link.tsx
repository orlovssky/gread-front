import {
  Paper,
  Grid,
  Col,
  Title,
  Divider,
  Avatar,
  Text,
  Container,
  TypographyStylesProvider,
  Loader
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import ConfirmDeleteModal from 'components/link/ConfirmDeleteModal';
import extractDomain from 'extract-domain';
import { LinkModel } from 'models/link';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getLinkApi } from 'services/link';
import { useAppSelector } from 'store/hooks';

const Link = (): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const notifications = useNotifications();
  const [loading, setLoading] = useState(false);
  const { link: storeLink } = useAppSelector((state) => state.linkLinks);
  const { id } = useParams();
  const [link, setLink] = useState<LinkModel>({
    id: 0,
    title: '',
    author: '',
    image: '',
    content: '',
    url: ''
  });

  useEffect(() => {
    const intId = id ? parseInt(id, 10) : null;
    if (storeLink && id && storeLink.id === intId) {
      setLink(storeLink);
    } else if (intId) {
      setLoading(true);
      getLinkApi(intId)
        .then(({ data }) => {
          setLink(data);
          setLoading(false);
        })
        .catch((e) => {
          if (e.response?.status === 409 && e.response?.data?.error === 'link does not exist') {
            notifications.showNotification({
              message: t('errors.linkNotFound'),
              color: 'red'
            });
            setLoading(false);
            navigate('/');
          }
        });
    } else {
      notifications.showNotification({
        message: t('errors.linkNotFound'),
        color: 'red'
      });
      navigate('/');
    }
  }, []);

  const [url, setUrl] = useState('');
  useEffect(() => {
    const domain = extractDomain(link.url);
    setUrl(domain);
  }, [link.url]);

  return (
    <Paper component="main" radius={0} className="paper_full-height">
      <Grid gutter={0} sx={{ width: '100%', paddingTop: '60px' }}>
        {loading && (
          <Col
            span={12}
            sx={{
              textAlign: 'center'
            }}>
            <Loader color="gray" variant="dots" />
          </Col>
        )}
        {!loading && (
          <Col
            span={10}
            offset={1}
            sx={{
              textAlign: 'center',
              marginTop: '32px',
              marginBottom: '32px'
            }}>
            <Title>{link.title}</Title>
            <Divider my="sm" />
            <Container className="link__subtitle">
              <Avatar src={link.image} radius="xl" />
              <Divider orientation="vertical" mx="sm" />
              <Text>{link.author}</Text>
              <Divider orientation="vertical" mx="sm" />
              <Text variant="link" component="a" href={link.url} target="_blank" rel="noopener">
                {url}
              </Text>
              <Divider orientation="vertical" mx="sm" />
              <ConfirmDeleteModal />
            </Container>
          </Col>
        )}
        <Col span={12}>
          <TypographyStylesProvider className="link__content">
            <Container
              dangerouslySetInnerHTML={{
                __html: `<base target="_blank" rel="noopener"> ${link.content}`
              }}
            />
          </TypographyStylesProvider>
        </Col>
      </Grid>
    </Paper>
  );
};

export default Link;
