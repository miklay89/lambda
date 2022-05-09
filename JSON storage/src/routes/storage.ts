import { Router } from 'express';
import { checkDataAndSave } from '../controllers/storage';
import { getData } from '../controllers/storage';
import { urlError } from '../controllers/storage';


const router = Router();

// sending json to storage (to DB)
router.post('/:id', checkDataAndSave);

// empty url (empty)
router.post('/', urlError).get('/', urlError);

// getting json from storage by id
// need to check if it exists in DB
router.get('/:id', getData);

export default router;