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
  assert.match(html, /Психолог Жанна Тарабанова — консультации онлайн/);
  assert.match(html, /<meta name="robots" content="index, follow" \/>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/jeanna-psy\.ru\/" \/>/);
  assert.ok(photo.size > 100_000);
});

test("build emits robots and sitemap files", async () => {
  const robots = await readFile(path.join(dist, "robots.txt"), "utf8");
  const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");

  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Sitemap: https:\/\/jeanna-psy\.ru\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/jeanna-psy\.ru\/<\/loc>/);
});

test("build emits github pages custom domain", async () => {
  const cname = await readFile(path.join(dist, "CNAME"), "utf8");

  assert.equal(cname.trim(), "jeanna-psy.ru");
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
