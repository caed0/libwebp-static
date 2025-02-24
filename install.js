const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");



const LIBWEBP_VERSION = "1.5.0";
const BASE_URL = `https://storage.googleapis.com/downloads.webmproject.org/releases/webp/`;

const PRECOMPILED_BINARIES = {
    "win32-x64": "windows-x64.zip",
    "linux-x64": "linux-x86-64.tar.gz",
    "linux-arm64": "linux-aarch64.tar.gz",
    "darwin-x64": "mac-x86-64.tar.gz",
    "darwin-arm64": "mac-arm64.tar.gz"
}

if (!fs.existsSync(path.join(__dirname, "binaries"))) fs.mkdirSync(path.join(__dirname, "binaries"));

for (const [key, value] of Object.entries(PRECOMPILED_BINARIES)) {
    const [platform, arch] = key.split("-");
    const file = `libwebp-${LIBWEBP_VERSION}-${value}`;
    const binaryUrl = `${BASE_URL}${file}`;

    try {
        if (!fs.existsSync(`binaries/${platform}`)) fs.mkdirSync(`binaries/${platform}`, { recursive: true });
        execSync(`curl -s -L ${binaryUrl} --output binaries/${file}`, { stdio: "inherit" });

        if (process.platform !== "win32" && file.endsWith(".zip"))
            execSync(`unzip -qo binaries/${file} -d binaries/${platform}`, { stdio: "inherit" });
        else execSync(`tar -xzf binaries/${file} -C binaries/${platform}`, { stdio: "inherit" });
        if (fs.existsSync(`binaries/${file}`)) fs.unlinkSync(`binaries/${file}`);

        const extractedDir = file.split(".").slice(0, 3).join(".");
        if (fs.existsSync(`binaries/${platform}/${extractedDir}`))
            fs.renameSync(`binaries/${platform}/${extractedDir}`, `binaries/${platform}/${arch}`);
    } catch (error) {
        if (fs.existsSync("binaries")) fs.rmdirSync("binaries", { recursive: true });
        console.error("Failed to download prebuilt binary:", error);
        process.exit(1);
    }
}