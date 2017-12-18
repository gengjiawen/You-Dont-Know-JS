const fs = require("fs")
const { exec } = require("child_process")

const isDirectory = d => fs.lstatSync(d).isDirectory()
const isHide = f => f.startsWith(".")

const cwd = process.cwd()

fs.readdirSync("./").filter(f => isDirectory(f) && !isHide(f)).forEach(f => {
    console.log(f)
    process.chdir(cwd)
    process.chdir(f)
    fs.copyFileSync("README.md", "Summary.md")
    fs.writeFileSync("book.json", JSON.stringify({title: f}))
    const cmd = `gitbook epub ./ "../${f}.epub"`
    exec(cmd)
})