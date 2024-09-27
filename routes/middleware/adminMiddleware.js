import jwt from "jsonwebtoken";
import "dotenv/config";
export default function adminAuth(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }
  const id = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
  if (!id) {
    return res.status(401).json({ message: "Inccorect token!" });
  }
  req.creatorId = id;
  next();
}
