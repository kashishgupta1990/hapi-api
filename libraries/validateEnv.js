module.exports = exports = ()=> {
    var envRequiredVariables = [
        "ENV_NAME",
        "PORT",
        "ALLOW_CROSS_DOMAIN",
        "MONGODB_URL",
        "MONGODB_POOL_SIZE",
        "MONGODB_RECONNECT_DELAY",
        "JWT_KEY",
        "GMAIL_CLIENT_ID",
        "GMAIL_PROJECT_ID",
        "GMAIL_AUTH_URL",
        "GMAIL_TOKEN_URL",
        "GMAIL_AUTH_PROVIDER_X509_CERT_URL",
        "GMAIL_CLIENT_SECRET",
        "GMAIL_REDIRECT_URIS_INDEX1",
        "GMAIL_REDIRECT_URIS_INDEX2"
    ];
    envRequiredVariables.forEach((variable)=> {
        if (!process.env[variable]) {
            throw "Error: " + variable + " Environment Variable Is Required."
        }
    });
};