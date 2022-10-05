import {writable} from "svelte/store"

function Storage(key, defaultValue) {
    const stringValue = localStorage[key]
    const value = (stringValue === undefined)
        ? defaultValue
        : JSON.parse(stringValue)

    const store = writable(value)

    store.subscribe(
        (newValue) => {
            localStorage[key] = JSON.stringify(newValue)
        }
    )

    return store
}

export default Storage
