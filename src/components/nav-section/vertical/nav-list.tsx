import { useBoolean } from 'minimal-shared/hooks';
import { useRef, useEffect, useCallback } from 'react';
import { isActiveLink, isExternalLink } from 'minimal-shared/utils';

import { usePathname, useSearchParams } from 'src/routes/hooks';

import { Language, useLanguage } from 'src/contexts/language-context';

import { NavItem } from './nav-item';
import { navSectionClasses } from '../styles';
import { NavUl, NavLi, NavCollapse } from '../components';

import type { NavListProps, NavSubListProps } from '../types';

// ----------------------------------------------------------------------

export function NavList({
  data,
  depth,
  render,
  slotProps,
  currentRole,
  enabledRootRedirect,
}: NavListProps) {
  const pathname = usePathname();
  const navItemRef = useRef<HTMLButtonElement | null>(null);

  const isActive = isActiveLink(pathname, data.path, !!data.children);

  const { value: open, onFalse: onClose, onToggle } = useBoolean(isActive);

  useEffect(() => {
    if (!isActive) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleToggleMenu = useCallback(() => {
    if (data.children) {
      onToggle();
    }
  }, [data.children, onToggle]);

  const { language } = useLanguage();

  const searchParams = useSearchParams();

  const key = searchParams.get('key');

  const renderIsActive = (path: string) => {
    const structuredPathName = `${pathname}?key=${key}`;

    const currPath = language === Language.ENG ? `/en${path}` : `${path}`;

    if (structuredPathName === currPath) {
      return true;
    }
    return false;
  };

  const { renderLanguage } = useLanguage();
  const renderNavItem = () => (
    <NavItem
      ref={navItemRef}
      // slots
      path={language === Language.ENG ? `/en${data.path}` : `${data.path}`}
      icon={data.icon}
      info={data.info}
      title={renderLanguage(data.title, data.title_en || '')}
      caption={data.caption}
      // state
      open={open}
      active={renderIsActive(data.path)}
      disabled={data.disabled}
      sx={{ color: renderIsActive(data.path) ? 'success.main' : 'white' }}
      // options
      depth={depth}
      render={render}
      hasChild={!!data.children}
      externalLink={isExternalLink(data.path)}
      enabledRootRedirect={enabledRootRedirect}
      // styles
      slotProps={depth === 1 ? slotProps?.rootItem : slotProps?.subItem}
      // actions
      onClick={handleToggleMenu}
    />
  );

  const renderCollapse = () =>
    !!data.children && (
      <NavCollapse mountOnEnter unmountOnExit depth={depth} in={open} data-group={data.title}>
        <NavSubList
          data={data.children}
          render={render}
          depth={depth}
          slotProps={slotProps}
          currentRole={currentRole}
          enabledRootRedirect={enabledRootRedirect}
        />
      </NavCollapse>
    );

  // Hidden item by role
  if (data.roles && currentRole && !data.roles.includes(currentRole)) {
    return null;
  }

  return (
    <NavLi
      disabled={data.disabled}
      sx={{
        ...(!!data.children && {
          [`& .${navSectionClasses.li}`]: { '&:first-of-type': { mt: 'var(--nav-item-gap)' } },
        }),
      }}
    >
      {renderNavItem()}
      {renderCollapse()}
    </NavLi>
  );
}

// ----------------------------------------------------------------------

function NavSubList({
  data,
  render,
  depth = 0,
  slotProps,
  currentRole,
  enabledRootRedirect,
}: NavSubListProps) {
  return (
    <NavUl sx={{ gap: 'var(--nav-item-gap)' }}>
      {data.map((list) => (
        <NavList
          key={list.title}
          data={list}
          render={render}
          depth={depth + 1}
          slotProps={slotProps}
          currentRole={currentRole}
          enabledRootRedirect={enabledRootRedirect}
        />
      ))}
    </NavUl>
  );
}
