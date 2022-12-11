import Router from "express";
import getClinicByStateAndSuburb from "../../controllers/info/bystateandsuburb";

const router = Router();

// information about chosen clinic
router.get("/info/state/:state_name/:suburb_name", getClinicByStateAndSuburb);

export default router;
