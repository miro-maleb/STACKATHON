const test = {
  title: "Peanut Butter and Jelly Sandwich",
  description: `A delicious PB&J: smooth, creamy peanut butter and tart, fruity jelly nestled between two slices of freshly-baked, golden-brown bread. The perfect combination of salty and sweet, this sandwich is sure to tantalize your taste buds.`,
  ingredients: {
    1: { name: "peanut butter", quantity: "2", unit: "tablespoon" },
    2: { name: "jelly", quantity: "2", unit: "tablespoon" },
    3: { name: "bread", quantity: "2", unit: "slice" },
  },
  instructions: {
    1: "Get two pieces of whole wheat bread.",
    2: "Spread approximately two tablespoon of peanut butter on one piece of bread.",
    3: "Spread approximately one tablespoon of jelly on the other piece of bread.",
    4: "Press the two pieces of bread together so that the peanut butter and jelly are in middle.",
    5: "Enjoy your meal!",
  },
};
const func = () => {
  console.log(JSON.stringify(test));
};
func();
