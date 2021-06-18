import * as React from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { useLayer, Arrow } from 'react-laag';
import { colord } from 'colord';

import type { Theme } from './types';

type PropertiesBackgroundColorInput = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function BackgroundColorInput({
    theme,
    setTheme,
    isOpen,
    setOpen,
}: PropertiesBackgroundColorInput): React.ReactElement {
    function close() {
        setOpen(false);
    }

    const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
        isOpen,
        onOutsideClick: close,
        onDisappear: close,
        overflowContainer: false,
        placement: 'bottom-center',
        triggerOffset: 10,
    });

    const onChangeColor = (color: string) => {
        setTheme((currentTheme) => ({
            ...currentTheme,
            background: color,
            isDark: colord(color).isDark(),
        }));
    };

    return (
        <React.Fragment>
            <button
                className="w-8 h-8 cursor-pointer shadow-md rounded-lg border-2 border-blue-600 hover:border-blue-700 focus:outline-none"
                style={{ backgroundColor: theme.background }}
                onClick={() => setOpen((open) => !open)}
                {...triggerProps}
            />
            {renderLayer(
                <div>
                    {isOpen && (
                        <div {...layerProps}>
                            <HexColorPicker color={theme.background} onChange={onChangeColor} />
                            <div className="p-4 bg-gray-900 text-white rounded-b-lg">
                                <div className="text-center before:content-['#'] before:absolute before:pointer-events-none before:opacity-50 before:w-6 before:bottom-5">
                                    <HexColorInput
                                        color={theme.background}
                                        onChange={onChangeColor}
                                        className="w-24 p-1 bg-gray-900 border-gray-700 border rounded text-center"
                                    />
                                </div>
                            </div>
                            <Arrow {...arrowProps} backgroundColor="rgba(17, 24, 39, 1)" />
                        </div>
                    )}
                </div>,
            )}
        </React.Fragment>
    );
}

type Properties = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

export function EditBackgroundColor({ theme, setTheme }: Properties): React.ReactElement {
    const [isOpen, setOpen] = React.useState<boolean>(false);

    return (
        <section className="container hidden flex-row justify-center items-center mx-auto md:flex">
            <div className="opacity-80 hover:opacity-100 flex items-center">
                <button
                    className="cursor-pointer text-lg focus:outline-none"
                    onClick={() => setOpen(true)}
                >
                    Click to edit background
                </button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mx-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                </svg>
            </div>
            <BackgroundColorInput
                theme={theme}
                setTheme={setTheme}
                isOpen={isOpen}
                setOpen={setOpen}
            />
        </section>
    );
}
