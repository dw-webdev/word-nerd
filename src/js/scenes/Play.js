import Phaser from 'phaser';
import LetterTile from '../objects/LetterTile.js';
import imgLetterTile from '../../img/letter-tile.png';

const GRID_X = 15;
const GRID_Y = 15;
const GRID_WIDTH = 6;
const GRID_HEIGHT = 6;
const GRID_SPACE_X = 85;
const GRID_SPACE_Y = 85;

export default class Play extends Phaser.Scene {

    preload() {

        this.load.spritesheet('letter-tile', imgLetterTile, { frameWidth: 85, frameHeight: 85, endFrame: 4 });
    }

    create() {

        this.tiles = [];
        for(let i = 0, l = GRID_WIDTH * GRID_HEIGHT; i < l; i++) {

            this.tiles[i] = new LetterTile(this, (i % GRID_WIDTH) * GRID_SPACE_X + GRID_X, Math.floor(i / GRID_HEIGHT) * GRID_SPACE_Y + GRID_Y, i);
            this.add.existing(this.tiles[i]);
        }
    }

    update(time, delta) {

        this.tiles.forEach(tile => tile.update(time, delta));
    }
}