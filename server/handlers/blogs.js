import db from "@/models";
const blobSasToken = process.env.AZURE_SAS_TOKEN;

const getAllBlogs = async () => {
  return await db.blog.findAll({ where: { status: "published" } });
};

const getBlogsById = async (id) => {
  const response = await db.blog.findAll({
    where: { user_id: id },
  });

  const blogs = response.map((blog) => {
    const blogData = blog.toJSON(); // convert Sequelize instance to plain object

    return {
      ...blogData,
      featured_image: blogData.featured_image
        ? `${blogData.featured_image}?${blobSasToken}`
        : null,
    };
  });

  console.log("getBlogsById", { blogs });

  return blogs; // ✅ return modified data
};

const createBlog = async (registryItemData) => {
  return await db.blog.create(registryItemData);
};

const updateBlog = async (id, registryItemData) => {
  const userBlog = await db.blog.findByPk(id);
  if (!userBlog) {
    throw new Error("Blog not found");
  }
  return await userBlog.update(registryItemData);
};

const deleteBlog = async (id) => {
  const userBlog = await db.blog.findByPk(id);
  if (!userBlog) {
    throw new Error("Blog not found");
  }
  await userBlog.destroy();
  return { message: "Blog deleted successfully" };
};

export { getAllBlogs, getBlogsById, createBlog, updateBlog, deleteBlog };
