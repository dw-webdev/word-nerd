import Phaser from 'phaser';
import LetterTile from '../objects/LetterTile.js';

const GRID_X = 20;
const GRID_Y = 20;
const GRID_WIDTH = 6;
const GRID_HEIGHT = 6;
const GRID_SPACE_X = 85;
const GRID_SPACE_Y = 85;

export default class Menu extends Phaser.Scene {

    preload() {

    }

    create() {

        for(let i = 0, l = GRID_WIDTH * GRID_HEIGHT; i < l; i++) {

            this.add.existing(new LetterTile(this, (i % GRID_WIDTH) * GRID_SPACE_X + GRID_X, Math.floor(i / GRID_HEIGHT) * GRID_SPACE_Y + GRID_Y));
        }
    }
}