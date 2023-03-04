
const ImageValidator =(images)=>{

    let FinalImages =[]

    if(Array.isArray(images)){
        FinalImages = images
    }else{
        FinalImages.push(images)
    }

    if(FinalImages.length > 3){
        return {error : "you cant upload more than 3 images at once"}
    }

    if(images.size > 1048576) {
        return {error : "file size is to large , should be < 1 MB"}
    }

    const fileType = /jpg|png|jpeg/

    for(let image of FinalImages){
        let mimetype = fileType.test(image.mimetype)
        if(!mimetype){
            return {error : "incorrect file types"}
        }
    }
    
    return {error : false}

}

module.exports = ImageValidator