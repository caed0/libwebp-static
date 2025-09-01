/**
 * @fileoverview Installation script for libwebp-static
 * 
 * This script downloads and extracts precompiled WebP binaries for the current
 * platform during package installation. It fetches official WebP releases
 * from Google's storage and organizes them in a platform-specific directory structure.
 * 
 * @author caed0
 * @version 1.0.2
 * @license GPL-3.0-or-later
 */

const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

/**
 * Version of libwebp binaries to download
 * @constant {string}
 */
const LIBWEBP_VERSION = "1.5.0";

/**
 * Base URL for official WebP releases
 * @constant {string}
 */
const BASE_URL = `https://storage.googleapis.com/downloads.webmproject.org/releases/webp/`;

/**
 * Mapping of platform-architecture combinations to their respective binary archives
 * 
 * @constant {Object.<string, string>}
 * @property {string} win32-x64 - Windows 64-bit archive
 * @property {string} linux-x64 - Linux x86_64 archive  
 * @property {string} linux-arm64 - Linux ARM64 archive
 * @property {string} darwin-x64 - macOS Intel archive
 * @property {string} darwin-arm64 - macOS Apple Silicon archive
 */
const PRECOMPILED_BINARIES = {
    "win32-x64": "windows-x64.zip",
    "linux-x64": "linux-x86-64.tar.gz",
    "linux-arm64": "linux-aarch64.tar.gz",
    "darwin-x64": "mac-x86-64.tar.gz",
    "darwin-arm64": "mac-arm64.tar.gz"
}

/**
 * Create the binaries directory if it doesn't exist
 */
if (!fs.existsSync(path.join(__dirname, "binaries"))) {
    fs.mkdirSync(path.join(__dirname, "binaries"));
    console.log("Created binaries directory");
}

/**
 * Download and extract binaries for each supported platform
 */
console.log(`Downloading libwebp ${LIBWEBP_VERSION} binaries...`);

for (const [key, value] of Object.entries(PRECOMPILED_BINARIES)) {
    const [platform, arch] = key.split("-");
    const file = `libwebp-${LIBWEBP_VERSION}-${value}`;
    const binaryUrl = `${BASE_URL}${file}`;

    console.log(`Processing ${platform}-${arch}...`);

    try {
        // Create platform directory structure
        if (!fs.existsSync(`binaries/${platform}`)) {
            fs.mkdirSync(`binaries/${platform}`, { recursive: true });
        }

        // Download the binary archive
        console.log(`  Downloading from: ${binaryUrl}`);
        execSync(`curl -s -L ${binaryUrl} --output binaries/${file}`, { stdio: "inherit" });

        // Extract the archive based on file type and platform
        console.log(`  Extracting ${file}...`);
        if (process.platform !== "win32" && file.endsWith(".zip")) {
            // Use unzip for ZIP files on non-Windows platforms
            execSync(`unzip -qo binaries/${file} -d binaries/${platform}`, { stdio: "inherit" });
        } else {
            // Use tar for .tar.gz files and ZIP files on Windows
            execSync(`tar -xzf binaries/${file} -C binaries/${platform}`, { stdio: "inherit" });
        }

        // Clean up the downloaded archive
        if (fs.existsSync(`binaries/${file}`)) {
            fs.unlinkSync(`binaries/${file}`);
        }

        // Rename extracted directory to match architecture name
        const extractedDir = file.split(".").slice(0, 3).join(".");
        const extractedPath = `binaries/${platform}/${extractedDir}`;
        const targetPath = `binaries/${platform}/${arch}`;
        
        if (fs.existsSync(extractedPath)) {
            fs.renameSync(extractedPath, targetPath);
            console.log(`  ✓ Successfully extracted to ${targetPath}`);
        }

    } catch (error) {
        // Clean up on error and exit
        console.error(`✗ Failed to process ${platform}-${arch}:`, error.message);
        
        if (fs.existsSync("binaries")) {
            fs.rmSync("binaries", { recursive: true, force: true });
        }
        
        console.error("\nInstallation failed. Please check:");
        console.error("1. Internet connection is available");
        console.error("2. curl command is installed");
        console.error("3. tar/unzip utilities are available");
        console.error("4. Write permissions in the package directory");
        
        process.exit(1);
    }
}

console.log("✓ All binaries downloaded and extracted successfully!");
console.log(`✓ libwebp-static v${LIBWEBP_VERSION} installation complete`);

/**
 * Verify installation by checking if binaries exist for the current platform
 */
const currentPlatform = process.platform;
const currentArch = process.arch;
const platformKey = `${currentPlatform}-${currentArch}`;

if (PRECOMPILED_BINARIES[platformKey]) {
    const binaryPath = path.join(__dirname, "binaries", currentPlatform, currentArch, "bin");
    if (fs.existsSync(binaryPath)) {
        const binaries = fs.readdirSync(binaryPath);
        console.log(`✓ Found ${binaries.length} tools for ${platformKey}: ${binaries.join(', ')}`);
    } else {
        console.warn(`⚠ Warning: Binary directory not found for current platform (${platformKey})`);
    }
} else {
    console.warn(`⚠ Warning: Current platform (${platformKey}) is not officially supported`);
    console.warn("Available platforms:", Object.keys(PRECOMPILED_BINARIES).join(', '));
}