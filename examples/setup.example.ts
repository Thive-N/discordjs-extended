import { ExtendedClient } from '../src/types/extendedClient';

const client = new ExtendedClient('token', {});

client.cogManager.loadCogs(['examplecommandcog', 'exampleeventcog', 'exampleslashcommandcog']);

client.login();
