import { GatewayIntentBits } from 'discord.js';
import { ExtendedClient } from '../src/types/extendedClient';
import { assert } from 'chai';
import { test } from 'mocha';

const c = new ExtendedClient('invalid token', {
    intents: [GatewayIntentBits.MessageContent],
});

test('cogToPath', () => {
    assert.equal(c.cogManager.cogToPath('test'), './test.ts');
    assert.equal(c.cogManager.cogToPath('cogs.test'), './cogs/test.ts');
    assert.equal(c.cogManager.cogToPath('examples.cogs.commandcog'), './examples/cogs/commandcog.ts');
    assert.equal(c.cogManager.cogToPath('commandcog'), './commandcog.ts');
    assert.equal(c.cogManager.cogToPath('..'), './../.ts');
    assert.equal(c.cogManager.cogToPath('..test'), './../test.ts');
});

// test('loadCog', () => {
//     /**
//      * @todo line below has a lot of .'s
//      * this is due to the require stack being in node_modules/jasmine/bin
//      * need to find a way to get the require stack to be in the root of the project
//      */
//     c.cogManager.loadCog('............tests.commandcog');
//     assert.equal(c.commands.has('commandcog'), true);

//     c.cogManager.loadCog('............tests.slashcommandcog');
//     assert.equal(c.slashCommands.has('slashcommandcog'), true);
//     assert.equal(c.slashCommandsRaw.length, 1);
// });
