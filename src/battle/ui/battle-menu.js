import { MONSTER_ASSET_KEYS } from "../../assets/assets-keys.js";

const BATTLE_MENU_ACTIONS = Object.freeze({
  FIGHT: "FIGHT",
  SWITCH: "SWITCH",
  ITEM: "ITEM",
  FLEE: "FLEE",
});

const BATTLE_MENU_OPTIONS = [
  { action: BATTLE_MENU_ACTIONS.FIGHT, x: 55, y: 22 },
  { action: BATTLE_MENU_ACTIONS.SWITCH, x: 240, y: 22 },
  { action: BATTLE_MENU_ACTIONS.ITEM, x: 55, y: 70 },
  { action: BATTLE_MENU_ACTIONS.FLEE, x: 240, y: 70 },
];

const ATTACK_MENU_OPTIONS = [
  { action: "slash", x: 55, y: 22 },
  { action: "super slash", x: 240, y: 22 },
  { action: "boule", x: 55, y: 70 },
  { action: "etc", x: 240, y: 70 },
];

const battleUiStyle = {
  color: "#000000",
  fontSize: "24px",
};

export class BattleMenu {
  /** @type {Phaser.Scene} */
  #scene;
  /** @type {Phaser.GameObjects.Container} */
  #mainBattleMenuPhaserContainerGameObject;
  /** @type {Phaser.GameObjects.Container} */
  #moveSelectionPhaserContainerGameObject;
  /** @type {Phaser.GameObjects.Text} */
  #battleTextGameObjectLine1;
  /** @type {Phaser.GameObjects.Text} */
  #battleTextGameObjectLine2;

  /** @param {Phaser.Scene} scene */
  constructor(scene) {
    this.#scene = scene;
    this.#createMainInfosPane();
    this.#createMainBattleMenu();
    this.#createMonsterAttackSubMenu();
  }

  showMainBattleMenu() {
    this.#mainBattleMenuPhaserContainerGameObject.setAlpha(1);
    this.#battleTextGameObjectLine1.setAlpha(1);
    this.#battleTextGameObjectLine2.setAlpha(1);
  }
  hideMainBattleMenu() {
    this.#mainBattleMenuPhaserContainerGameObject.setAlpha(0);
    this.#battleTextGameObjectLine1.setAlpha(0);
    this.#battleTextGameObjectLine2.setAlpha(0);
  }

  showMonsterAttackSubMenu() {
    this.#moveSelectionPhaserContainerGameObject.setAlpha(1);
  }
  hideMonsterAttackSubMenu() {
    this.#moveSelectionPhaserContainerGameObject.setAlpha(0);
  }

  #createMainBattleMenu() {
    this.#battleTextGameObjectLine1 = this.#scene.add.text(
      20,
      468,
      "What should",
      battleUiStyle
    );
    this.#battleTextGameObjectLine2 = this.#scene.add.text(
      20,
      512,
      `${MONSTER_ASSET_KEYS.IGUANIGNITE} do next ?`,
      battleUiStyle
    );
    this.#mainBattleMenuPhaserContainerGameObject = this.#scene.add.container(
      520,
      448,
      [
        this.#createSubInfosPanel(),
        ...this.#renderBattlePanelText(BATTLE_MENU_OPTIONS),
      ]
    );
    this.hideMainBattleMenu();
  }

  #createMonsterAttackSubMenu() {
    this.#moveSelectionPhaserContainerGameObject = this.#scene.add.container(
      0,
      448,
      [...this.#renderBattlePanelText(ATTACK_MENU_OPTIONS)]
    );
    this.hideMonsterAttackSubMenu();
  }

  #createMainInfosPane() {
    const padding = 4;
    const rectangleHeight = 124;
    this.#scene.add
      .rectangle(
        padding,
        this.#scene.scale.height - rectangleHeight - padding,
        this.#scene.scale.width - padding * 2,
        rectangleHeight,
        0xede4f3,
        1
      )
      .setOrigin(0)
      .setStrokeStyle(8, 0xe4434a, 1);
  }

  #createSubInfosPanel() {
    const rectWidth = 500;
    const rectangleHeight = 124;
    return this.#scene.add
      .rectangle(0, 0, rectWidth, rectangleHeight, 0xede4f3, 1)
      .setOrigin(0)
      .setStrokeStyle(8, 0x905ac2, 1);
  }

  #renderBattlePanelText(menu) {
    return menu.map((option) => {
      return this.#scene.add.text(
        option.x,
        option.y,
        option.action,
        battleUiStyle
      );
    });
  }
}
