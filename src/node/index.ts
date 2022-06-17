import { path } from "@vuepress/utils";
import type { Plugin } from "@vuepress/core";
import type { ReadmoreOptions } from "../shared";

export * from "../shared";

export const readmorePlugin = (options: ReadmoreOptions): Plugin =>
    (app) => ({
        name: "vuepress-plugin-readmore-popular2",

        define: {
            __READMORE_OPTIONS__: options
        },

        clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    });

export default readmorePlugin;