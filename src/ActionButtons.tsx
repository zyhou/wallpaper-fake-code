import React from 'react';
import { Transition } from '@headlessui/react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { colord } from 'colord';

import type { Resolution, Theme } from './types';
import { SelectThemes } from './SelectThemes';

interface Map {
    [key: string]: Resolution[];
}

const resolutions: Map = {
    Ultrawide: [
        { width: 2560, height: 1080 },
        { width: 3440, height: 1440 },
        { width: 3840, height: 1600 },
    ],
    '16:9': [
        { width: 1280, height: 720 },
        { width: 1600, height: 900 },
        { width: 1920, height: 1080 },
        { width: 2560, height: 1440 },
        { width: 3840, height: 2160 },
    ],
    '16:10': [
        { width: 1280, height: 800 },
        { width: 1600, height: 1000 },
        { width: 1920, height: 1200 },
        { width: 2560, height: 1600 },
        { width: 3840, height: 2400 },
    ],
    '4:3': [
        { width: 1280, height: 960 },
        { width: 1600, height: 1200 },
        { width: 1920, height: 1440 },
        { width: 2560, height: 1920 },
        { width: 3840, height: 2880 },
    ],
    '5:4': [
        { width: 1280, height: 1024 },
        { width: 1600, height: 1280 },
        { width: 1920, height: 1536 },
        { width: 2560, height: 2048 },
        { width: 3840, height: 3072 },
    ],
};

