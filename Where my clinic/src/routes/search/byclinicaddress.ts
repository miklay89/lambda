import Router from "express";
import searchByClinicAddress from "../../controllers/search/byclinicaddress";

const router = Router();

// getting clinic/clinics by address
router.get("/search/address/:address", searchByClinicAddress);

export default router;
