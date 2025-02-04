import { program } from "commander";
import build from "../build.js";
import print from "../print.js";
import watch from "../watch.js";

export default function main() {
  program
    .command("build")
    .option("-c, --config <path>", "config path", "")
    .action(async (opts) => {
      await build(opts);
    });

  program
    .command("watch")
    .option("-c, --config <path>", "config path", "")
    .option("-p, --port <port>", "port", "3768")
    .option("-a, --api-server <addr>", "")
    .action(async (opts) => {
      opts.apiServer = opts.apiServer ?? opts["api-server"];
      await watch(opts);
    });

  program
    .command("print")
    .option("-c, --config <path>", "config path", "")
    .option("-p, --port <port>", "port", "3768")
    .option("-o, --output <path>", "output directory", "")
    .action(async (opts) => {
      await print(opts);
    });

  program.parse();
}
