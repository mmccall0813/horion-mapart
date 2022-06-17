// browser javascript, using browserify imports for prismarine-nbt

const { Buffer } = require('buffer')
const prismarineNbt = require('prismarine-nbt');

// we are importing java edition schematics, but we need bedrock edition blocks, so we have a map of java blocks to bedrock blocks
// thank you so much github copilot for making this easy to do
const javaToBedrock = {
    'minecraft:white_concrete': 'minecraft:concrete 0', // white concrete
    'minecraft:orange_concrete': 'minecraft:concrete 1', // orange concrete
    'minecraft:magenta_concrete': 'minecraft:concrete 2', // magenta concrete
    'minecraft:light_blue_concrete': 'minecraft:concrete 3', // light blue concrete
    'minecraft:yellow_concrete': 'minecraft:concrete 4', // yellow concrete
    'minecraft:lime_concrete': 'minecraft:concrete 5', // lime concrete
    'minecraft:pink_concrete': 'minecraft:concrete 6', // pink concrete
    'minecraft:gray_concrete': 'minecraft:concrete 7', // gray concrete
    'minecraft:light_gray_concrete': 'minecraft:concrete 8', // light gray concrete
    'minecraft:cyan_concrete': 'minecraft:concrete 9', // cyan concrete
    'minecraft:purple_concrete': 'minecraft:concrete 10', // purple concrete
    'minecraft:blue_concrete': 'minecraft:concrete 11', // blue concrete
    'minecraft:brown_concrete': 'minecraft:concrete 12', // brown concrete
    'minecraft:green_concrete': 'minecraft:concrete 13', // green concrete
    'minecraft:red_concrete': 'minecraft:concrete 14', // red concrete
    'minecraft:black_concrete': 'minecraft:concrete 15', // black concrete
    // wool colors
    'minecraft:white_wool': 'minecraft:wool 0', // white wool
    'minecraft:orange_wool': 'minecraft:wool 1', // orange wool
    'minecraft:magenta_wool': 'minecraft:wool 2', // magenta wool
    'minecraft:light_blue_wool': 'minecraft:wool 3', // light blue wool
    'minecraft:yellow_wool': 'minecraft:wool 4', // yellow wool
    'minecraft:lime_wool': 'minecraft:wool 5', // lime wool
    'minecraft:pink_wool': 'minecraft:wool 6', // pink wool
    'minecraft:gray_wool': 'minecraft:wool 7', // gray wool
    'minecraft:light_gray_wool': 'minecraft:wool 8', // light gray wool
    'minecraft:cyan_wool': 'minecraft:wool 9', // cyan wool
    'minecraft:purple_wool': 'minecraft:wool 10', // purple wool
    'minecraft:blue_wool': 'minecraft:wool 11', // blue wool
    'minecraft:brown_wool': 'minecraft:wool 12', // brown wool
    'minecraft:green_wool': 'minecraft:wool 13', // green wool
    'minecraft:red_wool': 'minecraft:wool 14', // red wool
    'minecraft:black_wool': 'minecraft:wool 15', // black wool
    // terracotta colors
    'minecraft:white_terracotta': 'minecraft:stained_hardened_clay 0', // white terracotta
    'minecraft:orange_terracotta': 'minecraft:stained_hardened_clay 1', // orange terracotta
    'minecraft:magenta_terracotta': 'minecraft:stained_hardened_clay 2', // magenta terracotta
    'minecraft:light_blue_terracotta': 'minecraft:stained_hardened_clay 3', // light blue terracotta
    'minecraft:yellow_terracotta': 'minecraft:stained_hardened_clay 4', // yellow terracotta
    'minecraft:lime_terracotta': 'minecraft:stained_hardened_clay 5', // lime terracotta
    'minecraft:pink_terracotta': 'minecraft:stained_hardened_clay 6', // pink terracotta
    'minecraft:gray_terracotta': 'minecraft:stained_hardened_clay 7', // gray terracotta
    'minecraft:light_gray_terracotta': 'minecraft:stained_hardened_clay 8', // light gray terracotta
    'minecraft:cyan_terracotta': 'minecraft:stained_hardened_clay 9', // cyan terracotta
    'minecraft:purple_terracotta': 'minecraft:stained_hardened_clay 10', // purple terracotta
    'minecraft:blue_terracotta': 'minecraft:stained_hardened_clay 11', // blue terracotta
    'minecraft:brown_terracotta': 'minecraft:stained_hardened_clay 12', // brown terracotta
    'minecraft:green_terracotta': 'minecraft:stained_hardened_clay 13', // green terracotta
    'minecraft:red_terracotta': 'minecraft:stained_hardened_clay 14', // red terracotta
    'minecraft:black_terracotta': 'minecraft:stained_hardened_clay 15', // black terracotta
    // logs
    'minecraft:oak_log': 'minecraft:log 0', // oak logs
    'minecraft:spruce_log': 'minecraft:log 1', // spruce logs
    'minecraft:birch_log': 'minecraft:log 2', // birch logs
    'minecraft:jungle_log': 'minecraft:log 3', // jungle logs
    'minecraft:acacia_log': 'minecraft:log2', // acacia logs, for some very strange reason this is called log2, bedrock edition is weird
    'minecraft:dark_oak_log': 'minecraft:log2 1', // dark oak logs, bedrock weird
    // leaves
    'minecraft:oak_leaves': 'minecraft:leaves 0', // oak leaves
    'minecraft:spruce_leaves': 'minecraft:leaves 1', // spruce leaves
    'minecraft:birch_leaves': 'minecraft:leaves 2', // birch leaves
    'minecraft:jungle_leaves': 'minecraft:leaves 3', // jungle leaves
    'minecraft:acacia_leaves': 'minecraft:leaves2', // acacia leaves, leaves2??
    'minecraft:dark_oak_leaves': 'minecraft:leaves2 1', // dark oak leaves, leaves2??
    // planks
    'minecraft:oak_planks': 'minecraft:planks 0', // oak planks
    'minecraft:spruce_planks': 'minecraft:planks 1', // spruce planks
    'minecraft:birch_planks': 'minecraft:planks 2', // birch planks
    'minecraft:jungle_planks': 'minecraft:planks 3', // jungle planks
    'minecraft:acacia_planks': 'minecraft:planks 4', // acacia planks
    'minecraft:dark_oak_planks': 'minecraft:planks 5', // dark oak planks

    // other stuffs
    'minecraft:glow_lichen': 'minecraft:glow_lichen 1', // put it on the floor
    'minecraft:cobweb': 'minecraft:web', // cobweb
    'minecraft:grass_block': 'minecraft:grass' // grass block

}

