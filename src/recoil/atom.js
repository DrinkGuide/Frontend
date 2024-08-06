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

export const ProductTypeinKorean = atom({
  key: "ProductTypeKorean",
  default: [
    { DRINK: "음료수" },
    { SNACK: "과자" },
    { RETORTFOOD: "가공식품" },
    { FRUIT: "과일" },
    { VEGETABLE: "채소" },
    { FISH: "생선" },
  ],
});

export const getAccessTokenAtom = atom({
  key: "GetAccessToken",
  default: "",
});

export const scanPageColorAtom = atom({
  key: "scanPageColor",
  default: "#5D9EFF",
});

export const scanPageProductTypeAtom = atom({
  key: "scanPageProductType",
  default: "음료수",
});
