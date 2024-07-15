const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const crypto = require("crypto");

// You can use print statements as follows for debugging, they'll be visible when running tests.
// console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
const command = process.argv[2];
const blob_sha = process.argv[process.argv.length - 1];
const writeCommand = process.argv[4];

switch (command) {
    case "init":
        createGitDirectory();
        break;
    case "cat-file":
        readBlob();
        break;
    case "hash-object":
        hashObject();
        break;
    default:
        throw new Error(`Unknown command ${command}`);
}

function createGitDirectory() {
    fs.mkdirSync(path.join(process.cwd(), ".git"), { recursive: true });
    fs.mkdirSync(path.join(process.cwd(), ".git", "objects"), { recursive: true });
    fs.mkdirSync(path.join(process.cwd(), ".git", "refs"), { recursive: true });

    fs.writeFileSync(path.join(process.cwd(), ".git", "HEAD"), "ref: refs/heads/main\n");
    console.log("Initialized git directory");
}


function readBlob() {
    const blob_data = fs.readFileSync(path.join(process.cwd(), ".git", "objects", blob_sha.slice(0, 2), blob_sha.slice(2)));
    const descompressed_data = zlib.inflateSync(blob_data);
    process.stdout.write(descompressed_data.toString().split("\x00")[1]);
}

function hashObject(){
    
}