/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Detected from Mockups
                header: '#0B1C2D',      // Deep Navy Blue
                accent: '#C3B091',      // Khaki/Gold
                background: '#F5F6FA',  // Light Grey

                // Status Colors (Pills)
                status: {
                    pending: '#F59E0B',   // Yellow
                    investigation: '#3B82F6', // Blue
                    closed: '#10B981',    // Green
                },

                // Visibility Tags
                visibility: {
                    public: '#3B82F6',    // Blue
                    victim: '#F97316',    // Orange
                    private: '#EF4444',   // Red
                }
            },
            fontFamily: {
                sans: ['Inter', 'Roboto', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }
        },
    },
    plugins: [],
}
