import Phaser from 'phaser';

export default class Menu extends Phaser.Scene {

    preload() {

    }

    create() {

        this.add.text(400, 250, "Word Nerd Play Scene");
    }
}