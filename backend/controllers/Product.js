// controllers/productController.js
import Product from "../models/productModel.js";
import Kategori from "../models/kategoriProduct.js";
import Merk from "../models/merkProduct.js";

//PRODUCT
// Get all products
export const getProduct = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
// Create a new product
export const createProduct = async (req, res) => {
  const { name, price, description, image, kategori_id, merk_id } = req.body;

  try {
    const newProduct = await Product.create({
      name: name,
      price: price,
      description: description,
      image: image,
      kategori_id: kategori_id,
      merk_id: merk_id,
    });

    res.status(201).json({ msg: "Product created successfully", newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: id,
      },
    });
    if (deletedProduct > 0) {
      res.json({ msg: "Product deleted successfully" });
    } else {
      res.status(404).json({ msg: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  const { id, name, price, description, image, kategori_id, merk_id } =
    req.body;
  try {
    // Cari kategori berdasarkan ID
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Update data produk
    const updatedProduct = await Product.update(
      {
        name: name,
        price: price,
        description: description,
        image: image,
        kategori_id: kategori_id,
        merk_id: merk_id,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (updatedProduct[0] !== 0) {
      res.json({ msg: "Product updated successfully" });
    } else {
      res.status(404).json({ msg: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// MERK PRODUCT
// Get all merek
export const getMerk = async (req, res) => {
  try {
    const merk = await Merk.findAll();
    res.json(merk);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
// Create a new merek
export const createMerk = async (req, res) => {
  const { nameMerk } = req.body;
  try {
    const newMerk = await Merk.create({
      nameMerk: nameMerk,
    });
    res.status(201).json({ msg: "Merek created successfully", newMerk });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
// Delete a merek by ID
export const deleteMerk = async (req, res) => {
  const { nameMerk } = req.body;
  try {
    const deletedMerk = await Merk.destroy({
      where: {
        nameMerk: nameMerk,
      },
    });
    if (!deletedMerk) {
      res.json({ msg: "Merk deleted successfully" });
    } else {
      res.status(404).json({ msg: "Merk not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update a merek by ID
export const updateMerk = async (req, res) => {
  const { nameMerk, newNameMerk } = req.body;
  try {
    const updatedMerk = await Merk.update(
      {
        nameMerk: newNameMerk,
      },
      {
        where: {
          nameMerk: nameMerk,
        },
      }
    );
    if (updatedMerk[0] !== 0) {
      res.json({ msg: "Merek updated successfully" });
    } else {
      res.status(404).json({ msg: "Merek not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// KATEGORI PRODUCT
// Get all kategori

export const getKategori = async (req, res) => {
  try {
    const kategoris = await Kategori.findAll();
    res.json(kategoris);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
// Create a new kategori
export const createKategori = async (req, res) => {
  const { nameKategori } = req.body;
  try {
    const newKategori = await Kategori.create({
      nameKategori: nameKategori,
    });
    res.status(201).json({ msg: "Kategori created successfully", newKategori });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
// Delete a kategori by nameKategori
export const deleteKategori = async (req, res) => {
  const { nameKategori } = req.body;
  try {
    const deletedKategori = await Kategori.destroy({
      where: {
        nameKategori: nameKategori,
      },
    });
    if (deletedKategori) {
      res.json({ msg: "Kategori deleted successfully" });
    } else {
      res.status(404).json({ msg: "Kategori not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update a kategori by nameKategori
export const updateKategori = async (req, res) => {
  const { nameKategori, newNameKategori } = req.body;
  try {
    const updatedKategori = await Kategori.update(
      {
        nameKategori: newNameKategori,
      },
      {
        where: {
          nameKategori: nameKategori,
        },
      }
    );
    if (updatedKategori[0] !== 0) {
      res.json({ msg: "Kategori updated successfully" });
    } else {
      res.status(404).json({ msg: "Kategori not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
