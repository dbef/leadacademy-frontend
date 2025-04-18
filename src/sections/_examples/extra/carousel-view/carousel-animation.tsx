import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useLanguage } from 'src/contexts/language-context';

import { varFade, MotionContainer } from 'src/components/animate';
import { Carousel, useCarousel, CarouselArrowNumberButtons } from 'src/components/carousel';

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    title_ka: string;
    title_en: string;
    description_ka: string;
    description_en: string;
    coverUrl: string;
    button_ka?: string;
    button_en?: string;
    type: string;
    link?: string;
  }[];
};

export function CarouselAnimation({ data }: Props) {
  const carousel = useCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 5000 })]);

  return (
    <Box sx={{ position: 'relative' }}>
      <Carousel
        carousel={carousel}
        slotProps={{
          slide: {
            width: '100%',
          },
        }}
      >
        {data.map((item, index) => (
          <CarouselItem
            key={item.id}
            index={index}
            item={item}
            selected={index === carousel.dots.selectedIndex}
          />
        ))}
      </Carousel>

      <CarouselArrowNumberButtons
        {...carousel.arrows}
        options={carousel.options}
        totalSlides={carousel.dots.dotCount}
        selectedIndex={carousel.dots.selectedIndex + 1}
        sx={{ top: 16, right: 16, position: 'absolute' }}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  index: number;
  selected: boolean;
  item: Props['data'][number];
};

function CarouselItem({ item, index, selected }: CarouselItemProps) {
  const { renderLanguage } = useLanguage();

  const router = useRouter();

  return (
    <Box sx={{ position: 'relative', height: '100vh' }}>
      {item.type === 'video' ? (
        // Video background
        <Box
          component="video"
          autoPlay
          loop
          muted
          playsInline
          sx={{
            objectFit: 'cover',
            aspectRatio: { xs: '4/3', sm: '16/10' },
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1, // Ensures the video stays in the background
          }}
        >
          <source src={item.coverUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </Box>
      ) : (
        // Image background
        <Box
          component="img"
          alt={item.title_en}
          src={item.coverUrl}
          sx={{
            objectFit: 'cover',
            aspectRatio: { xs: '4/3', sm: '16/10' },
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />
      )}
      <Box
        sx={(theme) => ({
          top: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          backgroundImage: `linear-gradient(to bottom, ${theme.vars.palette.grey[900]}, transparent)`,
        })}
      />

      <Box
        component={MotionContainer}
        animate={selected}
        action
        sx={{
          p: 3,
          left: 0,
          width: 1,
          top: 0,
          position: 'absolute',
          color: 'common.white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center horizontally
          justifyContent: 'center', // Center vertically
          height: '100vh', // Ensures it's centered vertically within the viewport height
          textAlign: 'center', // Optional: ensures text is centered inside the container
        }}
      >
        <m.div variants={varFade('inRight')}>
          <Typography sx={{ mb: 1, typography: { xs: 'subtitle1', md: 'h3' } }}>
            {renderLanguage(item.title_ka, item.title_en)}
          </Typography>
        </m.div>

        <m.div variants={varFade('inRight')}>
          <Typography variant="body2">
            {renderLanguage(item.description_ka, item.description_en)}
          </Typography>
        </m.div>

        <m.div variants={varFade('inRight')}>
          {item.button_en && item.button_ka ? (
            <Button
              
              variant="contained"
              sx={{ mt: 3, display: { sm: 'inline-flex' }, fontFeatureSettings: '"case" on', backgroundColor: '#7F9A16' }}
              onClick={() => router.push(!item.link ? 'courses' : item.link)}
            >
              {renderLanguage(item.button_ka, item.button_en)}
            </Button>
          ) : null}
        </m.div>
      </Box>
    </Box>
  );
}
