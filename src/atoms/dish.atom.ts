import { atom } from "recoil";

export const dishNameAtom = atom<string>({
  key: "dishNameAtom",
  default: "",
});

export const dishPriceAtom = atom<number>({
  key: "dishPriceAtom",
  default: 0,
});

export const dishDescriptionAtom = atom<string>({
  key: "dishDescriptionAtom",
  default: "",
});

export const dishImgFileAtom = atom<File>({
  key: "dishImgFileAtom",
  default: new File([new Blob()], ""),
});