type PropertiesResolutions = {
    handleOnChangeResolution: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Resolutions({ handleOnChangeResolution }: PropertiesResolutions): React.ReactElement {
    return (
        <React.Fragment>
            <p className="mb-5 font-bold">Pick a resolution</p>
            <p className="mb-2">
                Your screen resolution is{' '}
                <span className="font-semibold">
                    {window.screen.width}x{window.screen.height}
                </span>
                .
            </p>
            <div className="flex flex-col md:flex-row">
                {Object.entries(resolutions).map(([name, resolutionsSizes]) => {
                    return (
                        <div key={name} className="flex flex-col">
                            <span className="text-center font-bold">{name}</span>
                            <div className="flex flex-wrap items-center mx-1 md:flex-col">
                                {resolutionsSizes.map((resolutionsSize) => {
                                    const formatResolution = `${resolutionsSize.width}x${resolutionsSize.height}`;
                                    return (
                                        <div key={formatResolution} className="w-full my-1.5">
                                            <input
                                                type="radio"
                                                name="resolution-picker"
                                                id={`form-${formatResolution}`}
                                                value={formatResolution}
                                                onChange={handleOnChangeResolution}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor={`form-${formatResolution}`}
                                                className="block p-1 transition duration-300 ease-in-out bg-blue-600 hover:bg-blue-700 text-white text-center rounded ring ring-blue"
                                            >
                                                {formatResolution}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </React.Fragment>
    );
}

type PropertiesCustomTheme = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

function CustomTheme({ theme, setTheme }: PropertiesCustomTheme): React.ReactElement {
    const setColor = (themeProps: keyof Theme) => (color: string) => {
        setTheme((currentTheme) => ({
            ...currentTheme,
            [themeProps]: color,
            isDark: themeProps === 'background' ? colord(color).isDark() : currentTheme.isDark,
        }));
    };

    return (
        <div className="flex flex-row items-center flex-wrap justify-center">
            <span>background color</span>
            <HexColorPicker color={theme.background} onChange={setColor('background')} />
            <HexColorInput color={theme.background} onChange={setColor('background')} />

            <span>red color</span>
            <HexColorPicker color={theme.red} onChange={setColor('red')} />
            <HexColorInput color={theme.red} onChange={setColor('red')} />

            <span>green color</span>
            <HexColorPicker color={theme.green} onChange={setColor('green')} />
            <HexColorInput color={theme.green} onChange={setColor('green')} />

            <span>white color</span>
            <HexColorPicker color={theme.white} onChange={setColor('white')} />
            <HexColorInput color={theme.white} onChange={setColor('white')} />

            <span>brightRed color</span>
            <HexColorPicker color={theme.brightRed} onChange={setColor('brightRed')} />
            <HexColorInput color={theme.brightRed} onChange={setColor('brightRed')} />

            <span>brightGreen color</span>
            <HexColorPicker color={theme.brightGreen} onChange={setColor('brightGreen')} />
            <HexColorInput color={theme.brightGreen} onChange={setColor('brightGreen')} />
        </div>
    );
}

type Properties = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

type Panel = 'resolution' | 'customTheme' | null;

export function ActionButtons({ theme, setTheme }: Properties): React.ReactElement {
    const [resolution, setResolution] = React.useState<Resolution>({
        width: window.screen.width,
        height: window.screen.height,
    });
    const [displayPanel, setDisplayPanel] = React.useState<Panel>(null);

    const handleOnClickDownload = () => {
        const svgElement = document.querySelector('#wallpaper') as SVGGraphicsElement;
        const { width, height } = svgElement.getBBox();
        const svgXml = new XMLSerializer().serializeToString(svgElement);
        const svgBase64 = 'data:image/svg+xml;base64,' + btoa(svgXml);

        const image = new Image();
        image.addEventListener('load', () => {
            const canvas = document.createElement('canvas') as HTMLCanvasElement;
            const context = canvas.getContext('2d') as CanvasRenderingContext2D;

            canvas.width = resolution.width;
            canvas.height = resolution.height;

            context.fillStyle = theme.background;
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.drawImage(
                image,
                canvas.width / 2 - width / 2,
                canvas.height / 2 - height / 2,
                width,
                height,
            );

            const link = document.createElement('a');
            link.download = `wallpaper-fake-code.png`;
            link.href = canvas.toDataURL('image/png');
            document.body.append(link);
            link.click();
            link.remove();
        });
        image.src = svgBase64;
    };

    const handleOnClickResolution = () => {
        setDisplayPanel((panel) => (panel === 'resolution' ? null : 'resolution'));
    };

    const handleOnChangeResolution = (event: React.ChangeEvent<HTMLInputElement>) => {
        const [width, height] = event.target.value.split('x');
        setResolution({ width: parseInt(width, 10), height: parseInt(height, 10) } as Resolution);
    };

    const handleCustomTheme = () => {
        setDisplayPanel((panel) => (panel === 'customTheme' ? null : 'customTheme'));
    };

    return (
        <div>
            <section className="container flex flex-col justify-center items-center mx-auto mb-12 md:flex-row space-y-5 md:space-y-0">
                <SelectThemes theme={theme} setTheme={setTheme} />
                <div className="flex items-center flex-col md:flex-row space-y-5 md:space-y-0">
                    <button onClick={handleCustomTheme}>custom theme</button>
                    <button
                        onClick={handleOnClickResolution}
                        className="w-64 flex items-center justify-around text-lg transition duration-300 ease-in-out focus:outline-none focus:ring bg-blue-600 hover:bg-blue-700 text-white font-normal p-3 rounded ring ring-blue md:mx-16"
                    >
                        {resolution.width}x{resolution.height} resolution
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                    displayPanel === 'resolution'
                                        ? `M5 15l7-7 7 7`
                                        : `M19 9l-7 7-7-7`
                                }
                            />
                        </svg>
                    </button>
                    <button
                        onClick={handleOnClickDownload}
                        className="w-64 flex items-center justify-around text-lg transition duration-300 ease-in-out focus:outline-none focus:ring bg-blue-600 hover:bg-blue-700 text-white font-normal p-3 rounded ring ring-blue"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Download Wallpaper
                    </button>
                </div>
            </section>
            <Transition
                show={displayPanel !== null}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <section className="bg-white text-gray-700 flex flex-col items-center py-8 mb-12">
                    {displayPanel === 'resolution' && (
                        <Resolutions handleOnChangeResolution={handleOnChangeResolution} />
                    )}
                    {displayPanel === 'customTheme' && (
                        <CustomTheme theme={theme} setTheme={setTheme} />
                    )}
                </section>
            </Transition>
        </div>
    );
}
