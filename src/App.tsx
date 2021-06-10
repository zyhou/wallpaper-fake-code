import React from 'react';

import { DarkModeButton } from './DarkModeButton';
import { SelectThemes } from './SelectThemes';
import { Wallpaper } from './Wallpaper';
import type { Theme } from './SelectThemes';

const getTwitterUrl = () =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `Thank you @rmaximedev for my new wallpaper 😍 #wallpaper`,
    )}`;

export function App(): React.ReactElement {
    const [theme, setTheme] = React.useState<Theme>({
        name: '3024 Day',
        red: '#db2d20',
        green: '#01a252',
        white: '#a5a2a2',
        brightRed: '#e8bbd0',
        brightGreen: '#3a3432',
        background: '#f7f7f7',
    });

    const [twitterUrl, setTwitterUrl] = React.useState<string>(
        `${getTwitterUrl()}&url=${encodeURIComponent(window.location.origin)}`,
    );

    React.useEffect(() => {
        setTwitterUrl(
            `${getTwitterUrl()}&url=${encodeURIComponent(
                `${window.location.origin}/?theme=${encodeURIComponent(theme.name)}`,
            )}`,
        );
    }, [theme]);

    const handleOnClick = () => {
        const svgElement = document.querySelector('#wallpaper') as SVGGraphicsElement;
        const { width, height } = svgElement.getBBox();
        const svgXml = new XMLSerializer().serializeToString(svgElement);
        const svgBase64 = 'data:image/svg+xml;base64,' + btoa(svgXml);

        const image = new Image();
        image.addEventListener('load', () => {
            const canvas = document.createElement('canvas') as HTMLCanvasElement;
            const context = canvas.getContext('2d') as CanvasRenderingContext2D;

            canvas.width = 1920;
            canvas.height = 1080;

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
            link.download = `wallpaper-code.png`;
            link.href = canvas.toDataURL('image/png');
            document.body.append(link);
            link.click();
            link.remove();
        });
        image.src = svgBase64;
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
            <header className="text-gray-600 dark:text-gray-200">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a
                        href="/"
                        className="flex title-font font-medium items-center mb-4 md:mb-0 hover:text-gray-900 dark:hover:text-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-14 h-14 p-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span className="ml-3 text-xl hover:text-gray-900 dark:hover:text-white">
                            Wallpaper Fake Code
                        </span>
                    </a>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <a
                            href={twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center mr-2 hover:text-gray-900 dark:hover:text-white"
                        >
                            <svg width="20" height="20" fill="currentColor" className="mr-2">
                                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                            </svg>
                            <p>Share on Twitter</p>
                        </a>
                    </nav>
                    <DarkModeButton />
                </div>
            </header>
            <main className="flex-grow">
                <section className="flex mb-16">
                    <SelectThemes theme={theme} setTheme={setTheme} />
                    <button
                        onClick={handleOnClick}
                        className="w-56 flex items-center py-2 px-4 max-w-xs mx-auto text-base font-semibold font-primary rounded-md focus:outline-none focus:ring-1 focus:ring-palette-primary focus:ring-offset-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
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
                </section>
                <section
                    className="container mx-auto flex items-center h-md lg:h-lg"
                    style={{ backgroundColor: theme.background }}
                >
                    <div className="flex mx-auto w-4/5 lg:w-3/5 xl:2/5">
                        <Wallpaper theme={theme} />
                    </div>
                </section>
            </main>
            <footer className="flex justify-center items-center flex-wrap flex-col mb-4 md:flex-row text-gray-600 dark:text-gray-200">
                <p>
                    created by{' '}
                    <a
                        href="https://twitter.com/rmaximedev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mr-2 hover:text-gray-900 dark:hover:text-white"
                    >
                        @rmaximedev
                    </a>
                </p>
                ¬
                <a
                    href="https://github.com/zyhou/wallpaper-fake-code"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mx-2 hover:text-gray-900 dark:hover:text-white"
                >
                    <svg width="24" height="24" fill="currentColor" className="mr-2">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
                        ></path>
                    </svg>
                    <p>Source code</p>
                </a>
            </footer>
        </div>
    );
}
