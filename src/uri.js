let uris = {};
uris.getLastPartOf = (uri) => {
    return uri.substring(uri.lastIndexOf('/') + 1);
}

uris.removeExtensionOf = (uri) => {
    return uri.substring(0, uri.lastIndexOf("."));
};

module.exports = uris;