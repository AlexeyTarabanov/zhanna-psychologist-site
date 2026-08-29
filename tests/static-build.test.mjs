import assert from "node:assert/strict";
import { access, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = path.join(root, "dist");

async function readCssTree(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const contents = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return readCssTree(entryPath);
      }
      return entry.name.endsWith(".css") ? readFile(entryPath, "utf8") : "";
    }),
  );
  return contents.join("\n");
}

async function readJsTree(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const contents = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return readJsTree(entryPath);
      }
      return entry.name.endsWith(".js") ? readFile(entryPath, "utf8") : "";
    }),
  );
  return contents.join("\n");
}

test("build emits static site shell and public photo", async () => {
  const html = await readFile(path.join(dist, "index.html"), "utf8");
  const photo = await stat(path.join(dist, "zhanna.jpg"));

  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /Жанна Тарабанова — психолог/);
  assert.ok(photo.size > 100_000);
});

test("build includes the expected visual styles", async () => {
  const css = await readCssTree(path.join(dist, "assets"));

  assert.match(css, /\.hero\b/);
  assert.match(css, /\.portrait\b/);
  assert.match(css, /\.price-card\b/);
  assert.match(css, /#a81760/);
});

test("telegram links point to Jeanna_T", async () => {
  const js = await readJsTree(path.join(dist, "assets"));

  assert.match(js, /https:\/\/t\.me\/Jeanna_T/);
  assert.doesNotMatch(js, /t\.me\/(?!Jeanna_T)/);
});

test("nginx config is present for docker image", async () => {
  await access(path.join(root, "deploy", "nginx.conf"));
});
