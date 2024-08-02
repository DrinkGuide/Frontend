import { atom } from "recoil";

export const SubscribeTypeAtom = atom({
  key: "SubscribeType",
  default: "",
});

export const ProductTypeColorAtom = atom({
  key: "ProductTypeColor",
  default: [
    { DRINK: "#5D9EFF" },
    { SNACK: "#FF5858" },
    { RETORTFOOD: "#FFA858" },
    { FRUIT: "#FFFA87" },
    { VEGETABLE: "#85FF8A" },
    { FISH: "#FF89C1" },
  ],
});
