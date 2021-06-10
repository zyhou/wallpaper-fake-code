import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type Theme = {
    name: string;
    background: string;
    red: string;
    brightRed: string;
    green: string;
    brightGreen: string;
    white: string;
};

export type Themes = Theme[];

type Properties = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

export function SelectThemes({ theme, setTheme }: Properties): React.ReactElement {
    const location = useLocation();
    const navigate = useNavigate();
    const [themes, setThemes] = React.useState<Themes>([]);

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

        const theme = themes.find((theme) => theme.name === defaultTheme);
        if (theme) {
            setTheme(theme);
        }
    }, [location, themes]);

    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const theme = themes.find((theme) => theme.name === event.target.value);
        if (theme) {
            setTheme(theme);
            navigate(`/?theme=${theme.name}`);
        }
    };

    return (
        <div className="flex">
            <div className="font-medium flex items-center pr-2">
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
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                </svg>
                Themes
            </div>
            <select
                className="form-select cursor-pointer px-4 py-3 rounded-lg text-gray-700 font-medium border border-gray-600 hover:border-gray-800"
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
        </div>
    );
}
