const { Configuration, OpenAIApi } = require("openai");
import axios from "axios";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (process.env.OPENAI_API_KEY === "") {
    console.log("this is a test of the shipwid.e");
    res.status(500).send("No openAi APi key configured");
  }

  const ingredients = await axios.get("http://127.0.0.1:3000/api/ingredients");

  const prompt = `write a recipe title, mouthwatering description, list of ingredients used in the recipe, and explicit list of numbered instructions based on the following parameters: A spice rating (1-5), a choice of hot meal or cold meal, a complexity rating (1-5), a country of origin for the dish,  the type of meal (breakfast, lunch, dinner, or desert), and the available ingredients to use. You do not need to use all of the ingredients.
Your entire response must be one JSON object with the parameters 'name', 'description', 'ingredients', and 'instructions'.
here is an example response: 
{"name":"Peanut Butter and Jelly Sandwich","description":"A delicious PB&J: smooth, creamy peanut butter and tart, fruity jelly nestled between two slices of freshly-baked, golden-brown bread. The perfect combination of salty and sweet, this sandwich is sure to tantalize your taste buds.","ingredients":{"1":{"name":"peanut butter"},"2":{"name":"jelly"},"3":{"name":"bread"}},"instructions":{"1":"Get two pieces of whole wheat bread.","2":"Spread approximately two tablespoon of peanut butter on one piece of bread.","3":"Spread approximately one tablespoon of jelly on the other piece of bread.","4":"Press the two pieces of bread together so that the peanut butter and jelly are in middle.","5":"Enjoy your meal!"}}

use these parameters to create a new response: 
spice: ${req.body.spice},
${req.body.temperature},
complexity: ${req.body.complexity},
country: ${req.body.country},
type: ${req.body.country},
ingredients:${ingredients}`;

  console.log("made it to handler func");
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured",
      },
    });
    return;
  }
  // res.status(200).send("placeholder");
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 1000,
    temperature: 0,
  });
  const { data } = response;
  console.log(data);
  res.status(200).json(data.choices[0].text.substring(2));
}
