import Phaser from 'phaser';
import LetterTile from '../objects/LetterTile.js';
import imgLetterTile from '../../img/letter-tile.png';

const GRID_X = 15;
const GRID_Y = 15;
const GRID_WIDTH = 6;
const GRID_HEIGHT = 6;
const GRID_SPACE_X = 85;
const GRID_SPACE_Y = 85;

export default class Menu extends Phaser.Scene {

    preload() {

        this.load.spritesheet('letter-tile', imgLetterTile, { frameWidth: 85, frameHeight: 85, endFrame: 2 });
    }

    create() {

        for(let i = 0, l = GRID_WIDTH * GRID_HEIGHT; i < l; i++) {

            this.add.existing(new LetterTile(this, (i % GRID_WIDTH) * GRID_SPACE_X + GRID_X, Math.floor(i / GRID_HEIGHT) * GRID_SPACE_Y + GRID_Y));
        }
    }
}