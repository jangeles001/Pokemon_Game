import * as grpc from '@grpc/grpc-js';

export function getGameState() {
    const metadata = new grpc.Metadata();

    // 1. Regular ASCII string (no special suffix)
    metadata.set('authorization', 'Bearer my-token');

    // 2. Binary data (must end in -bin)
    const binaryData = Buffer.from([0x01, 0x02, 0x03]);
    metadata.set('session-token-bin', binaryData); 

    // Use it in a call
    client.sayHello({ name: 'World' }, metadata, (err, response) => {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('Greeting:', response.message);
        }
});

}