import Router from "express";
import getClinicByClinicSlug from "../../controllers/info/byclinicslug";

const router = Router();

// information about chosen clinic
router.get("/info/clinic/:clinic_slug", getClinicByClinicSlug);

export default router;
