const express = require("express");
const router = express.Router();

const {
    createApplication,
    getApplications,
    updateApplication,
    deleteApplication
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createApplication);
router.get("/", authMiddleware, getApplications);
router.put("/:id", authMiddleware, updateApplication);
router.delete("/:id", authMiddleware,deleteApplication);

module.exports = router;