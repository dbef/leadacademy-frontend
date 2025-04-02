import type { IDateValue } from "src/types/common";

import { varAlpha } from "minimal-shared/utils";

import { Box, Avatar, Rating, Typography, ListItemText, type BoxProps } from "@mui/material";

import { fDate } from "src/utils/format-time";

import { Iconify } from "src/components/iconify";

type TestimonialItemProps = BoxProps & {
  testimonial: {
    name: string;
    content: string;
    avatarUrl: string;
    ratingNumber: number;
    postedDate: IDateValue;
  };
};



export function TestimonialItem({ testimonial, sx, ...other }: TestimonialItemProps) {
  return (
    <Box
      sx={[
        (theme) => ({
          ...theme.mixins.bgBlur({ color: varAlpha(theme.vars.palette.common.whiteChannel, 0.08) }),
          p: 3,
          gap: 3,
          display: 'flex',
          borderRadius: 2,
          color: 'common.white',
          flexDirection: 'column',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Iconify icon="mingcute:quote-left-fill" width={40} sx={{ opacity: 0.48 }} />

      <Typography variant="body2">{testimonial.content}</Typography>

      <Rating value={testimonial.ratingNumber} readOnly size="small" />

      <Box sx={{ gap: 2, display: 'flex' }}>
        <Avatar alt={testimonial.name} src={testimonial.avatarUrl} />

        <ListItemText
          primary={testimonial.name}
          secondary={fDate(testimonial.postedDate)}
          slotProps={{
            secondary: {
              sx: {
                mt: 0.5,
                opacity: 0.64,
                color: 'inherit',
                typography: 'caption',
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}