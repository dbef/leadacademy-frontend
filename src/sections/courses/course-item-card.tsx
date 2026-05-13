import type { CardProps } from '@mui/material/Card';
import type { components } from 'interfaces/interface';

import { useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import {
  List,
  Chip,
  Stack,
  Avatar,
  Popover,
  Tooltip,
  Divider,
  ListItem,
  Typography,
  AvatarGroup,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { Language, useLanguage } from 'src/contexts/language-context';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { FlagIcon } from 'src/components/flag-icon';
import { useCarousel } from 'src/components/carousel';

import { renderDate } from './helpers';

type CarouselItemProps = CardProps & {
  item: components['schemas']['CourseDto'];
};

export function CourseItemMain({ item, sx, ...other }: CarouselItemProps) {
  const { renderLanguage, language } = useLanguage();
  const [lecturersAnchor, setLecturersAnchor] = useState<HTMLElement | null>(null);

  useCarousel({ slidesToShow: 'auto', slideSpacing: '20px', loop: true }, [
    Autoplay({ delay: 2000 }),
  ]);

  const detailsHref =
    language === Language.KA ? `/courses/${item.url_id}` : `/en/courses/${item.url_id}`;

  const registrationHref =
    item?.registration_url ||
    (language === Language.KA
      ? `/courses/register/${item.course_id}`
      : `/en/courses/register/${item.course_id}`);

  const isUpcoming = new Date(item.start_date) > new Date();
  const canRegister = !item.partners_only && isUpcoming;

  const renderLanguageChip = () => {
    if (item.language === 'geo_eng') {
      return (
        <Chip
          size="small"
          label={renderLanguage('ქართული / ინგლისური', 'Georgian / English')}
          icon={
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', pl: 0.5 }}>
              <FlagIcon code="GE" />
              <FlagIcon code="GB" />
            </Box>
          }
          sx={{
            backgroundColor: '#E8F5E9',
            color: '#285C45',
            fontWeight: 500,
            '& .MuiChip-icon': { ml: 0.5 },
          }}
        />
      );
    }

    return (
      <Chip
        size="small"
        label={
          item.language === 'ka'
            ? renderLanguage('ქართული', 'Georgian')
            : renderLanguage('ინგლისური', 'English')
        }
        icon={item.language === 'ka' ? <FlagIcon code="GE" /> : <FlagIcon code="GB" />}
        sx={{
          backgroundColor: '#E8F5E9',
          color: '#285C45',
          fontWeight: 500,
        }}
      />
    );
  };

  return (
    <Card
      sx={[
        {
          width: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E8E0EE',
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(40, 92, 69, 0.12)',
            borderColor: '#7F9A16',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {/* Hero image */}
      <Box
        component={RouterLink}
        href={detailsHref}
        target="_blank"
        sx={{ position: 'relative', display: 'block', cursor: 'pointer' }}
      >
        <Image
          alt={item.media_course_assn[0]?.media?.media_name}
          src={item.media_course_assn[0]?.media?.media_url}
          ratio="16/9"
        />

        {!item.partners_only && !isUpcoming && (
          <Chip
            size="small"
            label={renderLanguage('დასრულებული', 'Completed')}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: 'rgba(120, 120, 120, 0.95)',
              color: 'white',
              fontWeight: 600,
              backdropFilter: 'blur(4px)',
            }}
          />
        )}

        {/* Language chip top-left over image */}
        <Box sx={{ position: 'absolute', top: 12, left: 12 }}>{renderLanguageChip()}</Box>
      </Box>

      {/* Body */}
      <Stack spacing={2} sx={{ p: 2.5, flexGrow: 1 }}>
        <Tooltip title={renderLanguage(item.title_ka, item.title_en)}>
          <Typography
            variant="h6"
            component={RouterLink}
            href={detailsHref}
            target="_blank"
            sx={{
              color: '#285C45',
              cursor: 'pointer',
              textDecoration: 'none',
              fontFeatureSettings: "'case' on",
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              minHeight: '3.2em',
              lineHeight: 1.4,
              '&:hover': { color: '#7F9A16' },
            }}
          >
            {renderLanguage(item.title_ka, item.title_en)}
          </Typography>
        </Tooltip>

        {/* Lecturers */}
        {item.lecturer_course_assn.length > 0 && (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            onClick={(e) => {
              if (item.lecturer_course_assn.length > 2) {
                e.preventDefault();
                e.stopPropagation();
                setLecturersAnchor(e.currentTarget);
              }
            }}
            sx={{
              cursor: item.lecturer_course_assn.length > 2 ? 'pointer' : 'default',
              borderRadius: 1,
              p: 0.5,
              transition: 'background-color 0.2s',
              '&:hover':
                item.lecturer_course_assn.length > 2
                  ? { backgroundColor: '#F5F8E8' }
                  : undefined,
            }}
          >
            <AvatarGroup
              max={3}
              sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: 13 } }}
            >
              {item.lecturer_course_assn.map((l) => (
                <Avatar
                  key={l.lecturer.id}
                  src={l.lecturer.picture}
                  alt={l.lecturer.first_name_ka}
                />
              ))}
            </AvatarGroup>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {item.lecturer_course_assn
                .slice(0, 2)
                .map((l) =>
                  `${renderLanguage(l.lecturer.first_name_ka || '', l.lecturer.first_name_en || '')} ${renderLanguage(l.lecturer.last_name_ka, l.lecturer.last_name_en)}`
                )
                .join(', ')}
              {item.lecturer_course_assn.length > 2 && (
                <Box
                  component="span"
                  sx={{
                    color: '#7F9A16',
                    fontWeight: 600,
                    ml: 0.5,
                    textDecoration: 'underline',
                  }}
                >
                  +{item.lecturer_course_assn.length - 2}
                </Box>
              )}
            </Typography>
          </Stack>
        )}

        <Popover
          open={Boolean(lecturersAnchor)}
          anchorEl={lecturersAnchor}
          onClose={() => setLecturersAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          slotProps={{
            paper: {
              sx: {
                mt: 0.5,
                width: 280,
                borderRadius: 2,
                boxShadow: '0 8px 24px rgba(40, 92, 69, 0.15)',
              },
            },
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              px: 2,
              py: 1.25,
              color: '#285C45',
              fontFeatureSettings: "'case' on",
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            {renderLanguage('ლექტორები', 'Lecturers')}
          </Typography>
          <List sx={{ py: 0, maxHeight: 320, overflow: 'auto' }}>
            {item.lecturer_course_assn.map((l, i) => (
              <ListItem
                key={l.lecturer.id}
                divider={i < item.lecturer_course_assn.length - 1}
                sx={{ py: 1 }}
              >
                <ListItemAvatar sx={{ minWidth: 48 }}>
                  <Avatar
                    src={l.lecturer.picture}
                    alt={l.lecturer.first_name_ka}
                    sx={{ width: 36, height: 36 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${renderLanguage(
                    l.lecturer.first_name_ka || '',
                    l.lecturer.first_name_en || ''
                  )} ${renderLanguage(l.lecturer.last_name_ka, l.lecturer.last_name_en)}`}
                  primaryTypographyProps={{
                    sx: { color: '#285C45', fontWeight: 500, fontSize: 14 },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Popover>

        <Divider sx={{ borderColor: '#F0EBF5' }} />

        {/* Meta info */}
        <Stack spacing={1.25} sx={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Iconify
              icon="mingcute:location-fill"
              width={18}
              sx={{ color: '#E53935', flexShrink: 0 }}
            />
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              {renderLanguage(
                item?.campuse?.campus_name_ka || '',
                item?.campuse?.campus_name_en || ''
              )}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1.25} alignItems="center">
            <Iconify
              icon="mingcute:calendar-fill"
              width={18}
              sx={{ color: '#1976D2', flexShrink: 0 }}
            />
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              {`${renderDate(new Date(item.start_date), language)} – ${renderDate(new Date(item.end_date), language)}`}
            </Typography>
          </Stack>
        </Stack>

        {/* Footer / actions */}
        <Stack
          spacing={1}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ mt: 'auto', pt: 0.5 }}
        >
          <Button
            LinkComponent={RouterLink}
            href={detailsHref}
            target="_blank"
            fullWidth
            variant="outlined"
            sx={{
              color: '#7F9A16',
              borderColor: '#7F9A16',
              '&:hover': { borderColor: '#6B8312', backgroundColor: '#F5F8E8' },
            }}
          >
            {renderLanguage('ინფორმაცია', 'Information')}
          </Button>
          {canRegister && (
            <Button
              LinkComponent={RouterLink}
              href={registrationHref}
              target="_blank"
              fullWidth
              variant="contained"
              endIcon={<Iconify icon="eva:arrow-forward-fill" width={16} />}
              sx={{
                backgroundColor: '#7F9A16',
                '&:hover': { backgroundColor: '#6B8312' },
              }}
            >
              {renderLanguage('რეგისტრაცია', 'Register')}
            </Button>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
