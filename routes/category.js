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
  app.get('/categories/:id', (req, res) => {
    app.db('categories')
      .where('id', '=', req.params.id)
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
  app.post('/categories', (req, res) => {
    app.db('categories').insert({
      name: req.body.name
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
  app.delete('/categories/:id', (req, res) => {
    app.db('categories')
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
