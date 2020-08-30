'use strict'

module.exports = {
  //@ts-ignore
  up: async queryInterface =>
    await queryInterface.bulkInsert(
      'menus',
      [
        {
          name: 'Cinnamon Baked Doughnuts',
          image:
            'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/7/29/0/BX0903H_cinnamon-baked-doughnuts-recipe_s4x3.jpg.rend.hgtvcom.966.725.suffix/1449692373072.jpeg',
          price: 50,
          recipe: ['dougnut', 'cinnamon', 'nutmeg'],
          type: 'breakfast',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Herbalicious Breakfast Casserole',
          image:
            'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/10/4/1/WU2006_Herbalicious-Breakfast-Casserole_s4x3.jpg.rend.hgtvcom.966.725.suffix/1538677350383.jpeg',
          price: 40,
          recipe: ['mozzarella', 'basil pesto', 'fresh parsley', 'fresh oregano', 'ground black pepper'],
          type: 'breakfast',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Avocado Toasts',
          image:
            'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/12/11/0/FNK_All-the-Avocado-Toast_s4x3.jpg.rend.hgtvcom.826.620.suffix/1450059496131.jpeg',
          price: 30,
          recipe: ['whole wheat bread', 'avocado', 'red pepper flakes', 'garlic'],
          type: 'breakfast',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Mini Kale Shakshuka',
          image:
            'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/12/19/MW207_Mini-Kale-Shakshuka_s4x3.jpg.rend.hgtvcom.826.620.suffix/1545245389206.jpeg',
          price: 75,
          recipe: ['feta cheese', 'kale', 'sweet paprika', 'garlic', 'red pepper flakes', 'Greek yogurt', 'parsley'],
          type: 'breakfast',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Tuscan Vegetable Soup',
          image:
            'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/12/6/0/CC-ellie-krieger_tuscan-vegetable-soup-recipe_s4x3.jpg.rend.hgtvcom.826.620.suffix/1389125372910.jpeg',
          price: 60,
          recipe: ['canellini beans', 'carrots', 'zucchini', 'celery', 'garlic', 'sage leaves', 'ground black pepper'],
          type: 'lunch',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Okra with Tomatoes',
          image:
            'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/6/17/0/FNM080109Weeknight024_s4x3.jpg.rend.hgtvcom.826.620.suffix/1382538907916.jpeg',
          price: 70,
          recipe: ['okra', 'cherry tomatoes', 'cider vinegar', 'garlic'],
          type: 'lunch',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Herbed Quinoa',
          image:
            'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/4/19/0/FN_quinoa-004_s4x3.jpg.rend.hgtvcom.826.620.suffix/1382539861840.jpeg',
          price: 60,
          recipe: ['quinoa', 'basil leaves', 'parsley leaves', 'garlic', 'red pepper flakes', 'ground black pepper'],
          type: 'lunch',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Sloppy Joes',
          image:
            'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/11/4/1/CCHAP402_Sloppy-Joes_s4x3.jpg.rend.hgtvcom.826.620.suffix/1382540648899.jpeg',
          price: 40,
          recipe: ['Beef', 'jalapeno', 'red beans', 'garlic', 'red wine vinegar', 'Worcestershire sauce', 'mustard powder'],
          type: 'lunch',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Roasted Brussels Sprouts',
          image:
            'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2010/8/12/0/FN-Thanksgiving-2010_Brussels-Sprouts_s4x3.jpg.rend.hgtvcom.826.620.suffix/1384540892898.jpeg',
          price: 50,
          recipe: ['Brussels sprouts', 'freshly ground black pepper', 'sweet paprika', 'garlic', 'red pepper flakes'],
          type: 'dinner',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Chicken and Broccoli Stir-Fry',
          image:
            'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2004/5/14/0/bw2c12_chicken_broccoli2.jpg.rend.hgtvcom.826.620.suffix/1371584021202.jpeg',
          price: 60,
          recipe: ['Chicken', 'Broccoli', 'sesame oil', 'garlic', 'red pepper flakes', 'Jasmine rice', 'sherry', 'soy sauce'],
          type: 'dinner',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Fish, Olives and Capers',
          image:
            'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/12/19/MW207_Mini-Kale-Shakshuka_s4x3.jpg.rend.hgtvcom.826.620.suffix/1545245389206.jpeg',
          price: 50,
          recipe: ['capers', 'sea bass', 'white wine', 'garlic', 'black olives', 'spinach leaves', 'parsley'],
          type: 'dinner',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Cheesy Baked Penne',
          image:
            'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/10/26/0/FNK_Healthy-Creamy-Spinach-Baked-Penne_s4x3.jpg.rend.hgtvcom.826.620.suffix/1382541947211.jpeg',
          price: 40,
          recipe: [
            'cottage cheese',
            'penne',
            'fennel seeds',
            'garlic',
            'ground black pepper',
            'basil leaves',
            'mozzarella',
            'Parmesan'
          ],
          type: 'dinner',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Bullshot',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRrdiOwl_wq5OlTsMK96nA2G4cOAPfpSCsp7g&usqp=CAU',
          price: 80,
          recipe: ['vodka', 'beef bouillon', 'Worcestshire sauce'],
          type: 'drink',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Rosemary Salty Dog',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSgTNahzwqBd5bSGTk2piDN8-S_PtXvn-4ZWA&usqp=CAU',
          price: 90,
          recipe: ['gin', 'grapefruit juice', 'rosemary syrup'],
          type: 'drink',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Thyme Lemonade',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRgajyU-Ba0kZKKf3Q1A-B1fJolUuY_aftTEg&usqp=CAU',
          price: 70,
          recipe: ['gin', 'fresh thyme', ' lemon juice', 'sugar'],
          type: 'drink',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Green Tea Mojito',
          image: 'https://cdnimg.webstaurantstore.com/uploads/blog/2018/2/tea-cocktail.jpg',
          price: 80,
          recipe: ['white rum', 'lime juice', 'sugar', 'brewed chilled green tea', 'mint'],
          type: 'drink',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),
  //@ts-ignore
  down: async queryInterface => await queryInterface.bulkDelete('menus', null, {})
}
