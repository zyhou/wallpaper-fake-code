import React from 'react';

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
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

export function SelectThemes({ setTheme }: Properties): React.ReactElement {
    const [themes, setThemes] = React.useState<Themes>([]);

    React.useEffect(() => {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        async function getThemes() {
            import('./themes.json').then((importThemes) => {
                setThemes(importThemes.default);
            });
        }

        getThemes();
    }, []);

    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const theme = themes.find((theme) => theme.name === event.target.value);
        if (theme) {
            setTheme(theme);
        }
    };

    return (
        <div className="mt-12 mx-auto w-2/6 flex dark:text-white">
            <div className="font-medium pb-2 flex">
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
                Blend Mode
            </div>
            <select
                className="w-full form-select px-4 py-3 rounded-lg text-gray-900"
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
