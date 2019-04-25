export class Equipment {

  // ringSlots: MasterRing[] = [];
  beltSlots = [];
  armorSlots = [];

  // equiptRings: MasterRing[] = [new RingOfStrength()];
  equiptBelts = [];
  equiptArmors = [];

  constructor() {

  }

  addToInventory(item: any) {
      // if (item.itemType === itemType.ring) {
      //     this.ringSlots.push(item);
      // }
      if (item.itemType === "armor") {
          this.armorSlots.push(item);
      }
      if (item.itemType === "belt") {
          this.beltSlots.push(item);
      }
  }

  // equiptRing(item: MasterRing) {
  //     this.equiptRings.push(item);
  // }

  equiptBelt(item: any) {
      this.equiptBelts.push(item);
  }

  equiptArmor(item: any) {
      this.equiptArmors.push(item);
  }

  getEquiptItem(type: number, num: number) {
      // if (type === itemType.ring) {
      //     return this.equiptRings[num];
      // }
      if (type === "belt") {
          return this.equiptBelts[num];
      }
      if (type === "armor") {
          return this.equiptArmors[num];
      }

      return null;
  }
}