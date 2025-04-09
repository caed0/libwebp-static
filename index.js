const path = require("path");
const fs = require("fs");

const platform = process.platform;
const arch = process.arch;
const binaryPath = path.join(__dirname, "binaries", platform, arch, "bin");
const binaries = {};

if (fs.existsSync(binaryPath)) {
    const files = fs.readdirSync(binaryPath);
    files.forEach(file => { binaries[file.split('.')[0]] = path.join(binaryPath, file); });
} else {
    console.error(`Prebuilt binary for ${platform}-${arch} not found!`);
    process.exit(1);
}

module.exports = binaries;






