export type Theme = {
    name: string;
    background: string;
    red: string;
    brightRed: string;
    green: string;
    brightGreen: string;
    white: string;
    isDark: boolean;
};

export type Themes = Theme[];

export type Resolution = {
    width: number;
    height: number;
};
