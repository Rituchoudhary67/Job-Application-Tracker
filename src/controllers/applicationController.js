const pool = require("../config/db");

//create job application
exports.createApplication = async (req, res) => {
    try {
        const { company, role, status, applied_date, notes } = req.body;

        const result = await pool.query(
            `INSERT INTO applications 
            (user_id, company, role, status, applied_date, notes)
            VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING *`,
            [req.user.id, company, role, status, applied_date, notes]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to create application"});
    }
};

//read application
exports.getApplications = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM applications WHERE user_id = $1 ORDER BY applied_date DESC",
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

//update application 
exports.updateApplication = async (req, res) => {
    try {
        const {company,role,status,applied_date,notes} = req.body;

        const result = await pool.query(
            `UPDATE applications
            SET company=$1, role=$2, status=$3, applied_date=$4, notes=$5, updated_at=NOW()
            WHERE id=$6 AND user_id=$7
            RETURNING *`,
            [company,role,status,applied_date,notes, req.params.id, req.user.id]
        );

        if(result.rows.length === 0) {
            return res.status(404).json({message: "Application not found"});
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to update application"});
    }
};

//delete application
exports.deleteApplication = async (req, res) => {
    try {
        const result = await pool.query(
            "DELETE FROM applications WHERE id=$1 and user_id=$2 RETURNING *",
            [req.params.id, req.user.id]
        );

        if(result.rows.length === 0) {
            return res.status(404).json({message: "Application not found"});
        }

        res.json({message: "Application deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(200).json({message: "Failed to delete application"});
    }
};