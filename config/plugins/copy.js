import fs from "fs-extra"
import path from "path"

export default (from, to) => ({
    buildEnd: (error) => {
        if (error !== undefined) {
            return
        }

        const source = path.resolve(from)
        const destination = path.resolve(to)

        if (fs.pathExistsSync(source) === false) {
            console.log("Skip copying files, source not found.")
            return
        }

        fs.ensureDirSync(destination)
        fs.copySync(source, destination)
    },
})
