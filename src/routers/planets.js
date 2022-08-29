const axios = require('axios');
const express = require('express');

const { Router } = express;

const router = new Router();

//Task #2
router.get('/', async (req, res) => {
  try {
    let page = req.query.page;
    const climate = req.query.climate;

    const getAllPlanets = await axios.get(`https://swapi.dev/api/planets/`);

    const planets = getAllPlanets.data.results; //
    const filteredPlanets = planets.filter((char) =>
      char.climate.includes(climate.toLowerCase())
    );
    /*
  
  Let's check what hair colors people have

      const getAllPeople = await axios.get(`https://swapi.dev/api/people/`);
      let result = getAllPeople.data.results;
      let getAllHairColor = result.map((color) => color.hair_color);
      console.log(getAllHairColor);
  
  [
    'blond',
    'n/a',
    'n/a',
    'none',
    'brown',
    'brown, grey',
    'brown',
    'n/a',
    'black',
    'auburn, white'
  ]    */

    result = [];
    for (planet of filteredPlanets) {
      const resUrls = planet.residents;
      const allResidentsResponses = await Promise.all(
        resUrls.map(async (residentUrl) => await axios.get(residentUrl))
      );
      const allResidents = allResidentsResponses
        .map((resident) => resident.data)
        .filter(
          (res) => res.hair_color === 'brown' || res.hair_color === 'black'
        );
      result.push({
        name: planet.name,
        dark_haired_residents: allResidents,
      });
    }

    if (!page) {
      page = 1;
    }

    const pageRange = (n) => [(n - 1) * 30, n * 30 - 1];
    result = result.slice(pageRange(page)[0], pageRange(page)[1]);

    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
