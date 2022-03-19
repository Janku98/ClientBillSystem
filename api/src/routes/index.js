const { Router } = require('express');
const fetch = require("cross-fetch");
const {Client, Bill} = require('../db');
const {Sequelize}= require("sequelize");
const Op=Sequelize.Op;


const router = Router();


router.get('/client', async (req, res)=>{
    const search = await Client.findAll({include: {model: Bill, as: "BillOfClient"} });

    if(!search){
        return res.status(404).send({error: "Table not found :("})
    }else{
        return res.status(200).json(search)
    };
});

router.post('/newClient', async (req, res)=>{
    let { name, adress, dni, iva} = req.body;
    try{
        if (!name || !adress || !dni || !iva){
            return res.status(404).send({error: "Please complete all the fields :("})
        }else{
            const createClient = await Client.create({

                name,
                adress,
                dni,
                iva
             });
             res.json(createClient)
        }
    }catch{
        res.status(404).send({error: "Something wrong creating a new client :("})
    }
    
});


router.post('/newBill', async (req, res)=>{
    let { ClientId, billNumber, importe} = req.body;
    try{
        if(!ClientId || !billNumber || !importe){
            return res.status(404).send({error: "Please complete all the fields :("})
        }else {
            const newBill = await Bill.create({
                ClientId,
                billNumber,
                importe
            });
            res.json(newBill);
        };
    }catch{
        res.status(404).send({error: "Something wrong creating a new Bill :("})
    } 
});


router.put('/findBill', async (req, res)=>{
    let {ClientId} = req.body;
    
    try{
        const findBill = await Client.findOne({where: {id: ClientId} , include: [{model: Bill, as: "BillOfClient"}]});
        res.status(200).json(findBill)

    }catch(error){
        res.status(404).send({error: "Something wrong searching the bill :("})
    }
});



router.delete('/deleteClient', async (req, res)=>{
    let {id} = req.body;
    console.log(id)
    try{
        const deleting = await Client.destroy({
            where: {id: id},
            force: true
        });
        res.json(deleting)
        

    }catch{
        res.status(404).send({error: "Something wrong deleting a client :("})
    }
});


router.put('/editClient', async (req, res) =>{
    let {ClientId, name, adress, dni, iva} = req.body;
    console.log(ClientId, name, adress, dni, iva)
    try{
        const search = await Client.findOne({where: {id: ClientId}});
        if(!search){
            res.status(404).send({error: "The Client ID doesnt exist :("})
        }else{
            const updateClient = await Client.update(
                {
                    name,
                    adress,
                    dni,
                    iva
                },
                {
                    where: {id: ClientId}
                }
            );
            res.json(updateClient);
        }
    }catch(error){
        res.status(404).send({error: "Something wrong editing a client :("})
    };
});





module.exports = router;
