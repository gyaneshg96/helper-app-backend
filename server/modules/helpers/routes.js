import { Router } from 'express';
import * as HelperController from './controller';

const routes = new Router();

//all
routes.get('/housekeep', HelperController.getAllHousekeep);
routes.get('/cooks', HelperController.getAllCooks);

//by location
routes.get('/housekeep/:location', HelperController.getHousekeepByLocation);
routes.get('/cooks/:location', HelperController.getCooksByLocation);

//get all details
routes.get('/helpers/:id', HelperController.getHelperById);
routes.post('/helpers', HelperController.createHelper);
routes.delete('/helpers/:id', HelperController.deleteHelper);
routes.put('/helpers/:id', HelperController.updateHelper);

//custom filter, name

//add a helper for a given user
//get a helper for a particular slot

export default routes;
