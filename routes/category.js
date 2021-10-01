/** @param { import('express').Express} app */
module.exports = app => {
  /**
   * Get All
   */
  app.get('/categories', (_, res) => {
    app.db('categories')
      .orderBy('id', 'desc')
      .then(data => {
        console.log(data)
        if (data.length) {
            res.status(200).json(data)
        } else {
            res.status(404).json({
                message: "No results were found for this query."
            })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ exception: err })
      })
  })

  /**
   * Get Id
   */
  app.get('/categories/:id', (req, res) => {
    app.db('categories')
      .where('id', '=', req.params.id)
      .then(data => {
        console.log(data)
        if (data.length) {
            res.status(200).json(data)
        } else {
            res.status(404).json({
                message: "No results were found for this query."
            })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ exception: err })
      })
  })

  /**
   * Post
   */
  app.post('/categories', (req, res) => {
    app.db('categories').insert({
      name: req.body.name
    })
      .then(data => {
        console.log(data)
        res.status(201).json({message: "Data have been registered!"})
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({message: "Oops! an error occurred while trying to save the record!", exception: err})
      })
  })

  /**
   * Delete Id
   */
  app.delete('/categories/:id', (req, res) => {
    app.db('categories')
      .where('id', req.params.id)
      .del()
      .then(data => {
        console.log(data)
        res.status(200).json({ message: "Successfully removed!" })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({message: "Oops! an error occurred while trying to delete this record!", exception: err})
      })
  })
}
