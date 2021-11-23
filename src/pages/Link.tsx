import {
  Paper,
  Grid,
  Col,
  Title,
  Divider,
  Avatar,
  Text,
  Container,
  TypographyStylesProvider
} from '@mantine/core';
import extractDomain from 'extract-domain';
import { LinkModel } from 'models/link';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getLinkApi } from 'services/link';

const Link = (): JSX.Element => {
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
    if (id) {
      getLinkApi(parseInt(id, 10)).then(({ data }) => {
        setLink(data);
      });
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
          </Container>
        </Col>
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
