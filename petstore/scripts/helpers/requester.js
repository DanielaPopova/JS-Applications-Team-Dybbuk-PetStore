function request(url, type, options, headers) {
    const promise = new Promise((resolve, reject) => $.ajax({
        url,
        type,
        headers,
        options,
        success: resolve,
        error: reject
    }));
}

export function get(url) {
    return request(url, 'GET', {}, {});
}

export function post(url) {
    return request(url, 'POST', {}, {});
}