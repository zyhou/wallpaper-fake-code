module.exports = {
    mode: 'jit',
    purge: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            height: {
                md: '400px',
                lg: '600px',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
};
