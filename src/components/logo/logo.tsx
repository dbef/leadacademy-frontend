import type { LinkProps } from '@mui/material/Link';

import { useId, forwardRef } from 'react';
import { mergeClasses } from 'minimal-shared/utils';

import Link from '@mui/material/Link';
import { Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { Language, useLanguage } from 'src/contexts/language-context';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export type LogoProps = LinkProps & {
  isSingle?: boolean;
  disabled?: boolean;
};

export const Logo = forwardRef<HTMLAnchorElement, LogoProps>((props, ref) => {
  const { className, href = '/', isSingle = true, disabled, sx, ...other } = props;

  const theme = useTheme();

  const gradientId = useId();

  const TEXT_PRIMARY = theme.vars.palette.text.primary;
  const PRIMARY_LIGHT = theme.vars.palette.primary.light;
  const PRIMARY_MAIN = theme.vars.palette.primary.main;
  const PRIMARY_DARKER = theme.vars.palette.primary.dark;

  const { language } = useLanguage();

  /*
    * OR using local (public folder)
    *
    const singleLogo = (
      <img
        alt="Single logo"
        src={`${CONFIG.assetsDir}/logo/logo-single.svg`}
        width="100%"
        height="100%"
      />
    );

    const fullLogo = (
      <img
        alt="Full logo"
        src={`${CONFIG.assetsDir}/logo/logo-full.svg`}
        width="100%"
        height="100%"
      />
    );
    *
    */

  const singleLogo = (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={`${gradientId}-1`}
          x1="152"
          y1="167.79"
          x2="65.523"
          y2="259.624"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_DARKER} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-2`}
          x1="86"
          y1="128"
          x2="86"
          y2="384"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-3`}
          x1="402"
          y1="288"
          x2="402"
          y2="384"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${`${gradientId}-1`})`}
        d="M86.352 246.358C137.511 214.183 161.836 245.017 183.168 285.573C165.515 317.716 153.837 337.331 148.132 344.418C137.373 357.788 125.636 367.911 111.202 373.752C80.856 388.014 43.132 388.681 14 371.048L86.352 246.358Z"
      />
      <path
        fill={`url(#${`${gradientId}-2`})`}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M444.31 229.726C398.04 148.77 350.21 72.498 295.267 184.382C287.751 198.766 282.272 226.719 270 226.719V226.577C257.728 226.577 252.251 198.624 244.735 184.24C189.79 72.356 141.96 148.628 95.689 229.584C92.207 235.69 88.862 241.516 86 246.58C192.038 179.453 183.11 382.247 270 383.858V384C356.891 382.389 347.962 179.595 454 246.72C451.139 241.658 447.794 235.832 444.31 229.726Z"
      />
      <path
        fill={`url(#${`${gradientId}-3`})`}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M450 384C476.509 384 498 362.509 498 336C498 309.491 476.509 288 450 288C423.491 288 402 309.491 402 336C402 362.509 423.491 384 450 384Z"
      />
    </svg>
  );

  const fullLogo = (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 360 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={`${gradientId}-1`}
          x1="38"
          y1="41.9469"
          x2="16.381"
          y2="64.906"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_DARKER} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-2`}
          x1="21.5"
          y1="32"
          x2="21.5"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-3`}
          x1="100.5"
          y1="72"
          x2="100.5"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${`${gradientId}-1`})`}
        d="M21.588 61.59C34.378 53.546 40.458 61.254 45.792 71.393C41.379 79.429 38.459 84.333 37.032 86.105C34.343 89.447 31.409 91.978 27.8 93.438C20.214 97.004 10.783 97.17 3.5 92.762L21.588 61.59Z"
      />
      <path
        fill={`url(#${`${gradientId}-2`})`}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M111.078 57.431C99.51 37.194 87.552 18.124 73.817 46.096C71.937 49.69 70.568 56.68 67.5 56.68V56.644C64.432 56.644 63.063 49.656 61.184 46.06C47.448 18.09 35.49 37.157 23.922 57.396C23.052 58.922 22.216 60.379 21.5 61.645C48.01 44.863 45.778 95.562 67.5 95.965V96C89.223 95.597 86.99 44.899 113.5 61.68C112.785 60.414 111.949 58.957 111.078 57.431Z"
      />
      <path
        fill={`url(#${`${gradientId}-3`})`}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M112.5 96C119.127 96 124.5 90.627 124.5 84C124.5 77.373 119.127 72 112.5 72C105.873 72 100.5 77.373 100.5 84C100.5 90.627 105.873 96 112.5 96Z"
      />
      <path
        fill={TEXT_PRIMARY}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M146.031 45.215C149.553 45.215 152.103 42.825 152.103 39.587C152.103 36.348 149.553 34 146.031 34C142.591 34 140 36.348 140 39.587C140 42.826 142.591 45.215 146.031 45.215ZM146.031 93.838C149.351 93.838 151.374 91.854 151.374 87.968V55.984C151.374 52.097 149.351 50.073 146.072 50.073C142.753 50.073 140.729 52.097 140.729 55.983V87.968C140.729 91.814 142.753 93.838 146.031 93.838ZM200.394 88.008C200.394 91.773 198.491 93.838 195.091 93.838C191.65 93.838 189.748 91.733 189.748 87.968V67.563C189.748 61.935 186.955 58.777 182.017 58.777C176.471 58.777 172.99 62.867 172.99 69.547V87.967C172.99 91.733 171.047 93.838 167.647 93.838C164.247 93.838 162.304 91.733 162.304 87.968V55.78C162.304 52.258 164.328 50.072 167.566 50.072C170.764 50.072 172.626 51.975 172.747 55.416V58.048H173.273C174.933 52.946 179.75 49.788 186.064 49.788C195.213 49.788 200.394 55.214 200.394 64.647V88.008ZM216.302 45.215C219.823 45.215 222.374 42.825 222.374 39.587C222.374 36.348 219.823 34 216.302 34C212.861 34 210.27 36.348 210.27 39.587C210.27 42.826 212.861 45.215 216.302 45.215ZM221.645 87.968C221.645 91.854 219.621 93.838 216.302 93.838C213.023 93.838 210.999 91.814 210.999 87.968V55.984C210.999 52.097 213.023 50.073 216.342 50.073C219.621 50.073 221.645 52.097 221.645 55.983V87.968ZM289.001 93.838C292.401 93.838 294.344 91.773 294.344 87.968V63.433C294.344 54.931 289.163 49.789 280.5 49.789C274.307 49.789 269.45 52.907 267.588 57.887H267.102C265.685 52.867 261.314 49.789 255.282 49.789C249.454 49.789 244.96 52.785 243.544 57.603H243.017V55.58C242.856 52.139 240.953 50.074 237.836 50.074C234.598 50.074 232.574 52.26 232.574 55.823V87.969C232.574 91.774 234.517 93.839 237.917 93.839C241.317 93.839 243.26 91.774 243.26 87.969V67.199C243.26 61.977 246.296 58.616 250.83 58.616C255.444 58.616 258.318 61.734 258.318 66.835V87.969C258.318 91.774 260.14 93.839 263.459 93.839C266.819 93.839 268.64 91.774 268.64 87.969V67.239C268.64 62.058 271.757 58.616 276.331 58.616C280.946 58.616 283.698 61.531 283.698 66.633V87.969C283.698 91.774 285.601 93.838 289.001 93.838ZM328.265 87.968C326.079 91.814 321.829 94 316.567 94C308.188 94 302.521 88.737 302.521 80.923C302.521 72.988 308.39 68.089 318.145 68.089H328.346V64.567C328.346 60.235 325.634 57.967 320.736 57.967C317.498 57.967 315.19 59.182 312.802 61.327C311.588 62.3 310.454 62.745 308.714 62.745C306.366 62.745 304.909 61.166 304.909 58.98C304.909 56.47 306.65 53.919 310.414 52.016C313.126 50.599 316.729 49.789 321.424 49.789C332.677 49.789 338.992 55.134 338.992 64.648V88.13C338.992 91.773 337.13 93.838 333.811 93.838C330.977 93.838 329.115 92.259 328.791 89.466V87.968H328.265ZM320.129 86.308C315.96 86.308 313.126 83.838 313.126 80.275C313.126 76.753 315.717 74.648 320.088 74.648H328.346V79.1C328.346 83.149 324.743 86.308 320.129 86.308ZM360 87.968C360 91.854 357.936 93.838 354.657 93.838C351.338 93.838 349.314 91.854 349.314 87.968V40.842C349.314 36.956 351.338 34.932 354.657 34.932C357.936 34.932 360 36.955 360 40.842V87.968Z"
      />
    </svg>
  );

  return (
    <LogoRoot
      ref={ref}
      component={RouterLink}
      href={language === Language.KA ? '/' : '/en'}
      aria-label="Logo"
      underline="none"
      className={mergeClasses([logoClasses.root, className])}
      sx={[
        () => ({
          width: 40,
          height: 40,
          ...(!isSingle && { width: 102, height: 36 }),
          ...(disabled && { pointerEvents: 'none' }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <svg
        width={props.width ? props.width.toString() : '51'}
        height={props.height ? props.height.toString() : '32'}
        viewBox={`0 0 ${props.width ? props.width.toString() : '51'} ${props.height ? props.height.toString() : '32'}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_503_1070)">
          <path
            d="M25.1839 20.0891C24.7955 16.4591 22.8126 12.7557 19.0879 11.6446C18.4203 11.4454 15.1426 11.165 15.1457 10.7304L19.9118 9.42533C22.0639 8.70771 24.3582 5.87045 24.7938 3.70101C24.9567 2.88906 24.6071 0.167101 25.3412 0.0142313C26.4267 -0.212016 26.0281 2.22997 26.129 2.84931C26.963 7.98049 30.9594 10.1172 35.8365 10.5832C36.6036 11.3742 33.9803 11.189 33.6333 11.2606C29.64 12.0835 27.163 14.021 26.2342 18.1109C26.1272 18.5831 25.793 20.6416 25.793 20.9945V28.089C29.2019 28.8092 37.3223 25.2133 31.2425 22.2314C30.4212 21.8287 29.3018 21.9432 28.8368 21.1487C31.6001 21.6287 36.2271 22.9386 35.2318 26.5795C39.5778 24.7848 42.4935 21.2365 37.3328 18.0022C36.3345 17.3763 35.0839 17.1483 34.3159 16.318C38.0568 16.8618 43.6314 19.3937 43.1461 23.8623C46.7263 21.7899 47.9884 18.2337 44.9376 14.988C43.5006 13.4593 41.3323 12.8479 39.7949 11.4878C47.9167 12.8894 56.4004 20.67 46.5938 27.1342C36.6714 33.6748 15.1418 33.4704 5.00316 27.4255C-5.52826 21.1465 2.52916 12.9697 11.1829 11.4878C9.7358 12.8064 7.53924 13.4183 6.11641 14.9129C3.22186 17.9537 4.2629 22.0017 7.83164 23.8623C7.44324 19.3571 12.8563 16.8793 16.6619 16.318C14.952 17.6851 12.6004 18.0013 11.4805 20.0803C9.69881 23.3871 13.1297 25.3762 15.746 26.5791C14.9986 22.7979 19.1971 21.7043 22.141 21.1483C20.9229 22.2205 18.264 22.3358 17.6955 24.1589C16.8094 27.0019 23.1411 28.4842 25.1848 28.089C24.9867 25.5256 25.4539 22.6049 25.1848 20.0886L25.1839 20.0891Z"
            fill="#A4C121"
          />
        </g>
        <defs>
          <clipPath id="clip0_503_1070">
            <rect width={props.width ? props.width.toString() : '51'} height={props.height ? props.height.toString() : '32'}fill="white" />
          </clipPath>
        </defs>
      </svg>
    </LogoRoot>
  );
});

// ----------------------------------------------------------------------

const LogoRoot = styled(Link)(() => ({
  flexShrink: 0,
  color: 'transparent',
  display: 'inline-flex',
  verticalAlign: 'middle',
}));