function getBedrockBlock(block){
    return javaToBedrock[block] || block; // if it's not in the list, return the block as is
}

function distance(block1, block2){ // distance between two blocks, in blocks
    var x1 = block1[0];
    var y1 = block1[1];
    var z1 = block1[2];
    var x2 = block2[0];
    var y2 = block2[1];
    var z2 = block2[2];
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
} // will return a decimal if theres any diagonal distance, but that's fine

async function convert(file){
    const buffer = await file.arrayBuffer();
    const nbt = await prismarineNbt.parse(Buffer.from(buffer));
    const schem = nbt.parsed.value;

    console.log(schem);

    const textArea = document.getElementById('output');
    textArea.value = '';

    // Convert all blocks in the schematic to setblock and fill commands
    
    // Simple fill clumping algorithm
    // if the block is the same as the previous block, and the previous block is 1 block away, append the block to clump
    // if the block is not the same or is more than 1 block away, create a new clump, and append a fill command
    // if the clump is too big, create a new clump, and append a fill command
    // if the previous block is not the same and the clump is 1 block long, create a new clump, and append a setblock command

    let clumps = [];
    let clump = [];
    let maxClumpSize = 256;

    schem.blocks.value.value.forEach( (block, index) => {
        /*
        type Block = {
            pos: {
                type: 'int',
                value: [number, number, number]
            },
            state: {
                type: 'int',
                value: number // this number is an index into of the schem.palette.value.value array
            }
        }
        */
        const blockState = schem.palette.value.value[block.state.value].Name.value;
        // value value value blah blah blah
        const bedrockBlock = getBedrockBlock(blockState);
        const blockJSON = {
            pos: [block.pos.value[0], block.pos.value[1], block.pos.value[2]],
            block: bedrockBlock
        }
        if(clump.length > 0){
            if(clump.length > maxClumpSize){
                clumps.push(clump);
                clump = [];
            }
            if(distance(clump[clump.length - 1].pos, blockJSON.pos) > 1){
                clumps.push(clump);
                clump = [];
            }
            if(clump[clump.length - 1].block !== bedrockBlock){
                clumps.push(clump);
                clump = [];
            }
        }
        clump.push(blockJSON);
    });
    clumps.push(clump);

    let commands = [];

    // convert clumps to commands
    clumps.forEach( (clump) => {
        let command = '';
        if(clump.length > 1){
            command = 'fill ';
            
            let first = clump[0];
            let last = clump[clump.length - 1];

            command += '~' + first.pos[0] + ' ~' + first.pos[1] + ' ~' + first.pos[2] + ' ';
            command += '~' + last.pos[0] + ' ~' + last.pos[1] + ' ~' + last.pos[2] + ' ';
            command += first.block

            commands.push(command);
        }
        if(clump.length === 1){
            command = 'setblock ';
            command += '~' + clump[0].pos[0] + ' ~' + clump[0].pos[1] + ' ~' + clump[0].pos[2] + ' ';
            command += clump[0].block;
            commands.push(command);
        }
    })
    // save a little memory by removing the clumps array
    clumps = null;
    

    console.log(commands.length);
}