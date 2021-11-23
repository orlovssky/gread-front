import { Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import Typewriter from 'typewriter-effect';

const WelcomeTitle = (): JSX.Element => {
  const { t } = useTranslation();
  const strings = [
    t('welcome.interestingArticles'),
    t('welcome.cookingRecipes'),
    t('welcome.songLyrics')
  ];
  return (
    <Group direction="column" className="welcome__group" grow>
      <Text
        className="welcome__title"
        component="h1"
        variant="gradient"
        gradient={{ from: 'primary', to: 'primary', deg: 45 }}
        sx={{
          margin: 0
        }}>
        Gread
      </Text>
      <div className="welcome__subtitle">
        <Text>{t('welcome.saveAllOfThe')}&nbsp;</Text>
        <Text variant="gradient" gradient={{ from: 'primary', to: 'primary', deg: 45 }}>
          <Typewriter options={{ strings, autoStart: true, loop: true }} />
        </Text>
      </div>
    </Group>
  );
};
export default WelcomeTitle;
