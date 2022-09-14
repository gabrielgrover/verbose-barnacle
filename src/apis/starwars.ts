import { request, gql } from "graphql-request";

export const StarwarsAPI = { get_all_films };

export type StarwarsFilm = {
  title: string;
  director: string;
  release_date: string;
  species: string[];
};

const BASE_URL = "https://swapi-graphql.netlify.app/.netlify/functions/index";

const basic_films_query = gql`
  query Query {
    allFilms {
      films {
        title
        director
        releaseDate
        speciesConnection {
          species {
            name
          }
        }
      }
    }
  }
`;

async function get_all_films(): Promise<StarwarsFilm[]> {
  type AllFilmsResp = {
    allFilms: {
      films: {
        title: string;
        director: string;
        releaseDate: string;
        speciesConnection: {
          species: { name: string }[];
        };
      }[];
    };
  };

  return request<AllFilmsResp>(BASE_URL, basic_films_query).then((r) =>
    r.allFilms.films.map((f) => ({
      ...f,
      species: f.speciesConnection.species.map((s) => s.name),
      release_date: f.releaseDate,
    }))
  );
}
