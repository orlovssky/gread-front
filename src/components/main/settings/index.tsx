import { Drawer, SegmentedControl, Text, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { setSettingsOpened, setLocale } from 'store/modules/main/settings';
import { setMainTheme } from 'store/modules/main/theme';
import * as themes from 'themes';

const Settings = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const { theme } = useAppSelector((state) => state.mainTheme);
  const { opened, locale } = useAppSelector((state) => state.mainSettings);

  const [currentTheme, setCurrentTheme] = useState('sepia');

  useEffect(() => {
    const metaTag = document.querySelector('meta[name="theme-color"]');
    switch (theme) {
      case themes.dark:
        if (metaTag) {
          metaTag.setAttribute('content', '#1a1b1e');
        }
        setCurrentTheme('dark');
        break;
      case themes.light:
        if (metaTag) {
          metaTag.setAttribute('content', '#ffffff');
        }
        setCurrentTheme('light');
        break;
      case themes.sepia:
        if (metaTag) {
          metaTag.setAttribute('content', '#f6f1ea');
        }
        setCurrentTheme('sepia');
        break;
    }
  }, [theme]);

  const setTheme = (value: string) => {
    localStorage.setItem('theme', value);

    switch (value) {
      case 'dark':
        dispatch(setMainTheme(themes.dark));
        break;
      case 'light':
        dispatch(setMainTheme(themes.light));
        break;
      case 'sepia':
        dispatch(setMainTheme(themes.sepia));
        break;
    }
  };

  useEffect(() => {
    localStorage.setItem('locale', locale);

    setTimeout(() => {
      i18n.changeLanguage(locale);
    }, 1);
  }, [locale]);

  return (
    <Drawer
      opened={opened}
      onClose={() => dispatch(setSettingsOpened(false))}
      title={t('settings')}
      padding="md"
      position="right">
      <Group direction="column" grow>
        <div>
          <Text
            sx={{
              marginBottom: '4px'
            }}>
            {t('theme')}
          </Text>
          <SegmentedControl
            value={currentTheme}
            onChange={setTheme}
            fullWidth
            data={[
              { label: t('dark'), value: 'dark' },
              { label: t('light'), value: 'light' },
              { label: t('sepia'), value: 'sepia' }
            ]}
          />
        </div>
        <div>
          <Text
            sx={{
              marginBottom: '4px'
            }}>
            {t('language')}
          </Text>
          <SegmentedControl
            value={locale}
            onChange={(value) => dispatch(setLocale(value))}
            fullWidth
            data={[
              { label: 'Русский', value: 'ru' },
              { label: 'English', value: 'en' }
            ]}
          />
        </div>
      </Group>
    </Drawer>
  );
};
export default Settings;
