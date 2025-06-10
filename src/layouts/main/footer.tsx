import type { Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { _socials } from 'src/_mock';
import { Language, useLanguage } from 'src/contexts/language-context';
import { TwitterIcon, FacebookIcon, LinkedinIcon, InstagramIcon } from 'src/assets/icons';

import { Logo } from 'src/components/logo';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const FooterRoot = styled('footer')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.vars.palette.background.default,
}));

export type FooterProps = React.ComponentProps<typeof FooterRoot>;

export function Footer({
  sx,
  layoutQuery = 'md',
  ...other
}: FooterProps & { layoutQuery?: Breakpoint }) {
  const { renderLanguage, language } = useLanguage();

  const LINKS = [
    // {
    //   headline: 'About Sabado',
    //   headline_ka: 'ლიდაკადემიის შესახებ',
    //   children: [
    //     { name: 'Mission', name_ka: 'მისია', href: '#' },
    //     { name: 'Mission and Vision', name_ka: 'მისია და ხედვა', href: '#' },
    //     { name: 'Values', name_ka: 'ღირებულებები', href: '#' },
    //     { name: 'Team', name_ka: 'გუნდი', href: '#' },
    //   ],
    // },
    {
      headline: 'Locations',
      headline_ka: 'ლოკაციები',
      children: [
        {
          name: 'Manglisi',
          name_ka: 'მანგლისი',
          href: language === Language.KA ? '/manglisi' : '/en/manglisi',
        },
        {
          name: 'Tsinandali',
          name_ka: 'წინანდალი',
          href: language === Language.KA ? '/tsinandali' : '/en/tsinandali',
        },
      ],
    },
    {
      headline: 'Terms and Conditions',
      headline_ka: 'წესები და პირობები',
      children: [
        {
          name: 'Terms and Conditions',
          name_ka: 'წესები და პირობები',
          href: language === Language.KA ? '/terms-and-conditions' : '/en/terms-and-conditions',
        },
      ],
    },
    {
      headline: 'Contact',
      headline_ka: 'საკონტაქტო ინფორმაცია',
      children: [
        {
          name: 'info@sabado.edu.ge',
          name_ka: 'contact@sabado.edu.ge',
          href: 'mailto:contact@sabado.edu.ge',
        },
        // { name: '243 34 35 36', name_ka: '243 34 35 36', href: 'tel:+995243343536' },
      ],
    },
  ];

  return (
    <FooterRoot sx={{ ...sx, backgroundColor: '#3D1746', color: 'white' }} {...other}>
      <Divider />

      <Container
        sx={(theme) => ({
          pb: 5,
          pt: 10,
          textAlign: 'center',
          [theme.breakpoints.up(layoutQuery)]: { textAlign: 'unset' },
        })}
      >
        <Logo />

        <Grid
          container
          sx={[
            (theme) => ({
              mt: 3,
              justifyContent: 'center',
              [theme.breakpoints.up(layoutQuery)]: { justifyContent: 'space-between' },
            }),
          ]}
        >
          <Grid size={{ xs: 12, [layoutQuery]: 3 }}>
            <Typography
              variant="body2"
              sx={(theme) => ({
                mx: 'auto',
                maxWidth: 280,
                [theme.breakpoints.up(layoutQuery)]: { mx: 'unset' },
              })}
            >
              {renderLanguage(
                'არაფორმალური განათლების პრინციპებსა და საშუალებებზე დაყრდნობით ლიდერების, მომავლის მოქალაქეების აღზრდა',
                `Educating leaders and citizens of the future based on the principles and means of non-formal education
`
              )}
            </Typography>

            <Box
              sx={(theme) => ({
                mt: 3,
                mb: 5,
                display: 'flex',
                justifyContent: 'center',
                [theme.breakpoints.up(layoutQuery)]: { mb: 0, justifyContent: 'flex-start' },
              })}
            >
              {_socials.map((social) => (
                <IconButton
                  key={social.label}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.open(social.path, '_blank');
                    }
                  }}
                >
                  {social.value === 'twitter' && <TwitterIcon sx={{ color: 'white' }} />}
                  {social.value === 'facebook' && <FacebookIcon sx={{ color: 'white' }} />}
                  {social.value === 'instagram' && <InstagramIcon sx={{ color: 'white' }} />}
                  {social.value === 'linkedin' && <LinkedinIcon sx={{ color: 'white' }} />}
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, [layoutQuery]: 6 }}>
            <Box
              sx={(theme) => ({
                gap: 5,
                display: 'flex',
                flexDirection: 'column',
                [theme.breakpoints.up(layoutQuery)]: { flexDirection: 'row' },
              })}
            >
              {LINKS.map((list) => (
                <Box
                  key={list.headline}
                  sx={(theme) => ({
                    gap: 2,
                    width: 1,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    [theme.breakpoints.up(layoutQuery)]: { alignItems: 'flex-start' },
                  })}
                >
                  <Typography component="div" variant="overline">
                    {renderLanguage(list.headline_ka, list.headline)}
                  </Typography>

                  {list.children.map((link) => (
                    <Link
                      key={link.name}
                      component={RouterLink}
                      href={link.href}
                      color="inherit"
                      variant="body2"
                    >
                      {renderLanguage(link.name_ka, link.name)}
                    </Link>
                  ))}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ mt: 10 }}>
          {renderLanguage('© ყველა უფლება დაცულია', '© All rights reserved.')}
        </Typography>
      </Container>
    </FooterRoot>
  );
}

// ----------------------------------------------------------------------

export function HomeFooter({ sx, ...other }: FooterProps) {
  return (
    <FooterRoot
      sx={[
        {
          py: 5,
          textAlign: 'center',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container>
        <Logo />
        <Box sx={{ mt: 1, typography: 'caption' }}>
          © All rights reserved.
          <br /> made by
          <Link href="https://minimals.cc/"> minimals.cc </Link>
        </Box>
      </Container>
    </FooterRoot>
  );
}
