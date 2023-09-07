const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const { RAPID_API_KEY, RAPID_API_HOST } = require('./config');

app.use(cors());
app.use(express.json());

app.get('/api/recipes', async (req, res) => {
  try {
    const recipeName = req.query.q;
    const options = {
      method: 'GET',
      url: 'https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2',
      params: {
        type: 'any',
        q: recipeName,
      },
      headers: {
        'Accept-Language': 'en',
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': RAPID_API_HOST,
      },
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/recipes/:section', async (req, res) => {
    const sections = [
      {
        title: 'Under 30 Minutes',
        apiParams: {
          type: 'any',
          time: 30,
        },
      },
      {
        title: 'Meatless Mondays',
        apiParams: {
          type: 'any',
          health: 'vegetarian',
          dishType: 'main course',
        },
      },
      {
        title: 'Desserts For Days',
        apiParams: {
          type: 'any',
          dishType: 'desserts',
        },
      },
    ];
  
    try {
      const sectionIndex = parseInt(req.params.section, 10);
      if (isNaN(sectionIndex) || sectionIndex < 0 || sectionIndex >= sections.length) {
        throw new Error('Invalid section index');
      }
  
      const options = {
        method: 'GET',
        url: 'https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2',
        params: sections[sectionIndex].apiParams,
        headers: {
          'Accept-Language': 'en',
          'X-RapidAPI-Key': RAPID_API_KEY,
          'X-RapidAPI-Host': RAPID_API_HOST,
        },
      };
  
      const response = await axios.request(options);
      res.json(response.data.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});