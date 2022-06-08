export function getExistingFavourites() {
  const favourites = localStorage.getItem("favourites");

  if (favourites === null) {
    return [];
  } else {
    return JSON.parse(favourites);
  }
}

export function saveFavourites(favourites) {
  localStorage.setItem("favourites", JSON.stringify(favourites));
}
