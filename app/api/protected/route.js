import { authenticateUser } from "../../../middleware/authMiddleware.js";

export default function handler(req, res) {
  authenticateUser(req, res, () => {
    res.status(200).json({ message: "Protected data", user: req.user });
  });
}
