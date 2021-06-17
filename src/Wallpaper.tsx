import React from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { useLayer, Arrow } from 'react-laag';

import type { Theme } from './types';

type RectProperties = React.SVGProps<SVGRectElement> & {
    onChangeColor: (color: string) => void;
};

export function Rect({ onChangeColor, ...rectProps }: RectProperties): React.ReactElement {
    const [isOpen, setOpen] = React.useState<boolean>(false);
    function close() {
        setOpen(false);
    }

    const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
        isOpen,
        onOutsideClick: close,
        onDisappear: close,
        overflowContainer: false,
        auto: true,
        snap: true,
        triggerOffset: 10,
    });

    return (
        <React.Fragment>
            <rect
                {...rectProps}
                {...triggerProps}
                onClick={() => setOpen((open) => !open)}
                className="cursor-pointer pointer-events-none md:pointer-events-auto"
            />
            {renderLayer(
                <div>
                    {isOpen && (
                        <div {...layerProps}>
                            <HexColorPicker color={rectProps.fill} onChange={onChangeColor} />
                            <div className="p-4 bg-gray-900 text-white rounded-b-lg">
                                <div className="text-center before:content-['#'] before:absolute before:pointer-events-none before:opacity-50 before:w-6 before:bottom-5">
                                    <HexColorInput
                                        color={rectProps.fill}
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

export function Wallpaper({ theme, setTheme }: Properties): React.ReactElement {
    const onChange = (themeKey: keyof Theme) => (color: string) => {
        setTheme((currentTheme) => ({
            ...currentTheme,
            [themeKey]: color,
        }));
    };

    return (
        <React.Fragment>
            <div className="flex mx-auto w-4/5 lg:w-3/5 xl:2/5">
                <svg
                    id="wallpaper"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1000 400"
                    className="w-full"
                >
                    <Rect
                        onChangeColor={onChange('white')}
                        fill={theme.white}
                        x="0"
                        y="0"
                        width="17"
                        height="400"
                    />
                    <Rect
                        onChangeColor={onChange('red')}
                        fill={theme.red}
                        x="61"
                        y="0"
                        width="160"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('green')}
                        fill={theme.green}
                        x="242"
                        y="0"
                        width="290"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('brightRed')}
                        fill={theme.brightRed}
                        x="554"
                        y="0"
                        width="200"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('white')}
                        fill={theme.white}
                        x="776"
                        y="0"
                        width="20"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('brightGreen')}
                        fill={theme.brightGreen}
                        x="140"
                        y="56"
                        width="160"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('white')}
                        fill={theme.white}
                        x="320"
                        y="56"
                        width="436"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('red')}
                        fill={theme.red}
                        x="776"
                        y="56"
                        width="240"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('brightRed')}
                        fill={theme.brightRed}
                        x="140"
                        y="101"
                        width="160"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('green')}
                        fill={theme.green}
                        x="320"
                        y="101"
                        width="512"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('white')}
                        fill={theme.white}
                        x="855"
                        y="101"
                        width="20"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('red')}
                        fill={theme.red}
                        x="320"
                        y="146"
                        width="127"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('white')}
                        fill={theme.white}
                        x="469"
                        y="146"
                        width="162"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('brightGreen')}
                        fill={theme.brightGreen}
                        x="654"
                        y="146"
                        width="202"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('brightRed')}
                        fill={theme.brightRed}
                        x="320"
                        y="191"
                        width="436"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('white')}
                        fill={theme.white}
                        x="140"
                        y="230"
                        width="20"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('red')}
                        fill={theme.red}
                        x="140"
                        y="286"
                        width="127"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('brightGreen')}
                        fill={theme.brightGreen}
                        x="285"
                        y="286"
                        width="242"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('green')}
                        fill={theme.green}
                        x="140"
                        y="331"
                        width="127"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('red')}
                        fill={theme.red}
                        x="285"
                        y="331"
                        width="103"
                        height="24"
                    />
                    <Rect
                        onChangeColor={onChange('white')}
                        fill={theme.white}
                        x="61"
                        y="376"
                        width="20"
                        height="24"
                    />
                </svg>
            </div>
        </React.Fragment>
    );
}
