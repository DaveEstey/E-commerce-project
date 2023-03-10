const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const allCategories = await Category.findAll({
      //include its associated Products
      include: [{ model: Product }]
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }

});



router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      //include its associated Products
      include: [{ model: Product }]
    });
    if (!oneCategory) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const oneCategory = await Category.destroy({ where : { id: req.params.id } })
  
    if (!oneCategory) {
      res.status(404).json({ message: "No Category found with that id!" });
      return;
    }
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
