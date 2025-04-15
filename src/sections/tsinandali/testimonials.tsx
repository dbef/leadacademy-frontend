import { Stack } from '@mui/material';

import { _testimonials } from 'src/_mock';

import { TestimonialItem } from './testimonial-item';

export function Testimonials() {
  return (
    <Stack
      direction="row"
      spacing={2}
      width="100%"
      sx={{
        padding: '128px 256px',
        '@media (max-width: 1400px)': {
          padding: '64px 128px',
        },
        '@media (max-width: 1200px)': {
          padding: '64px 64px',
        },
        '@media (max-width: 1000px)': {
          padding: '64px 24px',
          marginTop: '50px',
        },
        '@media (max-width: 760px)': {
          padding: '24px !important',
        },
        backgroundColor: '#1C252E',
        overflowX: 'auto',
        overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch',
        marginBottom: '90px'
      }}
    >
      {_testimonials.map((testimonial, idx) => (
        <Stack
          key={testimonial.name}
          sx={{
            flexShrink: 0,
            width: '340px',
          }}
        >
          <TestimonialItem testimonial={testimonial} />
        </Stack>
      ))}
    </Stack>
  );
}
