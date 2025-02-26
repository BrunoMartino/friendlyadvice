import * as React from 'react';

type SvgProps = React.SVGProps<SVGSVGElement>;

function CsvIcon(props: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="96px"
      height="96px"
      viewBox="0 0 100 100"
      // shapeRendering="geometricPrecision"
      // textRendering="geometricPrecision"
      // imageRendering="optimizeQuality"
      // fillRule="evenodd"
      // clipRule="evenodd"
      {...props}
    >
      <path
        fill="#2e2d2c"
        d="M79.5 29.5a72.444 72.444 0 00.5 12l3 3a30.499 30.499 0 010 11c-1.667 1.333-3.333 1.333-5 0a32.437 32.437 0 01-.5-8h-60v20h8c12.005-.166 24.005 0 36 .5 1.333 1.667 1.333 3.333 0 5-11.995.5-23.995.666-36 .5h-4c-.726 3.807.607 6.474 4 8 13.004-.167 26.004 0 39 .5 1.333 1.667 1.333 3.333 0 5-12.996.5-25.996.667-39 .5-4.094.795-7.26-.538-9.5-4 .279-4.699-1.055-8.699-4-12a196.24 196.24 0 010-28l1.5-1.5a72.444 72.444 0 0112-.5h48v-10c-12.239 2.914-18.239-1.753-18-14v-4a265.198 265.198 0 00-32 1 4.452 4.452 0 00-1.5 2l-1 20c-1.388 1.054-2.888 1.22-4.5.5a110.58 110.58 0 01-.5-25.5L19.5 8c14-.667 28-.667 42 0L79 25.5a8.434 8.434 0 01.5 4z"
        opacity={0.987}
      />
      <path
        fill="#cf934b"
        d="M55.5 17.5c-.239 12.247 5.761 16.914 18 14v10h-48c-.166-7.34 0-14.674.5-22l1.5-1.5c9.327-.5 18.66-.666 28-.5z"
        opacity={0.999}
      />
      <path
        fill="#ca904a"
        d="M61.5 18.5a63.67 63.67 0 017 6.5c-5.994 1.84-8.327-.326-7-6.5z"
      />
      <path
        fill="#cd924a"
        d="M79.5 29.5a38.44 38.44 0 015.5 5c.5 9.994.666 19.994.5 30a10.521 10.521 0 01-3-2.5c-1.333-.667-2.667-.667-4 0L68 72.5c-1.08 2.737-.246 4.404 2.5 5 2.568-1.059 4.735-2.726 6.5-5 .5 6.992.666 13.992.5 21-16.67.167-33.337 0-50-.5-1.655-1.444-2.322-3.278-2-5.5 13.004.167 26.004 0 39-.5 1.333-1.667 1.333-3.333 0-5a760.877 760.877 0 00-39-.5v-8c12.005.166 24.005 0 36-.5 1.333-1.667 1.333-3.333 0-5a648.448 648.448 0 00-36-.5v-20h52a32.437 32.437 0 00.5 8c1.667 1.333 3.333 1.333 5 0a30.499 30.499 0 000-11l-3-3a72.444 72.444 0 01-.5-12z"
        opacity={0.997}
      />
      <path
        fill="#35312e"
        d="M30.5 49.5c3.724-.727 6.39.606 8 4-.333 1-1 1.667-2 2-1.993-2.417-3.827-2.417-5.5 0-.862 5.534.971 6.868 5.5 4 1 .333 1.667 1 2 2-4.266 5.518-8.1 5.184-11.5-1-1.118-4.423.05-8.09 3.5-11zM43.5 49.5a15.42 15.42 0 017 1c.929 1.189 1.262 2.522 1 4-2.395-.864-4.729-.864-7 0 5.219.378 7.719 3.044 7.5 8-3.917 3.972-7.75 3.972-11.5 0a3.646 3.646 0 011-1.5c2.386.351 4.72.185 7-.5-7.977-1.227-9.644-4.893-5-11z"
      />
      <path
        fill="#36322e"
        d="M55.5 49.5c.996-.086 1.83.248 2.5 1a26.86 26.86 0 003.5 6 64.504 64.504 0 004-6.5c.95-.617 1.782-.45 2.5.5-.36 3.424-1.36 6.758-3 10-.687 2.055-1.854 3.721-3.5 5-2.814-3.572-4.98-7.572-6.5-12-.58-1.428-.412-2.762.5-4z"
      />
      <path
        fill="#312e2d"
        d="M85.5 64.5c5.234 2.872 7.9 7.205 8 13-3.013.393-5.68-.274-8-2 .039-1.256-.461-2.256-1.5-3-.5 6.658-.666 13.325-.5 20v3h-6v-2c.166-7.008 0-14.008-.5-21-1.765 2.274-3.932 3.941-6.5 5-2.746-.596-3.58-2.263-2.5-5L78.5 62c1.333-.667 2.667-.667 4 0a10.521 10.521 0 003 2.5z"
        opacity={0.978}
      />
      <path
        fill="#d0934c"
        d="M85.5 75.5c.166 5.344 0 10.677-.5 16-.383.556-.883.89-1.5 1-.166-6.675 0-13.342.5-20 1.039.744 1.539 1.744 1.5 3z"
        opacity={0.964}
      />
    </svg>
  );
}

export default CsvIcon;
