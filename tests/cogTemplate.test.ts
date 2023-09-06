import { assert } from 'chai';
import { test } from 'mocha';

import { command } from '../src/types/CogTemplate';

test('command', () => {
    const command: command = {
        cogType: 'command',
        name: 'test',
        description: 'test',
        execute: async () => {},
    };

    assert.equal(command.cogType, 'command');
    assert.equal(command.name, 'test');
    assert.equal(command.description, 'test');

    assert.typeOf(command.execute, 'function');
    assert.typeOf(command.description, 'string');
    assert.typeOf(command.name, 'string');
    assert.typeOf(command.cogType, 'string');
});
