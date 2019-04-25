export interface MenuStyle {
	font: string;
	fill: string;
	boundsAlignH: string;
	boundsAlignV: string;
}

export interface ItemSlot {
	backgroundImage: Phaser.GameObjects.Image;
	item: any;
	itemImage: Phaser.GameObjects.Image | null;
	trigger: () => void;
}