const Category = require("../Models/Category")

const GetCategories = async (req,res,next)=>{
    try{
        let categories = await Category.find({}).sort({name:"asc"})
        res.send(categories)
    }catch(err){
        next(err)
    }
}


const AddCategory = async(req,res,next)=>{
    try{
        let {categoryInput} = req.body.name 
        let categoryCheck = await Category.findOne({name:categoryInput}) 
        if(categoryCheck){
            throw new Error("category alreay exist")
        }else{
            const newCategory = new Category(req.body)
            newCategory.save()
            res.send(newCategory)
        }
    }catch(err){
        next(err)
    }
}

const AddAttributes = async(req,res,next)=>{
    let {category ,key ,value} = req.body 
    if(!category || !key || !value){
        next(new Error("Need all three parameters"))
    }else{
        let categoryInCategory = await Category.findOne({name : category})
        let attributes = categoryInCategory.attributes 
        let keyExisted = false 
        attributes.map((attr,idx)=>{
            if(attr.key===key){
                keyExisted = true
                attr.value.push(value)
                let newValue = [...new Set(attr.value)]
                categoryInCategory.attributes[idx].value = newValue  
            }
        })
        if(!keyExisted){
            categoryInCategory.attributes.push({key:key , value :[value]})
        }
        await categoryInCategory.save()
        res.json({
            success : true,
            category : categoryInCategory
        })
    }


}

const DeleteCategory = async(req,res,next)=>{
    try{
     
        if(req.params.category !== "Choose category"){
            let categoryCheck = await Category.findOne({name : req.params.category})
            if(categoryCheck){
                await Category.findOneAndDelete({name : req.params.category})
                res.send("deleted succesfully")
            }else{
                res.send("category doesnt exist")
            }
        }
    }catch(err){
        next(err)
    }
    
}

module.exports = {GetCategories , AddCategory , AddAttributes , DeleteCategory}