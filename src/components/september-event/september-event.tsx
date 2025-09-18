'use client';

import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import { Box, Button, Typography } from '@mui/material';

import { CONFIG } from 'src/global-config';
import { Language, useLanguage } from 'src/contexts/language-context';

import { Image } from '../image';

const texts = [
  {
    id: 1,
    ka: '15:00 - საბადოს გარე ტერიტორიაზე შეძლებთ ტურებზე რეგისტრაციას',
    en: '15:00 - Sign up for tours in Sabado Yard',
  },
  {
    id: 2,
    ka: 'გელოდებათ საჩუქრები - ბრენდირებული ნივთები და მცენარეები',
    en: 'Gifts for You - Branded items and plants are waiting for you',
  },
  {
    id: 3,
    ka: 'გიმასპინძლებთ საკვებ ზონაში',
    en: 'We look forward to welcoming you in the food area',
  },
  {
    id: 4,
    ka: 'პატარა სტუმრებს გავართობთ ყვავილების გვირგვინებით, თამაშობანას სივრცით და სხვადასხვა თამაშებით',
    en: 'Our little guests can enjoy making floral crowns, the Tamashobana space, and various fun activities',
  },
  {
    id: 5,
    ka: '15:30 - გამოგვყევით საბადოს დასათვალიერებლად',
    en: '15:30 - Join us to explore Sabado',
  },
  {
    id: 6,
    ka: '16:00 - არ გამოტოვოთ დამფუძნებლის მიმართვა სცენაზე, რომ გაიგოთ რა არის საბადო',
    en: '16:00 - Don’t miss the speech by the founder on stage to learn more about Sabado',
  },
  {
    id: 7,
    ka: '16:30 -  კინოჩვენება',
    en: ' 16:30 -  Movie screening',
  },
  {
    id: 8,
    ka: '17:00 -  ნიკოლოზ რაჭველის, სტეფანეს და ფანიკოს  კონცერტი',
    en: '17:00 -  Performance by Nikoloz Rachveli, Stephane and Faniko',
  },
  {
    id: 9,
    ka: '17:00 -  საბავშვო ანიმაციები კინოთეატრში',
    en: '17:00 -  Children’s Movie Screening',
  },
];

export function SeptemberEvent() {
  const { renderLanguage, language } = useLanguage();
  const [tab, setTab] = useState('dayplan');

  const handleChangeTab = () => {
    if (tab === 'dayplan') {
      setTab('map');
      return;
    }

    setTab('dayplan');
  };

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Button
          sx={{
            borderRadius: '0px',
            backgroundColor: tab === 'dayplan' ? '#7F9A16 !important' : '#3D1746 !important',
            color: 'white !important',
          }}
          variant="contained"
          fullWidth
          onClick={handleChangeTab}
        >
          {renderLanguage('დღის გეგმა', 'Day plan')}
        </Button>
        <Button
          sx={{
            borderRadius: '0px',
            backgroundColor: tab === 'map' ? '#7F9A16 !important' : '#3D1746 !important',
            color: 'white !important',
          }}
          variant="contained"
          fullWidth
          onClick={handleChangeTab}
        >
          {renderLanguage('რუკა', 'Map')}
        </Button>
      </Box>
      {tab === 'dayplan' ? (
        <Box
          sx={{
            backgroundImage: `url(${CONFIG.assetsDir}/assets/images/gegma-01.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center top',
            display: 'flex',
            padding: '20px',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: '25px',
            fontFamily: 'UpperCaseHelvetica1 !important',
            fontFeatureSettings: "'case' on",
            color: 'white',
          }}
        >
          {/* <Typography
            sx={{
              fontFamily: 'UpperCaseHelvetica1 !important',
              fontFeatureSettings: "'case' on",
              fontSize: '40px',
              textAlign: 'center',
            }}
          >
            {renderLanguage('დღის გეგმა', 'Day plan')}
          </Typography> */}
          {texts.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center', // align text from the top
                justifyContent: 'flex-start',
              }}
            >
              <Image
                src={`${CONFIG.assetsDir}/assets/images/gegma-03.png`}
                sx={{
                  objectFit: 'contain',
                  height: '70px',
                  width: '70px',
                  flexShrink: 0, // prevents shrinking on small screens
                  mt: '4px', // push icon a bit down to align better
                }}
              />
              <Typography
                sx={{
                  fontFamily: 'UpperCaseHelvetica1 !important',
                  fontFeatureSettings: "'case' on",
                  fontSize: '18px',
                  lineHeight: 1.6, // consistent spacing
                  wordBreak: 'break-word', // wrap long Georgian text gracefully
                }}
              >
                {renderLanguage(item.ka, item.en)}
              </Typography>
            </Box>
          ))}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              src={`${CONFIG.assetsDir}/assets/images/${language === Language.KA ? 'gegma-04.png' : 'gegma-05.png'}`}
              sx={{
                objectFit: 'contain',
                height: '120px',
                width: '120px',
              }}
            />
          </Box>
        </Box>
      ) : (
        <div>
          <TransformWrapper initialScale={1} minScale={0.5} maxScale={5} centerOnInit>
            <TransformComponent>
              <Image
                src={
                  language === Language.KA
                    ? 'https://lead-for-test.s3.eu-north-1.amazonaws.com/%E1%83%92%E1%83%94%E1%83%92%E1%83%9B%E1%83%90_%E1%83%A1%E1%83%90%E1%83%91%E1%83%90%E1%83%93%E1%83%9D-01.jpg'
                    : 'https://lead-for-test.s3.eu-north-1.amazonaws.com/%E1%83%92%E1%83%94%E1%83%92%E1%83%9B%E1%83%90_%E1%83%A1%E1%83%90%E1%83%91%E1%83%90%E1%83%93%E1%83%9D-02.jpg'
                }
                sx={{
                  width: 'auto',
                  objectFit: 'contain',
                  cursor: 'grab',
                }}
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
      )}
    </>
  );
}
