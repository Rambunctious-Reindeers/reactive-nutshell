const remoteURL = "http://localhost:5002"

export default {

    get(page, id) {
        return fetch(`${remoteURL}/${page}/${id}`)
            .then(r => r.json())
    },
    getAll(page) {
        return fetch(`${remoteURL}/${page}`)
            .then(r => r.json())
    },
    post(page, newItem) {
        return fetch(`${remoteURL}/${page}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        }).then(data => data.json())
    },
    put(page, id, updatedItem) {
        return fetch(`${remoteURL}/${page}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedItem)
        }).then(data => data.json())
    },
    delete(page, id) {
        return fetch(`${remoteURL}/${page}/${id}`, {
            method: "DELETE",
        }).then(data => data.json())
    },
    patch(page, id, changedItem) {
        return fetch(`${remoteURL}/${page}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(changedItem)
        }).then(data => data.json())
    }
}