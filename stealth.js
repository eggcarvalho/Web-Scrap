// navigator.webdriver
Object.defineProperty(navigator, "webdriver", {
    get: () => false,
});

// chrome.runtime
window.chrome = {
    runtime: {},
};

// languages
Object.defineProperty(navigator, "languages", {
    get: () => ["pt-BR", "pt", "en-US", "en"],
});

// plugins
Object.defineProperty(navigator, "plugins", {
    get: () => [1, 2, 3, 4, 5],
});

// permissions
const originalQuery = window.navigator.permissions.query;
window.navigator.permissions.query = (parameters) =>
    parameters.name === "notifications"
        ? Promise.resolve({ state: Notification.permission })
        : originalQuery(parameters);

// WebGL fingerprint
const getParameter = WebGLRenderingContext.prototype.getParameter;
WebGLRenderingContext.prototype.getParameter = function (parameter) {
    if (parameter === 37445) return "Intel Inc.";
    if (parameter === 37446) return "Intel Iris OpenGL Engine";
    return getParameter.call(this, parameter);
};
