const router = require('express').Router()

const Person = require('../models/Person')



// Create - criação de dados
router.post('/',async(req,res)=>{

    const {nome,salario,aprovado} = req.body
    //req.body {nome:"Geovanne",salario:2000,aprovado:false}

    if(!nome){
        res.status(422).json({error: 'Nome é obrigatório!'})
        return
    }

    const person = {
        nome,
        salario,
        aprovado
    }

    try {

        // criando dados
        await Person.create(person)
        res.status(201).json({message: 'Pessoa inserida com sucesso!'})
    } catch (error) {
        res.status(500).json({error:error})
    }
})

// Read - leitura de dados

router.get('/', async(req, res) => {
    try {
        const people = await Person.find()

        res.status(200).json(people)


    } catch (error) {
        res.status(500).json({error:error})
    }
})

router.get('/:id', async(req, res) => {

    console.log(req)

    const id = req.params.id


    try {
        
        const person = await Person.findOne({_id: id})

        if(!person) {
            res.status(422).json({message: 'O usuário não foi encontrado!'})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})


// Update - Atualização de dados 
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { nome, salario, aprovado} = req.body

    const person = {
        nome,
        salario,
        aprovado
    }

    try {
        const updatePerson = await Person.updateOne({_id: id}, person)

        if(updatePerson.matchedCount === 0){
            res.status(422).json({ message: 'O usuário não foi encontrado'})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Delete- deleta de dados

router.delete('/:id', async (req, res) =>{

    const id = req.params.id

    const person = await Person.findOne({_id: id})

        if(!person) {
            res.status(422).json({message: 'O usuário não foi encontrado!'})
            return
        }

        try {
            await Person.deleteOne({_id: id})
            
            res.status(200).json({message: 'Usuário foi removido com sucesso!'})
        } catch (error) {
            res.status(500).json({ error: error })
        }
})

module.exports = router