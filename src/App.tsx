import React from 'react';

import { DarkModeButton } from './DarkModeButton';
import { SelectThemes } from './SelectThemes';
import { Wallpaper } from './Wallpaper';
import type { Theme } from './SelectThemes';

export function App(): React.ReactElement {
    const canvasReference = React.useRef<HTMLCanvasElement>(null);
    const [theme, setTheme] = React.useState<Theme>({
        name: '3024 Day',
        red: '#db2d20',
        green: '#01a252',
        white: '#a5a2a2',
        brightRed: '#e8bbd0',
        brightGreen: '#3a3432',
        background: '#f7f7f7',
    });

    const handleOnClick = () => {
        if (!canvasReference.current) {
            return;
        }

        const link = document.createElement('a');
        link.download = `wallpaper-code.png`;
        link.href = canvasReference.current.toDataURL('image/png');
        document.body.append(link);
        link.click();
        link.remove();
    };

    return (
        <div className="bg-white dark:bg-gray-900">
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a
                        href="/"
                        className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 dark:text-white"
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
                        <span className="ml-3 text-xl">Wallpaper Fake Code</span>
                    </a>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <DarkModeButton />
                    </nav>
                </div>
            </header>
            <main>
                <section>
                    <SelectThemes setTheme={setTheme} />
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
                <section className="flex bg-gray-900 dark:bg-white">
                    <Wallpaper canvasReference={canvasReference} theme={theme} />
                </section>
            </main>
            <footer></footer>
        </div>
    );
}
