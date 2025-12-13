import "./bootstrap";
import "../css/app.css";
import { route } from 'ziggy-js';

window.route = route;

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        // Passando a função route globalmente não é estritamente necessário se usar @routes no blade, 
        // mas ajuda se quisermos usar 'route' importado ou customizado.
        // O @routes no blade já injeta window.Ziggy.
        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
