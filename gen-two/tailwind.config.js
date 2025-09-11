/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
            },
            fontFamily: {
                sans: ["DM Sans", "sans-serif"],
                rubik: ["Rubik", "sans-serif"],
            },
        },
    },
};
