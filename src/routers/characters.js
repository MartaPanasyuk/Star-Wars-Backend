const axios = require('axios');
const express = require('express');

const { Router } = express;

const router = new Router();

//Task #1

router.get('/:title', async (req, res) => {
  try {
    let page = req.query.page;
    let gender = req.query.gender;
    let height = req.query.height;
    let age = req.query.age;

    const searchOnMovieTitle = await axios.get(
      `https://swapi.dev/api/films/?search=${req.params.title}`
    );

    const allCharactersUrls = searchOnMovieTitle.data.results[0].characters;

    const allCharactersResponses = await Promise.all(
      allCharactersUrls.map(
        async (characterUrl) => await axios.get(characterUrl)
      )
    );
    const allCharacters = allCharactersResponses.map((char) => char.data);
    let resultCharacters = allCharacters;
    // first filter on genders  # 1(A)
    if (gender) {
      resultCharacters = resultCharacters.filter(
        (char) => char.gender === gender
      );
    }
    // Secong filter on height #1(B)
    if (height === 'a') {
      resultCharacters.sort((a, b) => Number(a.height) - Number(b.height));
    } else if (height === 'd') {
      resultCharacters.sort((a, b) => Number(b.height) - Number(a.height));
    }

    // Third filter on age #1(C)

    function ageConverter(word) {
      if (word.endsWith('BBY')) {
        return -Number(word.slice(0, -3));
      } else if (word.endsWith('ABY')) {
        return Number(word.slice(0, -3));
      }
    }

    function checkInvalidAge(age) {
      return age === 'unknown' || !(age.endsWith('BBY') || age.endsWith('ABY'));
    }

    if (age === 'a') {
      resultCharacters.sort((a, b) =>
        checkInvalidAge(a.birth_year)
          ? 1
          : checkInvalidAge(b.birth_year)
          ? -1
          : ageConverter(b.birth_year) - ageConverter(a.birth_year)
      );
    } else if (age === 'd') {
      resultCharacters.sort((a, b) =>
        checkInvalidAge(a.birth_year)
          ? 1
          : checkInvalidAge(b.birth_year)
          ? -1
          : ageConverter(a.birth_year) - ageConverter(b.birth_year)
      );
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////

    if (!page) {
      page = 1;
    }

    const pageRange = (n) => [(n - 1) * 30, n * 30 - 1];
    resultCharacters = resultCharacters.slice(
      pageRange(page)[0],
      pageRange(page)[1]
    );

    res.send(resultCharacters);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
