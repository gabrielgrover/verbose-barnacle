const BASE_URL = "https://swapi.dev/api";

export const StarwarsAPI = { get_all_films, get_species };

export type StarwarsFilm = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
};

export type Species = {
  name: string;
};

async function get_all_films() {
  return fetch(BASE_URL + "/films")
    .then((r) => r.json())
    .then((data) => {
      if (Array.isArray(data?.results)) {
        return data.results as StarwarsFilm[];
      }

      return [];
    });
}

async function get_species(film: StarwarsFilm) {
  return Promise.all(
    film.species.map((species_url) =>
      fetch(species_url)
        .then((r) => r.json())
        .then((data) => ({ name: data.name } as Species))
    )
  );
}
