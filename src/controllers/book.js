const Book = require('../models/book');


const create = async(req,res) =>{
    try {
        const data = req.body;
        const book = new Book({
            title:data.title,
            author:data.author,
            publisher:data.publisher,
            read:data.read
        });
        book.save().then((book) =>{
            res.send(book);
        }).catch((err) =>{
            res.status(500).send({
                message:err.message || 'Some error occurred while creating the book.'
            });
        });    
    } catch (error) {
        console.log('create book => '+error);
    }
}


const findAll = async(req,res) =>{
    try {
        Book.find().then((book)=>{
            res.send(book);
        }).catch((err)=>{
            res.status(500).send({
                message:err.message || 'Some error occurred while retrieving the book'
            });
        });
    } catch (error) {
        console.log('findAll book =>'+error);
    }
}


const findOne = async(req,res) =>{
    try {
        const id = req.params.bookid;
        Book.findById(id).then((book)=>{
            if(!book){
                return res.status(404).send({
                    message:"Book not found with id " + id
                }); 
            }
            res.send(book);

        }).catch((err)=>{
            if(err.kind ==="ObjectId"){
                return res.status(404).send({
                    message:"Book not found with id "+id
                });
            }
            return res.status(500).send({
                message:"Error retrieving book with id" + id
            });

        })
    } catch (error) {
        console.log("findOne book =>"+error);
    }
}

const update = async(req,res) =>{
    try {
        const id = req.params.bookid;
        const data = req.body;
        Book.findByIdAndUpdate(id,
            {
                title:data.title,
                author:data.author,
                publisher:data.publisher,
                read:data.read
            },
            {
                new:true
            }).then((book)=>{
                if(!book){
                    return res.status(404).send({
                        message:"Book not found with id " +id
                    });
                }
                res.send(book);
            }).catch((err)=>{

                if(err.kind === 'ObjectId'){
                    return res.status(404).send({
                        message:"Book not found with id " +id
                    });
                }
                return res.status(500).send({
                    message:"Error updating book with id " +id
                });

            });
        
    } catch (error) {
        console.log("update book => "+error);
    }
}


const remove = async(req,res) =>{
    try {
        const id = req.params.bookid;
        Book.findByIdAndRemove(id).then((book)=>{
            if(!book){
                return res.status(404).send({
                    message:"Book not found with id "+id
                });
            }
            res.send({message:"Book deleted succesful"});
        }).catch((err)=>{
            if(err.kind === 'ObjectId' || err.name === "NotFound"){
                return res.status(404).send({
                    message:"Book not found with id "+id
                });
            }
            return res.status(500).send({
                message:"Error deleting book with id "+id
            });
        });
    } catch (error) {
        console.log("delete book =>"+error);
    }
}
module.exports ={
    create,
    findAll,
    findOne,
    update,
    remove
}