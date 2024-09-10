const url = `https://api.cloudinary.com/v1_1/di5zfjqlt/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mern_product");

  try {
    const response = await fetch(url, {
      method: "post",
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const dataResponse = await response.json();
    return dataResponse;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};

export default uploadImage;
