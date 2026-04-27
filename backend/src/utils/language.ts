const extensionMap: Record<string, string> = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  py: "python",
  java: "java",
  rb: "ruby",
  go: "go",
  rs: "rust",
  php: "php",
  cs: "csharp",
  cpp: "cpp",
  c: "c",
  json: "json",
  md: "markdown",
  yml: "yaml",
  yaml: "yaml",
  html: "html",
  css: "css",
  scss: "scss",
};

export function detectLanguage(fileName = "", content = "") {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (extension && extensionMap[extension]) {
    return extensionMap[extension];
  }

  if (content.includes("import React") || content.includes("export default")) {
    return "typescript";
  }

  return "plaintext";
}
