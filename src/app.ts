'use strict';



console.log("WIP: this shit does'nt work at all")
process.exit(1)



import dotenv = require('dotenv');
import * as fs from 'fs';

import { MegaOpClient } from './base';
import { checker } from './util/envLinter';
import C = require('./util/configRewrapper');


if (!fs.existsSync('src/.env') && fs.existsSync('src/.env.example')) {
    console.warn('You forgot renaming the file .env.example to .env. Exiting now.');
    process.exit(1);
}

if (process.env.CI) {
    dotenv.config({
        path: 'src/.env.test'
    });
} else {
    dotenv.config({
        path: 'src/.env'
    });
    checker();
}


const bot: MegaOpClient = new MegaOpClient();
bot.start(C.discord.token);
