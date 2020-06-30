import { desc, run, sh, task } from "https://deno.land/x/drake@v1.2.4/mod.ts";
import { join } from "https://deno.land/std@0.59.0/path/mod.ts";

desc("Cache dependencies");
task("cache", [], async function () {
  const deps = join("src", "deps.ts");
  await sh(`deno cache --lock-write --lock=lock.json ${deps}`);
});

desc("Run API");
task("start", [], async function () {
  const deps = join("src", "mod.ts");
  await sh(
    `PORT=8000 deno run --lock=lock.json --allow-env --allow-read --allow-net ${deps}`,
  );
});

desc("Run API with Denon");
task("denon", [], async function () {
  const deps = join("src", "mod.ts");
  await sh(
    `PORT=8000 denon run --lock=lock.json --allow-env --allow-read --allow-net ${deps}`,
  );
});

desc("Install denon for development");
task("denon-install", [], async function () {
  await sh(
    "deno install -Af --unstable https://deno.land/x/denon@v2.2.0/denon.ts",
  );
});

run();
