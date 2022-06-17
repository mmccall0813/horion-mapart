// browser javascript, using browserify imports for prismarine-nbt

const { Buffer } = require('buffer')
const prismarineNbt = require('prismarine-nbt');

fetch('test.nbt').then(response => response.arrayBuffer()).then(async arrayBuffer => {
    const nbt = await prismarineNbt.parse(Buffer.from(arrayBuffer));
    const simp = await prismarineNbt.simplify(nbt);
    console.log(simp);
});