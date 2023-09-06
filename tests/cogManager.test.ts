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

test('loadCog', () => {
    /**
     * @todo line below has a lot of .'s
     * this is due to the require stack being in node_modules/jasmine/bin
     * need to find a way to get the require stack to be in the root of the project
     */
    c.cogManager.loadCog('............tests.testcogs.commandcog');
    assert.equal(c.commands.has('commandcog'), true);

    c.cogManager.loadCog('............tests.testcogs.slashcommandcog');
    assert.equal(c.slashCommands.has('slashcommandcog'), true);
    assert.equal(c.slashCommandsRaw.length, 1);

    c.cogManager.loadCog('............tests.testcogs.eventcog');
    assert.equal(c.events.has('eventcog'), true);
});

test('loadCogs', () => {
    const c_new = new ExtendedClient('invalid token', {
        intents: [GatewayIntentBits.MessageContent],
    });

    c_new.cogManager.loadCogs([
        '............tests.testcogs.commandcog',
        '............tests.testcogs.slashcommandcog',
        '............tests.testcogs.eventcog',
    ]);
    assert.equal(c_new.commands.has('commandcog'), true);
    assert.equal(c_new.slashCommands.has('slashcommandcog'), true);
    assert.equal(c_new.slashCommandsRaw.length, 1);
    assert.equal(c_new.events.has('eventcog'), true);
});

test('loadCogs with invalid cog', () => {
    assert.throws(
        () => {
            c.cogManager.loadCogs(['............tests.testcogs.invalidcommandcog']);
        },
        Error,
        'Cog ............tests.testcogs.invalidcommandcog does not export a Cog object',
    );
});
