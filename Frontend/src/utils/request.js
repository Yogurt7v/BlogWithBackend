export function request(url, method, data) {
    return fetch(url, {
        method: method || "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: data? JSON.stringify(data): undefined,
    }).then((res) => res.json());
}