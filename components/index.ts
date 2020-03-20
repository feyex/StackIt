import { Router } from "express";
import { v1 } from "./v1";

let router = Router();

router.use('/v1', v1);

router.get('/', (req, res) => {
  res.send('api components works');
})

export { router as api };