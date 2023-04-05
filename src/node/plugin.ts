import type { Plugin } from "@vuepress/core";
import { path, getDirname } from "@vuepress/utils";

import { info } from './utils.js'
import type { ReadmoreOptions } from "../shared/index.js";

const __dirname = getDirname(import.meta.url);

export const readmorePlugin = (options: ReadmoreOptions): Plugin =>
    (app) => {
        info('running...');
        return {
            name: "vuepress-plugin-readmore-popular-next",

            define: {
                __READMORE_OPTIONS__: options
            },

            clientConfigFile: path.resolve(__dirname, '../client/config.js'),
        };
    };
