import * as React from 'react';

import type { Theme } from './types';
import { Wallpaper } from './Wallpaper';
import { ActionButtons } from './ActionButtons';
import { EditBackgroundColor } from './EditBackgroundColor';

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
        isDark: false,
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

    return (
        <div
            className={`flex flex-col min-h-screen antialiased ${
                theme.isDark ? `text-white` : `text-black`
            }`}
            style={{ backgroundColor: theme.background }}
        >
            <header className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a href="/" className="flex title-font font-medium items-center mb-4 md:mb-0">
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
                    <h1 className="text-xl tracking-wide">Wallpaper Fake Code</h1>
                </a>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <a
                        href={twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center mr-2 opacity-80 hover:opacity-100"
                    >
                        <svg width="20" height="20" fill="currentColor" className="mr-2">
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                        </svg>
                        <p>Share on Twitter</p>
                    </a>
                </nav>
            </header>
            <main className="flex-grow mt-8">
                <ActionButtons theme={theme} setTheme={setTheme} />
                <EditBackgroundColor theme={theme} setTheme={setTheme} />
                <section
                    className="container mx-auto flex items-center h-sm md:h-md lg:h-lg"
                    style={{ backgroundColor: theme.background }}
                >
                    <Wallpaper theme={theme} setTheme={setTheme} />
                </section>
            </main>
            <footer className="flex justify-center items-center flex-wrap flex-col my-4 md:flex-row">
                <p className="flex">
                    Made with
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 text-red-500 mx-1"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    by
                    <a
                        href="https://twitter.com/rmaximedev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mx-1 text-blue-600 hover:text-blue-700 font-semibold"
                    >
                        @rmaximedev
                    </a>
                </p>
                ¬
                <a
                    href="https://github.com/zyhou/wallpaper-fake-code"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mx-2 opacity-80 hover:opacity-100"
                >
                    <svg width="24" height="24" fill="currentColor" className="mr-2">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
                        ></path>
                    </svg>
                    <p>Source</p>
                </a>
            </footer>
        </div>
    );
}
