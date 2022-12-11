import Router from "express";
import allClinicsInfo from "../../controllers/info/allclinics";

const router = Router();

// information about all clinics
router.get("/info/clinics", allClinicsInfo);

export default router;
