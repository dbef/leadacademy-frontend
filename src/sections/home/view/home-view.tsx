'use client';

import type { FileDto } from 'src/types/file';
import type { FabProps } from '@mui/material/Fab';
import type { CourseDto } from 'src/types/course-type';
import type { UseBackToTopReturn } from 'minimal-shared/hooks';

import { useBackToTop } from 'minimal-shared/hooks';

import Fab from '@mui/material/Fab';
import { Stack } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';

import { CONFIG } from 'src/global-config';

import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { NewsSection } from 'src/sections/news-section/news-section';
import { CarouselAnimation } from 'src/sections/_examples/extra/carousel-view/carousel-animation';

import CoursesSection from '../courses-section';
import { LocationsSection } from '../campuses-section';

// ----------------------------------------------------------------------

type HomeProps = {
  products: CourseDto[];
  images: FileDto[];
};

export function HomeView({ products, images }: HomeProps) {
  const pageProgress = useScrollProgress();

  const { onBackToTop, isVisible } = useBackToTop('90%');

  const coverImages = images.map((item) => ({
    id: item.media_id,
    title_ka: 'საუკეთესო ადგილი სწავლისა და გართობისთვის!',
    title_en: 'The best place for learning and fun!',
    description_ka:
      'შეუერთდით ჩვენს არაფორმალური განათლების ჰაბს და აღმოაჩინეთ ახალი შესაძლებლობები!',
    description_en: 'Join our informal hub and discover new opportunities!',
    coverUrl: item.media_url,
    button_ka: `დარეგისტრირდი აქ`,
    button_en: 'Register Here',
    type: 'image',
    link: 'courses/register',
  }));

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={[(theme) => ({ position: 'fixed', zIndex: theme.zIndex.appBar + 1 })]}
      />
      {coverImages.length > 0 && <CarouselAnimation data={coverImages} />}
      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <CoursesSection products={products} />
      </Stack>
      {/* <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <SmallDesc />
      </Stack> */}
      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <LocationsSection />
      </Stack>
      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <NewsSection />
      </Stack>
      {/* <BackToTopButton isVisible={isVisible} onClick={onBackToTop} />

      <HomeHero />

   
        <HomeMinimal />

        <HomeHugePackElements />

        <HomeForDesigner />

        <HomeHighlightFeatures />

        <HomeIntegrations />

        <HomePricing />

        <HomeTestimonials />

        <HomeFAQs />

        <HomeZoneUI />

        <HomeAdvertisement />
      </Stack> */}
    </>
  );
}

// ----------------------------------------------------------------------

type BackToTopProps = FabProps & {
  isVisible: UseBackToTopReturn['isVisible'];
};

function BackToTopButton({ isVisible, sx, ...other }: BackToTopProps) {
  return (
    <Fab
      aria-label="Back to top"
      sx={[
        (theme) => ({
          width: 48,
          height: 48,
          position: 'fixed',
          transform: 'scale(0)',
          right: { xs: 24, md: 32 },
          bottom: { xs: 24, md: 32 },
          zIndex: theme.zIndex.speedDial,
          transition: theme.transitions.create(['transform']),
          ...(isVisible && { transform: 'scale(1)' }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <SvgIcon>
        {/* https://icon-sets.iconify.design/solar/double-alt-arrow-up-bold-duotone/ */}
        <path
          fill="currentColor"
          d="M5 17.75a.75.75 0 0 1-.488-1.32l7-6a.75.75 0 0 1 .976 0l7 6A.75.75 0 0 1 19 17.75z"
          opacity="0.5"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M4.43 13.488a.75.75 0 0 0 1.058.081L12 7.988l6.512 5.581a.75.75 0 1 0 .976-1.138l-7-6a.75.75 0 0 0-.976 0l-7 6a.75.75 0 0 0-.081 1.057"
          clipRule="evenodd"
        />
      </SvgIcon>
    </Fab>
  );
}
