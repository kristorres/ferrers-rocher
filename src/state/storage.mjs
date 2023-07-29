import store from "@axel669/json-storage"
import {writable} from "svelte/store"

const local = store(localStorage)

const Storage = (key, defaultValue) => {
    const store = writable(local[key] ?? defaultValue)

    store.subscribe(
        (newValue) => {
            local[key] = newValue
        }
    )

    return store
}

export default Storage
