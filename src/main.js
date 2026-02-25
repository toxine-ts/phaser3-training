import Phaser from "./lib/phaser.js";
import { PreloadScene } from "./scenes/preload-scene.js";
import { BattleScene } from "./scenes/battle-scene.js";
import { SCENE_KEYS } from "./scenes/scene-keys.js";

// Set 'Kenney Future Narrow' as default font for all Phaser text objects
const originalSetStyle = Phaser.GameObjects.TextStyle.prototype.setStyle;
Phaser.GameObjects.TextStyle.prototype.setStyle = function (style, updateText, setDefaults) {
  if (!style) style = {};
  if (!style.fontFamily) {
    style.fontFamily = '"Kenney Future Narrow"';
  }
  return originalSetStyle.call(this, style, updateText, setDefaults);
};

const game = new Phaser.Game({
  type: Phaser.CANVAS,
  pixelArt: false,
  scale: {
    parent: "game-container",
    width: 1024,
    height: 576,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: "#000000",
  // scene: [PreloadScene, BattleScene]
})

game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
game.scene.add(SCENE_KEYS.BATTLE_SCENE, BattleScene);
game.scene.start(SCENE_KEYS.PRELOAD_SCENE);
