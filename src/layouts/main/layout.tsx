'use client';

import type { Breakpoint } from '@mui/material/styles';

import { useEffect } from 'react';
import { useBoolean } from 'minimal-shared/hooks';
import { useRouter, usePathname } from 'next/navigation';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { SpeedDial, SpeedDialAction } from '@mui/material';

import { allLangs } from 'src/locales';
import { Language, useLanguage } from 'src/contexts/language-context';
import { TwitterIcon, FacebookIcon, LinkedinIcon, InstagramIcon } from 'src/assets/icons';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';

import { Footer } from './footer';
import { NavMobile } from './nav/mobile';
import { NavDesktop } from './nav/desktop';
import { MainSection } from '../core/main-section';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { navData as mainNavData } from '../nav-config-main';
import { SignInButton } from '../components/sign-in-button';
import { SettingsButton } from '../components/settings-button';
import { LanguagePopover } from '../components/language-popover';

import type { FooterProps } from './footer';
import type { NavMainProps } from './nav/types';
import type { MainSectionProps } from '../core/main-section';
import type { LayoutSectionProps } from '../core/layout-section';
import type { HeaderSectionProps } from '../core/header-section';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type MainLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    nav?: {
      data?: NavMainProps['data'];
    };
    main?: MainSectionProps;
    footer?: FooterProps;
  };
};

export function MainLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'md',
}: MainLayoutProps) {
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const path = usePathname();

  const router = useRouter();

  const { language } = useLanguage();

  const navData = slotProps?.nav?.data ?? mainNavData;

  useEffect(() => {
    console.log('Path:', path);
    if (
      !path.startsWith('/en/courses') &&
      !path.startsWith('/courses') &&
      !path.startsWith('/en/terms-and-conditions') &&
      !path.startsWith('/terms-and-conditions')
    ) {
      router.push(language === Language.KA ? '/courses/register' : '/en/courses/register');
    }
  }, [path]);

  const renderHeader = () => {
    const headerSlots: HeaderSectionProps['slots'] = {
      topArea: (
        <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
          This is an info Alert.
        </Alert>
      ),
      leftArea: (
        <>
          {/** @slot Nav mobile */}
          <MenuButton
            onClick={onOpen}
            sx={(theme) => ({
              mr: 1,
              ml: -1,
              [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
            })}
          />
          <NavMobile data={navData} open={open} onClose={onClose} />

          {/** @slot Logo */}
          {/* <Logo /> */}
        </>
      ),
      rightArea: (
        <>
          {/** @slot Nav desktop */}
          <NavDesktop
            data={navData}
            sx={(theme) => ({
              display: 'none',
              [theme.breakpoints.up(layoutQuery)]: { mr: 2.5, display: 'flex' },
            })}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
            {/** @slot Settings button */}

            <LanguagePopover data={allLangs} />
            {/** @slot Sign in button */}
            <SignInButton />
            <SettingsButton />
            {/** @slot Purchase button */}
          </Box>
        </>
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={slotProps?.header?.slotProps}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderFooter = () => <Footer sx={slotProps?.footer?.sx} layoutQuery={layoutQuery} />;

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  const actions = [
    { icon: <TwitterIcon />, name: 'Copy' },
    { icon: <LinkedinIcon />, name: 'Save' },
    { icon: <InstagramIcon />, name: 'Print' },
    { icon: <FacebookIcon />, name: 'Share' },
  ];

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={renderHeader()}
      /** **************************************
       * @Footer
       *************************************** */
      // footerSection={renderFooter()}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={cssVars}
      sx={sx}
    >
      {renderMain()}
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: 'fixed', // Fix to viewport
          bottom: 16, // Distance from bottom
          right: 16, // Distance from left
          zIndex: 1100, // Ensure it's on top of content
        }}
        icon={<Iconify icon="ic:baseline-contact-support" color="#fff" />}
      >
        {actions.map((action) => (
          <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
        ))}
      </SpeedDial>
    </LayoutSection>
  );
}
