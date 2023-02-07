const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const allTags = await Tag.findAll({
      //include its associated Product data
      include: [{ model: Product }]
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }

});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      //include its associated Product data
      include: [{ model: Product },]
    });
    if (!oneTag) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tag) => {

    res.status(200).json(tag);

  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const oneTag = await Tag.destroy({ where : { id: req.params.id } })
  
    if (!oneTag) {
      res.status(404).json({ message: "No Tag found with that id!" });
      return;
    }
    res.status(200).json({ message: "Tag deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
