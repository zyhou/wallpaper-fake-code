import React from 'react';

import type { Theme } from './SelectThemes';

type Properties = {
    theme: Theme;
    canvasReference: React.RefObject<HTMLCanvasElement>;
};

export function Wallpaper({ theme, canvasReference }: Properties): React.ReactElement {
    React.useEffect(() => {
        if (!canvasReference.current) {
            return;
        }

        const context = canvasReference.current.getContext('2d');
        if (!context) {
            return;
        }

        // background
        context.fillStyle = theme.background;
        context.fillRect(0, 0, 1920, 1080);

        // left column
        context.fillStyle = theme.white;
        context.fillRect(477, 374, 17, 400);

        // first row
        context.fillStyle = theme.red;
        context.fillRect(538, 374, 160, 24);

        context.fillStyle = theme.green;
        context.fillRect(719, 374, 290, 24);

        context.fillStyle = theme.brightRed;
        context.fillRect(1031, 374, 200, 24);

        context.fillStyle = theme.white;
        context.fillRect(1253, 374, 20, 24);

        // second row
        context.fillStyle = theme.brightGreen;
        context.fillRect(617, 430, 160, 24);

        context.fillStyle = theme.white;
        context.fillRect(797, 430, 436, 24);

        context.fillStyle = theme.red;
        context.fillRect(1253, 430, 240, 24);

        // third row
        context.fillStyle = theme.brightRed;
        context.fillRect(617, 475, 160, 24);

        context.fillStyle = theme.green;
        context.fillRect(797, 475, 512, 24);

        context.fillStyle = theme.white;
        context.fillRect(1332, 475, 20, 24);

        // four row
        context.fillStyle = theme.red;
        context.fillRect(797, 520, 127, 24);

        context.fillStyle = theme.white;
        context.fillRect(946, 520, 162, 24);

        context.fillStyle = theme.brightGreen;
        context.fillRect(1131, 520, 202, 24);

        // five row
        context.fillStyle = theme.brightRed;
        context.fillRect(797, 565, 436, 24);

        // six row
        context.fillStyle = theme.white;
        context.fillRect(617, 604, 20, 24);

        // seven row
        context.fillStyle = theme.red;
        context.fillRect(617, 660, 127, 24);

        context.fillStyle = theme.brightGreen;
        context.fillRect(762, 660, 242, 24);

        // eight row
        context.fillStyle = theme.green;
        context.fillRect(617, 705, 127, 24);

        context.fillStyle = theme.red;
        context.fillRect(762, 705, 103, 24);

        // nine row
        context.fillStyle = theme.white;
        context.fillRect(538, 750, 20, 24);
    }, [canvasReference, theme]);

    return <canvas ref={canvasReference} width={1920} height={1080}></canvas>;
}
