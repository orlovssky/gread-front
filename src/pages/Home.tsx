import { Paper, Group, Card, Container } from '@mantine/core';
import { LinkModel } from 'models/link';
import { useEffect } from 'react';
import { useState } from 'react';
import { getLinksApi } from 'services/link';

const Home = (): JSX.Element => {
  const [links, setLinks] = useState<LinkModel[]>([]);

  useEffect(() => {
    getLinksApi().then(({ data }) => {
      if (Array.isArray(data) && data.length) {
        setLinks(data);
      }
    });
  }, []);

  return (
    <Paper
      radius={0}
      sx={{
        minHeight: '100vh',
        paddingTop: '60px'
      }}>
      <Group direction="column" grow>
        {links.map((link, index) => {
          return (
            <Container key={`home-links-link-${index}`}>
              <Card>{link.title}</Card>
            </Container>
          );
        })}
      </Group>
    </Paper>
  );
};
export default Home;
