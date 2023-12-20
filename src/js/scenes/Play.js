import Phaser from 'phaser';
import LetterTile from '../objects/LetterTile.js';
import imgLetterTile from '../../img/letter-tile.png';
import dictionary from '../../data/dictionary.json';

const GRID_X = 15;
const GRID_Y = 165;
const GRID_WIDTH = 6;
const GRID_HEIGHT = 6;
const GRID_SPACE_X = 85;
const GRID_SPACE_Y = 85;

const MIN_WORD_LENGTH = 5;

export default class Play extends Phaser.Scene {

    preload() {

        this.load.spritesheet('letter-tile', imgLetterTile, { frameWidth: 85, frameHeight: 85, endFrame: 4 });
        this.load.json('dictionary', dictionary);
    }

    create() {

        this.word = this.add.text(270, 20, "", { font: ' 60px "Courier New", monospace' });
        this.word.setOrigin(0.5, 0);

        this.buttonClear = this.add.text(540, 0, "X", { font: ' 32px "Courier New", monospace' });
        this.buttonClear.setOrigin(1, 0);
        this.buttonClear.setInteractive();
        this.buttonClear.on('pointerdown', this.clearWord.bind(this));

        this.result = this.add.text(270, 100, "Must be at least 5 letters", { font: ' 32px "Courier New", monospace' });
        this.result.setOrigin(0.5, 0);

        this.tiles = [];
        for(let i = 0, l = GRID_WIDTH * GRID_HEIGHT; i < l; i++) {

            this.tiles[i] = new LetterTile(this, (i % GRID_WIDTH) * GRID_SPACE_X + GRID_X, Math.floor(i / GRID_HEIGHT) * GRID_SPACE_Y + GRID_Y, this.clickTile.bind(this), this.onTimeout.bind(this));
            this.add.existing(this.tiles[i]);
        }
    }

    update(time, delta) {

        this.tiles.forEach(tile => tile.update(time, delta));
    }

    clickTile(letter) {

        this.word.text += letter;

        if(this.word.text.length < MIN_WORD_LENGTH) {
            this.result.text = "Must be at least 5 letters";
        }
        else {
            const valid = this.checkWord(this.word.text);
            this.result.text = valid ? "Valid" : "Invalid";
        }
    }

    checkWord(word) {

        if(word.length < MIN_WORD_LENGTH) return false;

        let dict = this.cache.json.get('dictionary');

       if(!dict[word.charAt(0)]) return false;
       if(!dict[word.charAt(0)][word.charAt(1)]) return false;
       if(!dict[word.charAt(0)][word.charAt(1)][word.charAt(2)]) return false;

       return dict[word.charAt(0)][word.charAt(1)][word.charAt(2)].includes(word);
    }

    clearWord() {

        this.tiles.forEach(tile => tile.deselect());
        this.word.text = "";
        this.result.text = "Must be at least 5 letters";
    }

    onTimeout() {

        console.log('timeout');

        this.clearWord();
    }
}