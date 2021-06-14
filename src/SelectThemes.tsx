import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

import type { Theme, Themes } from './types';

type Properties = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

export function SelectThemes({ theme, setTheme }: Properties): React.ReactElement {
    const location = useLocation();
    const navigate = useNavigate();
    const [themes, setThemes] = React.useState<Themes>([]);

    const setThemeAndNavigate = (theme: Theme) => {
        setTheme(theme);
        navigate(`/?theme=${theme.name}`);
    };

    React.useEffect(() => {
        async function getThemes() {
            import('./themes.json').then((importThemes) => {
                setThemes(importThemes.default);
            });
        }

        getThemes();
    }, []);

    React.useEffect(() => {
        const defaultTheme = new URLSearchParams(location.search).get('theme');
        if (!defaultTheme || !themes || themes.length === 0) {
            return;
        }

        const theme = themes.find((currentTheme) => currentTheme.name === defaultTheme);
        if (theme) {
            setTheme(theme);
        }
    }, [location, themes]);

    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const theme = themes.find((currentTheme) => currentTheme.name === event.target.value);
        if (theme) {
            setThemeAndNavigate(theme);
        }
    };

    const handleOnPrevTheme = () => {
        const themeIndex = themes.findIndex((currentTheme) => currentTheme.name === theme.name);
        if (themeIndex === -1) {
            return;
        }

        const prevThemeIndex = themeIndex - 1 < 0 ? themes.length - 1 : themeIndex - 1;
        setThemeAndNavigate(themes[prevThemeIndex]);
    };

    const handleOnNextTheme = () => {
        const themeIndex = themes.findIndex((currentTheme) => currentTheme.name === theme.name);
        if (themeIndex === -1) {
            return;
        }

        const nextThemeIndex = themeIndex + 1 < themes.length ? themeIndex + 1 : 0;
        setThemeAndNavigate(themes[nextThemeIndex]);
    };

    React.useEffect(() => {
        const handleUserKeyPress = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            if (key === 'j') {
                handleOnPrevTheme();
            } else if (key === 'k') {
                handleOnNextTheme();
            }
        };

        document.addEventListener('keydown', handleUserKeyPress);
        return () => {
            document.removeEventListener('keydown', handleUserKeyPress);
        };
    });

    const { ref } = useSwipeable({
        onSwipedLeft: handleOnNextTheme,
        onSwipedRight: handleOnPrevTheme,
    }) as { ref: React.RefCallback<Document> };

    React.useEffect(() => {
        ref(document);
    });

    return (
        <div className="font-medium flex justify-center text-white">
            <button
                onClick={handleOnPrevTheme}
                className="flex items-center rounded-l-md p-3 my-0.5 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700"
            >
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
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                Prev
            </button>
            <select
                className="cursor-pointer w-full bg-blue-500 hover:bg-blue-700"
                value={theme.name}
                onChange={handleOnChange}
            >
                {themes &&
                    themes.map((theme: Theme) => {
                        return (
                            <option key={theme.name} value={theme.name}>
                                {theme.name}
                            </option>
                        );
                    })}
            </select>
            <button
                onClick={handleOnNextTheme}
                className="flex items-center rounded-r-md p-3 my-0.5 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700"
            >
                Next
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
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </div>
    );
}
