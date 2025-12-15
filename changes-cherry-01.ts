// some changes
// I can take various commits too (git checkout 454kjk 545kj 45kj45k) just use an space between commit-hashes
// 3rd turn of changes

type City = "Madrid" | "Oslo" | "Paris" | "Barcelona";
// no es lo mismo Partial<Record<K,U>> que usarlo dentro,ojo
const cities: Partial<Record<City, number>> = {
  Barcelona: 3,
};
