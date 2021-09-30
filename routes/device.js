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
                message: "Não foi encontrado nenhum resultado nessa consulta."
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
                message: "Não foi encontrado nenhum resultado nessa consulta."
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
          res.status(201).json({message: "Os dados foram cadastrados!"})
        })
        .catch(err => {
          console.log(err)
          res.status(400).json({message: "Oops! ocorreu um erro ao tentar salvar o registro!", exception: err})
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
          if (data === 1) {
            res.status(200).json({ message: "Removida com sucesso!" })
          } else {
            res.status(204)
          }
        })
        .catch(err => {
          console.log(err)
          res.status(400).json({message: "Oops! ocorreu um erro ao tentar apagar este registro!", exception: err})
        })
    })
}
