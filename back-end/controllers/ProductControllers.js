const Product = require("../Models/Product");
const ObjectId = require("mongodb").ObjectId;

const GetProducts = async (req, res, next) => {
  try {
    //sort
    let SortCondition = {};
    if (req.query.sort) {
      const arr = req.query.sort.split("_");
      const sortBy = arr[0];
      const val = arr[1];
      SortCondition = { [sortBy]: val };
    }

    // filter
    let PriceCondition = {};
    if (req.query.price) {
      PriceCondition = {
        $and: [
          { price: { $gt: 0 } },
          { price: { $lte: Number(req.query.price) } },
        ],
      };
    }

    let RatingCondition = {};
    if (req.query.rating) {
      RatingCondition = { rating: { $in: req.query.rating } };
    }

    let CategoryCondition = { category: req.query.category };

    let AttributesCondition = [{}];
    if (req.query.attributes) {
      req.query.attributes.map((element) => {
        let object = {
          attributes: {
            $elemMatch: { key: element.key, value: element.value },
          },
        };
        AttributesCondition.push(object);
        return AttributesCondition;
      });
    }

    let QueryCondition = {
      $and: [
        PriceCondition,
        RatingCondition,
        ...AttributesCondition,
        CategoryCondition,
      ],
    };

    const products = await Product.find(QueryCondition).sort(SortCondition);
    res.send(products);
  } catch (err) {
    next(err);
  }
};

const GetProductsForSearch = async (req, res, next) => {
  try{
    let SearchCondition = {};
    if (req.query.productName) {
      let categoryName = req.query.Category || null;
      if (categoryName) {
        SearchCondition = {
          $and: [
            { category: categoryName },
            { name: req.query.productName  },
          ],
        };
      } else {
        SearchCondition = { name: req.query.productName };
      }
    }
    const products = await Product.find(SearchCondition);
    res.send(products);

  }catch(err){
   next(err)
  }
};

const GetBestSellers =async(req,res,next)=>{
    try{
        const products = await Product.find().sort({sales : -1}).limit(3)
        res.send(products)
    }catch(err){
        next(err)
    }
}

const GetProductByCategory = async (req, res, next) => {
  try {
    const products = await Product.find({ category: req.params.Category });
    res.send(products);
  } catch (err) {
    next(err);
  }
};

const GetProductById = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id)
      .populate("images")
      .populate("reviews")
      .populate("attributes");
    res.send(product);
  } catch (err) {
    next(err);
  }
};

const GetProductByName = async (req, res, next) => {
  try {
    let product = await Product.find({name : req.params.name})
      .populate("images")
      .populate("reviews")
      .populate("attributes");
    res.send(product);
  } catch (err) {
    next(err);
  }
};

const GetAdminProducts = async (req, res, next) => {
  try {
    let products = await Product.find({})
      .sort({ name: 1 })
      .select("name price category");
    res.send(products);
  } catch (err) {
    next(err);
  }
};

const AddProduct = async (req, res, next) => {
  try {
    let product = new Product(req.body);
    await product.save();
    res.send("Prodtuct added !!");
  } catch (err) {
    next(err);
  }
};

const DeleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send("deleted Successfully");
  } catch (err) {
    next(err);
  }
};

const UpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    res.json({
      message: "product updated",
      product: product,
    });
  } catch (err) {
    next(err);
  }
};

const UploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.images == false) {
      res.send("No files uploaded");
    } else {
      const ImageValidator = require("../middleswares/ImageValidator");

      let ImageValidation = ImageValidator(req.files.images);
      if (ImageValidation.error) {
        res.send("error : " + ImageValidation.error);
      } else {
        let FinalImages = [];

        const path = require("path");
        const { v4: uuidv4 } = require("uuid");
        let UploadDirectory = path.resolve(
          __dirname,
          "../../front-end/public/images/products"
        );

        if (Array.isArray(req.files.images)) {
          FinalImages = req.files.images;
        } else {
          FinalImages.push(req.files.images);
        }

        let product = await Product.findById(req.params.productId);

        for (let image of FinalImages) {
          let uploadPath =
            UploadDirectory + "/" + uuidv4() + path.extname(image.name);
          product.images.push({ path: uploadPath });
          image.mv(uploadPath, function (err) {
            if (err) {
              res.send("error occured");
            }
          });
        }
        product.save();
        res.send(product.images);
      }
    }
  } catch (err) {
    next(err);
  }
};

const DeleteImages = async (req, res, next) => {
  try {
    let product = await Product.findByIdAndUpdate(
      { _id: req.params.productId },
      { $pull: { images: { _id: req.params.imageId } } }
    );
    res.send(product.images);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  GetProducts,
  GetProductsForSearch,
  GetBestSellers,
  GetProductByCategory,
  GetProductById,
  GetProductByName,
  GetAdminProducts,
  AddProduct,
  DeleteProduct,
  UpdateProduct,
  UploadImages,
  DeleteImages,
};
