const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const category = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
  if (!category) {
    res.status(404).json({Message: 'No category found with that id!'});
    return;
  }
  res.status(200).json(category);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create(req.body);
    res.status(200).json(createCategory);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body,{
      where: {
        id: req.params.id
      }
    });
    if (!updateCategory) {
      res.status(404).json({message: 'No category found with that id!'});
    }
    res.status(200).json(updateCategory);
  } 
  catch (err)  {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const destroyCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
      if (!destroyCategory) {
        res.status(404).json({ message: 'No category found with that id!'});
        return;
      }
      res.status(200).json({message: 'Category deleted!'});
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
