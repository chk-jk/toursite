import Posting from "../models/Posting.js";

export const home = async (req, res) => {
  const posts = await Posting.find({}).sort({ createdAt: "desc" });
  return res.render("home", { pageTitle: "Home", posts });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const posting = await Posting.findById(id);
  if (!posting) {
    return res.render("404", { pageTitle: "posting not found." });
  }
  return res.render("watch", { pageTitle: posting.title, posting });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const posting = await Posting.findById(id);
  if (!posting) {
    return res.render("404", { pageTitle: "posting not found." });
  }
  return res.render("edit", { pageTitle: `Edit: ${posting.title}`, posting });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const posting = await Posting.exists({ _id: id });
  if (!posting) {
    return res.render("404", { pageTitle: "Posts not found." });
  }
  await Posting.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Posting.formatHashtags(hashtags),
  });
  return res.redirect(`/posts/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Posting" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Posting.create({
      title,
      description,
      hashtags: Posting.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload Posting",
      errorMessage: error._message,
    });
  }
};

export const deletePosting = async (req, res) => {
  const { id } = req.params;
  await Posting.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let posts = [];
  if (keyword) {
    posts = await Posting.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search", posts });
};
