import { useBoolean } from 'minimal-shared/hooks';
import { useRef, useEffect, useCallback } from 'react';
import { isEqualPath, isExternalLink } from 'minimal-shared/utils';

import { useParams, usePathname, useRouter, useSearchParams } from 'src/routes/hooks';

import { Language, useLanguage } from 'src/contexts/language-context';

import { NavItem } from './nav-desktop-item';
import { Nav, NavLi, NavUl, NavDropdown } from '../components';
import { NavItemDashboard } from './nav-desktop-item-dashboard';

import type { NavListProps, NavSubListProps } from '../types';

// ----------------------------------------------------------------------

export function NavList({ data, sx, ...other }: NavListProps) {
  const pathname = usePathname();
  const navItemRef = useRef<HTMLButtonElement | null>(null);

  const { renderLanguage } = useLanguage();

  const { language } = useLanguage();

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const renderIsActive = () => {
    const currPath = language === Language.ENG ? `/en${data.path}/` : `${data.path}/`;

    if (currPath === '/en//' && pathname === '/en/') {
      return true;
    }
    if (currPath === '//' && pathname === '/') {
      return true;
    }
    if (pathname === currPath) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = useCallback(() => {
    if (data.children) {
      onOpen();
    }
  }, [data.children, onOpen]);

  const renderNavItem = () => (
    <NavItem
      ref={navItemRef}
      // slots
      path={language === Language.ENG ? `/en/${data.path}` : data.path}
      title={renderLanguage(data.title, data.title_en || '')}
      // state
      open={open}
      active={renderIsActive()}
      // options
      hasChild={!!data.children}
      externalLink={isExternalLink(data.path)}
      // action
      onMouseEnter={handleOpenMenu}
      onMouseLeave={onClose}
    />
  );

  const renderDropdown = () =>
    !!data.children && (
      <NavDropdown
        open={open}
        onMouseLeave={onClose}
        onMouseEnter={handleOpenMenu}
        sx={{
          position: 'absolute',
          top: '100%',
          left: '-25px',
          width: '200px',
          zIndex: 1000,
          mt: 1,
          '& div': {
            padding: '10px 16px 16px 20px',
          },
        }}
      >
        <Nav>
          <NavUl sx={{ gap: 3, flexDirection: 'row' }}>
            {data.children.map((list) => (
              <NavSubList key={list.subheader} subheader={list.subheader} data={list.items} />
            ))}
          </NavUl>
        </Nav>
      </NavDropdown>
    );

  return (
    <NavLi sx={{ position: 'relative', ...sx }} {...other}>
      {renderNavItem()}
      {renderDropdown()}
    </NavLi>
  );
}

// ----------------------------------------------------------------------

function NavSubList({ data, subheader, sx, ...other }: NavSubListProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const key = searchParams.get('key');

  const isDashboard = subheader === 'Dashboard';

  const { language, renderLanguage } = useLanguage();

  const renderIsActive = (path: string) => {

    const structuredPathName = `${pathname}?key=${key}`;

    const currPath = language === Language.ENG ? `/en${path}` : `${path}`;

    if (structuredPathName === currPath) {
      return true;
    }
    return false;
  };

  return (
    <NavLi
      sx={[
        () => ({
          flexGrow: 1,
          flexBasis: 'auto',
          flexShrink: isDashboard ? 1 : 0,
          ...(isDashboard && { maxWidth: 560 }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <NavUl>
        <NavLi
          sx={(theme) => ({
            mb: 0.75,
            typography: 'overline',
            fontSize: theme.typography.pxToRem(11),
          })}
        >
          {subheader}
        </NavLi>

        {data.map((item) =>
          isDashboard ? (
            <NavLi key={item.title} sx={{ mt: 0.75 }}>
              <NavItemDashboard path={item.path} />
            </NavLi>
          ) : (
            <NavLi key={item.title} sx={{ mt: 0.75 }}>
              <NavItem
                subItem
                title={renderLanguage(item.title, item.title_en || '')}
                path={language === Language.ENG ? `/en/${item.path}` : item.path}
                active={renderIsActive(item.path)}
              />
            </NavLi>
          )
        )}
      </NavUl>
    </NavLi>
  );
}
