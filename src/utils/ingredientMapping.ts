export type IngredientCategory =
  | 'fruit'
  | 'vegetable'
  | 'herb'
  | 'meat'
  | 'fish'
  | 'dairy'
  | 'grain'
  | 'legume'
  | 'pantry';

export interface Ingredient {
  label: string;          // FR
  value: string;          // EN (Spoonacular)
  category: IngredientCategory;
  aliases: string[];      // Matching texte / scan
};

export const INGREDIENT_DICTIONARY: Ingredient [] = [
  // 🍎 Fruits
  {
    label: 'Pomme',
    value: 'apple',
    category: 'fruit',
    aliases: ['pomme', 'pommes']
  },
  {
    label: 'Banane',
    value: 'banana',
    category: 'fruit',
    aliases: ['banane', 'bananes']
  },
  {
    label: 'Citron',
    value: 'lemon',
    category: 'fruit',
    aliases: ['citron', 'citron jaune']
  },

  // 🥕 Légumes
  {
    label: 'Tomate',
    value: 'tomato',
    category: 'vegetable',
    aliases: ['tomate', 'tomates']
  },
// 🥕 Légumes
{
  label: 'Carotte',
  value: 'carrot',
  category: 'vegetable',
  aliases: ['carotte', 'carottes']
},
{
  label: 'Courgette',
  value: 'zucchini',
  category: 'vegetable',
  aliases: ['courgette', 'courgettes']
},
{
  label: 'Aubergine',
  value: 'eggplant',
  category: 'vegetable',
  aliases: ['aubergine', 'aubergines']
},
{
  label: 'Poivron',
  value: 'bell pepper',
  category: 'vegetable',
  aliases: ['poivron', 'poivrons', 'poivron rouge', 'poivron vert']
},
{
  label: 'Concombre',
  value: 'cucumber',
  category: 'vegetable',
  aliases: ['concombre', 'concombres']
},
{
  label: 'Brocoli',
  value: 'broccoli',
  category: 'vegetable',
  aliases: ['brocoli', 'brocolis']
},
{
  label: 'Chou-fleur',
  value: 'cauliflower',
  category: 'vegetable',
  aliases: ['chou-fleur', 'chou fleur']
},
{
  label: 'Épinards',
  value: 'spinach',
  category: 'vegetable',
  aliases: ['épinard', 'épinards']
},
{
  label: 'Haricots verts',
  value: 'green beans',
  category: 'vegetable',
  aliases: ['haricot vert', 'haricots verts']
},
{
  label: 'Petits pois',
  value: 'peas',
  category: 'vegetable',
  aliases: ['petit pois', 'petits pois']
},
{
  label: 'Maïs',
  value: 'corn',
  category: 'vegetable',
  aliases: ['maïs', 'mais']
},
{
  label: 'Pomme de terre',
  value: 'potato',
  category: 'vegetable',
  aliases: ['pomme de terre', 'pommes de terre', 'patate']
},
{
  label: 'Champignon',
  value: 'mushroom',
  category: 'vegetable',
  aliases: ['champignon', 'champignons', 'champignon de paris']
},
{
  label: 'Poireau',
  value: 'leek',
  category: 'vegetable',
  aliases: ['poireau', 'poireaux']
},
{
  label: 'Navet',
  value: 'turnip',
  category: 'vegetable',
  aliases: ['navet', 'navets']
},
{
  label: 'Betterave',
  value: 'beet',
  category: 'vegetable',
  aliases: ['betterave', 'betteraves']
},
{
  label: 'Radis',
  value: 'radish',
  category: 'vegetable',
  aliases: ['radis']
},
{
  label: 'Salade',
  value: 'lettuce',
  category: 'vegetable',
  aliases: ['salade', 'laitue', 'batavia', 'iceberg']
},
{
  label: 'Chou',
  value: 'cabbage',
  category: 'vegetable',
  aliases: ['chou', 'chou vert', 'chou blanc']
},
{
  label: 'Oignon',
  value: 'onion',
  category: 'vegetable',
  aliases: ['oignon', 'oignons', 'oignon rouge']
},
{
  label: 'Ail',
  value: 'garlic',
  category: 'vegetable',
  aliases: ['ail', 'gousse d’ail']
},

  // 🌿 Herbes
  {
    label: 'Persil',
    value: 'parsley',
    category: 'herb',
    aliases: ['persil']
  },

  // 🥩 Viandes
  {
    label: 'Poulet',
    value: 'chicken',
    category: 'meat',
    aliases: ['poulet', 'filet de poulet', 'blanc de poulet']
  },
  {
    label: 'Bœuf',
    value: 'beef',
    category: 'meat',
    aliases: ['boeuf', 'bœuf', 'viande bovine']
  },
  {
    label: 'Porc',
    value: 'pork',
    category: 'meat',
    aliases: ['porc', 'viande de porc']
  },

  // 🐟 Poissons
  {
    label: 'Saumon',
    value: 'salmon',
    category: 'fish',
    aliases: ['saumon', 'filet de saumon']
  },
  {
    label: 'Thon',
    value: 'tuna',
    category: 'fish',
    aliases: ['thon', 'thon en boite']
  },

  // 🥛 Produits laitiers
  {
    label: 'Lait',
    value: 'milk',
    category: 'dairy',
    aliases: ['lait', 'lait entier', 'lait demi-écrémé']
  },
  {
    label: 'Fromage',
    value: 'cheese',
    category: 'dairy',
    aliases: ['fromage', 'emmental', 'gruyère']
  },
  {
    label: 'Œuf',
    value: 'egg',
    category: 'dairy',
    aliases: ['oeuf', 'œuf', 'oeufs']
  },

  // 🌾 Céréales & produits secs
  {
    label: 'Pâtes',
    value: 'pasta',
    category: 'grain',
    aliases: ['pâtes', 'pasta', 'spaghetti', 'penne']
  },
  {
    label: 'Riz',
    value: 'rice',
    category: 'grain',
    aliases: ['riz', 'riz blanc', 'riz complet']
  },

  // 🌱 Légumineuses
  {
    label: 'Lentilles',
    value: 'lentils',
    category: 'legume',
    aliases: ['lentille', 'lentilles']
  },
  {
    label: 'Pois chiches',
    value: 'chickpeas',
    category: 'legume',
    aliases: ['pois chiche', 'pois chiches']
  },

  // 🧂 Épicerie
  {
    label: 'Huile d’olive',
    value: 'olive oil',
    category: 'pantry',
    aliases: ['huile d’olive', 'huile olive']
  },
  {
    label: 'Sel',
    value: 'salt',
    category: 'pantry',
    aliases: ['sel']
  },
  {
    label: 'Poivre',
    value: 'black pepper',
    category: 'pantry',
    aliases: ['poivre']
  },
];
