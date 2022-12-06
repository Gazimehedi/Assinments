
const auth = async (req, res, next) => {
  const secret = process.env.SECRET || "SECRET";
  try {
    if (secret !== req.headers.secret) {
      throw new Error();
    }
    next();
  } catch (err) {
    res.status(401).send({
      status: "Error",
      message: "Unauthorized! Please try again",
      data: null,
    });
  }
};

module.exports = auth;
