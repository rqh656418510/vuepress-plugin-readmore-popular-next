import * as chalk from 'chalk';

export const logger = (msg, color = 'blue', label = 'READMORE PLUGIN') => {
    console.log(`\n${chalk.reset.inverse.bold[color](` ${label} `)} ${msg}`);
}