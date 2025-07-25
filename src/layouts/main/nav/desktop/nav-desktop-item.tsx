import type { CSSObject } from '@mui/material/styles';

import { forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

import { Iconify } from 'src/components/iconify';
import { createNavItem, navItemStyles, navSectionClasses } from 'src/components/nav-section';

import type { NavItemProps } from '../types';

// ----------------------------------------------------------------------

export const NavItem = forwardRef<HTMLButtonElement, NavItemProps>((props, ref) => {
  const {
    title,
    path,
    /********/
    open,
    active,
    /********/
    subItem,
    hasChild,
    className,
    externalLink,
    ...other
  } = props;

  const navItem = createNavItem({ path, hasChild, externalLink });

  const ownerState: StyledState = { open, active, variant: !subItem ? 'rootItem' : 'subItem' };

  const router = useRouter();

  return (
    <ItemRoot
      disableRipple
      ref={ref}
      aria-label={title}
      {...ownerState}
      {...navItem.baseProps}
      className={mergeClasses([navSectionClasses.item.root, className], {
        [navSectionClasses.state.open]: open,
        [navSectionClasses.state.active]: active,
      })}
      {...other}
      onClick={() => {
        router.push(path);
      }}
    >
      <ItemTitle {...ownerState}> {title}</ItemTitle>

      {hasChild && <ItemArrow {...ownerState} icon="eva:arrow-ios-downward-fill" />}
    </ItemRoot>
  );
});

// ----------------------------------------------------------------------

type StyledState = Pick<NavItemProps, 'open' | 'active'> & {
  variant: 'rootItem' | 'subItem';
};

const shouldForwardProp = (prop: string) => !['open', 'active', 'variant', 'sx'].includes(prop);

/**
 * @slot root
 */
const ItemRoot = styled(ButtonBase, { shouldForwardProp })<StyledState>(({
  active,
  open,
  theme,
}) => {
  const dotTransitions: Record<'in' | 'out', CSSObject> = {
    in: { opacity: 0, scale: 0 },
    out: { opacity: 1, scale: 1 },
  };

  const dotStyles: CSSObject = {
    ...dotTransitions.in,
    width: 6,
    height: 6,
    left: -12,
    content: '""',
    borderRadius: '50%',
    position: 'absolute',
    backgroundColor: varAlpha(theme.vars.palette.text.disabledChannel, 0.64),
    transition: theme.transitions.create(['opacity', 'scale'], {
      duration: theme.transitions.duration.shorter,
    }),
    ...(active && { ...dotTransitions.out, backgroundColor: theme.vars.palette.primary.main }),
  };

  const rootItemStyles: CSSObject = {
    ...(open && { '&::before': { ...dotTransitions.out } }),
    ...(active && { color: theme.vars.palette.primary.main }),
  };

  const subItemStyles: CSSObject = {
    color: theme.vars.palette.text.secondary,
    '&:hover': { color: theme.vars.palette.text.primary },
    ...(active && { color: theme.vars.palette.text.primary }),
  };

  return {
    transition: theme.transitions.create(['color'], {
      duration: theme.transitions.duration.shorter,
    }),
    '&::before': dotStyles,
    '&:hover::before': { ...dotTransitions.out },
    variants: [
      { props: { variant: 'rootItem' }, style: rootItemStyles },
      { props: { variant: 'subItem' }, style: subItemStyles },
    ],
  };
});

/**
 * @slot title
 */
const ItemTitle = styled('span', { shouldForwardProp })<StyledState>(({ theme }) => ({
  ...navItemStyles.title(theme),
  ...theme.typography.body2,
  fontWeight: theme.typography.fontWeightMedium,
  variants: [
    { props: { variant: 'subItem' }, style: { fontSize: theme.typography.pxToRem(13) } },
    { props: { active: true }, style: { fontWeight: theme.typography.fontWeightSemiBold } },
  ],
}));

/**
 * @slot arrow
 */
const ItemArrow = styled(Iconify, { shouldForwardProp })<StyledState>(({ theme }) => ({
  ...navItemStyles.arrow(theme),
}));
