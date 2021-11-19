function getParams() {
    // Get params from current url
    const paramString = window.location.search.replace('?', '')
    if (paramString != '') {
        let paramObj = {};
        paramString.split('&').forEach(param => {
            let split = param.split('=');
            paramObj[split[0]] = split[1];
        });
        return paramObj;
    } else {
        return null;
    }
}