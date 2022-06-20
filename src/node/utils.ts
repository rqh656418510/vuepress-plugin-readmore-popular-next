import * as chalk from 'chalk';

export const logger = (msg, color = 'white', bgColor = 'bgBlue', label = 'READMORE PLUGIN') => {
    console.log(`${chalk.reset.bold[color][bgColor](` ${label} `)} ${msg}`);
}