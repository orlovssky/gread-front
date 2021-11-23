import { Group, Title, Container, ActionIcon, Paper } from '@mantine/core';
import { GearIcon, PersonIcon } from '@modulz/radix-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';
import { setSettingsOpened } from 'store/modules/main/settings';

const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileIcon, setShowProfileIcon] = useState(false);

  function goTo(page: string) {
    navigate(`/${page}`);
  }

  useEffect(() => {
    if (location.pathname === '/') {
      setShowProfileIcon(true);
    } else {
      setShowProfileIcon(false);
    }
  }, [location.pathname]);
  return (
    <Paper component="header" className="header">
      <Container>
        <Group
          sx={{
            height: '60px',
            justifyContent: 'space-between'
          }}>
          <Title
            order={1}
            sx={{
              cursor: 'pointer'
            }}
            onClick={() => goTo('')}>
            Gread
          </Title>
          <Group>
            {showProfileIcon && (
              <ActionIcon color="primary" size="lg" radius="md" onClick={() => goTo('profile')}>
                <PersonIcon />
              </ActionIcon>
            )}

            <ActionIcon
              color="primary"
              size="lg"
              radius="md"
              onClick={() => dispatch(setSettingsOpened(true))}>
              <GearIcon />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Paper>
  );
};
export default Header;
