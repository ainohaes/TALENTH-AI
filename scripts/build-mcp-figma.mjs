import { access, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const socketEntry = new URL(
  "../node_modules/@sethdouglasford/mcp-figma/dist/socket.js",
  import.meta.url,
);

try {
  await access(fileURLToPath(socketEntry));
} catch (error) {
  throw new Error(
    "MCP Figma is not installed. Run `npm install` from the workspace root first.",
    { cause: error },
  );
}

const outputDirectory = new URL("../dist/", import.meta.url);
await mkdir(outputDirectory, { recursive: true });

await writeFile(
  new URL("socket.js", outputDirectory),
  `console.log = ((log) => (...args) => {
  log(...args);
  const message = args.find((value) =>
    typeof value === "string" && value.includes("WebSocket server running on port")
  );
  if (message) log(message.replace("running on port", "listening on port"));
})(console.log.bind(console));

await import("../node_modules/@sethdouglasford/mcp-figma/dist/socket.js");
`,
);
