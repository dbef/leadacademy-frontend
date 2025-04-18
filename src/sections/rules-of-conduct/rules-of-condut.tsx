'use client';

import { useEffect } from 'react';
import { m, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { Box, Stack, Typography } from '@mui/material';

import { CONFIG } from 'src/global-config';
import { useLanguage } from 'src/contexts/language-context';

import { rulesOfConductData } from './data';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function RulesOfConduct() {
  const { renderLanguage } = useLanguage();

  return (
    <Box
      sx={{
        padding: '28px 256px',
        '@media (max-width: 1400px)': { padding: '64px 128px' },
        '@media (max-width: 1200px)': { padding: '28px 64px' },
        '@media (max-width: 1000px)': { padding: '28px 24px' },
        '@media (max-width: 760px)': { padding: '24px !important' },
        backgroundImage: `url(${CONFIG.assetsDir}/assets/background/Vector_1.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundAttachment: 'fixed', 
        backgroundColor: '#FAF6FD',
        backgroundPosition: 'center top',
      }}
    >
      <Stack spacing={4}>
        <FadeUp>
          <Typography variant="h4" align="left" sx={{ fontFeatureSettings: "'case' on" }}>
            {renderLanguage('ქცევის წესები', 'Rules of conduct')}
          </Typography>
        </FadeUp>

        <FadeUp>
          <Typography variant="body1" align="left" sx={{ fontFeatureSettings: "'case' on" }}>
            {renderLanguage(
              `მოხარულნი ვართ რომ შემოგვიერთდით საინტერესო და სასიამოვნო გამოცდილებისთვის. თქვენი უსაფრთხო გარემოში განათლებისა და გართობისათვის, გთხოვთ, დაიცვათ შემდეგი წესები.`,
              `We’re excited to have you join us for a fun-filled and meaningful Camp experience. To ensure your enlightenment and entertainment in a safe environment, please follow rules of conduct.`
            )}
          </Typography>
        </FadeUp>

        {rulesOfConductData.map((item) => (
          <FadeUp key={item.id}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ fontFeatureSettings: "'case' on" }}>
                {item.id}. {renderLanguage(item.title_ka, item.title_en)}
              </Typography>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {item.children.map((point) => (
                  <li key={point.id} style={{ marginBottom: '4px' }}>
                    <Typography variant="body2" component="span">
                      {item.id}.{point.id} {renderLanguage(point.title_ka, point.title_en)}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Stack>
          </FadeUp>
        ))}
      </Stack>
    </Box>
  );
}

function FadeUp({ children }: { children: React.ReactNode }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden'); // 👈 resets the animation when out of view
    }
  }, [inView, controls]);

  return (
    <m.div ref={ref} variants={fadeUpVariant} initial="hidden" animate={controls}>
      {children}
    </m.div>
  );
}
