/** @param { import('express').Express} app */
module.exports = app => {
  /**
   * Get All
   */
  app.get('/devices', (_, res) => {
    app.db('devices')
      .select('devices.id', 'devices.color', 'devices.partNumber', 'devices.category_id', 'categories.name')
      .leftJoin('categories', 'categories.id', 'devices.category_id')
      .orderBy('devices.id', 'desc')
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
  app.get('/devices/:id', (req, res) => {
    app.db('devices')
      .select('devices.id', 'devices.color', 'devices.partNumber', 'devices.category_id', 'categories.name')
      .leftJoin('categories', 'categories.id', 'devices.category_id')
      .where('devices.id', '=', req.params.id)
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
     app.post('/devices', (req, res) => {
      app.db('devices').insert({
        category_id: req.body.category_id,
        color: req.body.color,
        partNumber: req.body.partNumber
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
    app.delete('/devices/:id', (req, res) => {
      app.db('devices')
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
