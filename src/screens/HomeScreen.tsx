import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, ExpandableContainer, T1 } from "../components";
import { StarwarsAPI, StarwarsFilm, Species } from "../apis/starwars";
import { parse_date } from "../utils/parse_date";

export const HomeScreen: React.FC = () => {
  return (
    <Container style={styles.container}>
      {render_starwars_film_list()}
      {render_about_me()}
    </Container>
  );
};

function render_starwars_film_list() {
  return (
    <ExpandableContainer
      renderMainContent={() => render_film_list_heading()}
      renderExpandedContent={render_starwars_films}
    />
  );
}

function render_film_list_heading() {
  return (
    <View style={styles.film_list_heading_container}>
      <T1>{"Starwars films"}</T1>
    </View>
  );
}

function render_starwars_films() {
  const [films, set_films] = React.useState<StarwarsFilm[]>([]);

  React.useEffect(() => {
    if (set_films) {
      StarwarsAPI.get_all_films().then(set_films).catch(console.error);
    }
  }, [set_films]);

  if (!films.length) {
    return <T1>{"Fetching data..."}</T1>;
  }

  return (
    <>
      {films.map((film, idx) => (
        <ExpandableContainer
          key={idx}
          containerStyle={styles.expandable_film_container}
          renderMainContent={() => render_main_content(film)}
          renderExpandedContent={() => render_expanded_content(film)}
        />
      ))}
    </>
  );
}

function render_about_me() {
  return (
    <ExpandableContainer
      containerStyle={styles.expandable_about_me_container}
      renderMainContent={render_name}
      renderExpandedContent={render_expanded_about_me}
    />
  );
}

function render_main_content(film: StarwarsFilm) {
  return <T1>{film.title}</T1>;
}

function render_expanded_content(film: StarwarsFilm) {
  const formatted_date = parse_date(film.release_date);

  return (
    <View>
      <T1>Director: {film.director}</T1>
      <T1>Release date: {formatted_date}</T1>
      <T1>{render_species_list(film)}</T1>
    </View>
  );
}

function render_species_list(film: StarwarsFilm) {
	const [species, set_species] = React.useState<Species[]>([]);

  React.useEffect(() => {
    StarwarsAPI.get_species(film).then(set_species).catch(console.error);
  }, [film.title]);

  return (
    <T1>
      <>Species: {species.map((s) => s.name).join(", ")}</>
    </T1>
  );
}

function render_name() {
  return <T1>{"About me"}</T1>;
}

function render_expanded_about_me() {
  return (
    <>
      <T1>Name: Gabriel</T1>
      <T1>Age: 33</T1>
      <T1>Location: Dallas, TX</T1>
      <T1>Hobies: Hiking, biking, climbing</T1>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    alignItems: "center",
  },
  expandable_film_container: {
    marginBottom: 8,
  },
  expandable_about_me_container: {
    marginTop: 12,
  },
  film_list_heading_container: {
    marginBottom: 8,
  },
});
