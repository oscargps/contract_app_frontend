

type Props = {
    method: any
    url: string,
    body?: any
    headers?: Record<string, string>
}


export const RequestService = async (props: Props) => {
    const { url, body, headers, method } = props
    return fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
    })
        .then(response =>
            response.json()
        )
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}