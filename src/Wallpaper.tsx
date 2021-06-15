import React from 'react';

import type { Theme } from './types';

type Properties = {
    theme: Theme;
};

export function Wallpaper({ theme }: Properties): React.ReactElement {
    return (
        <svg
            id="wallpaper"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 400"
            className="w-full"
        >
            <rect fill={theme.background} width="100%" height="100%" />
            <rect fill={theme.white} x="0" y="0" width="17" height="400" />
            <rect fill={theme.red} x="61" y="0" width="160" height="24" />
            <rect fill={theme.green} x="242" y="0" width="290" height="24" />
            <rect fill={theme.brightRed} x="554" y="0" width="200" height="24" />
            <rect fill={theme.white} x="776" y="0" width="20" height="24" />
            <rect fill={theme.brightGreen} x="140" y="56" width="160" height="24" />
            <rect fill={theme.white} x="320" y="56" width="436" height="24" />
            <rect fill={theme.red} x="776" y="56" width="240" height="24" />
            <rect fill={theme.brightRed} x="140" y="101" width="160" height="24" />
            <rect fill={theme.green} x="320" y="101" width="512" height="24" />
            <rect fill={theme.white} x="855" y="101" width="20" height="24" />
            <rect fill={theme.red} x="320" y="146" width="127" height="24" />
            <rect fill={theme.white} x="469" y="146" width="162" height="24" />
            <rect fill={theme.brightGreen} x="654" y="146" width="202" height="24" />
            <rect fill={theme.brightRed} x="320" y="191" width="436" height="24" />
            <rect fill={theme.white} x="140" y="230" width="20" height="24" />
            <rect fill={theme.red} x="140" y="286" width="127" height="24" />
            <rect fill={theme.brightGreen} x="285" y="286" width="242" height="24" />
            <rect fill={theme.green} x="140" y="331" width="127" height="24" />
            <rect fill={theme.red} x="285" y="331" width="103" height="24" />
            <rect fill={theme.white} x="61" y="376" width="20" height="24" />
        </svg>
    );
}
