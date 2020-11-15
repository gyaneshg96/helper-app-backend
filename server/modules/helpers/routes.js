import { Router } from 'express';
import * as HelperController from './controller';

const routes = new Router();

//all
routes.get('/housekeep', HelperController.getAllHousekeep);
routes.get('/cooks', HelperController.getAllCooks);
routes.get('/helpers', HelperController.getAllHelpers);

//by location
routes.get('/housekeep/:location', HelperController.getHousekeepByLocation);
routes.get('/cooks/:location', HelperController.getCooksByLocation);
routes.get('/helpers/:location', HelperController.getHelpersByLocation);

//get all details
routes.get('/helpers/:id', HelperController.getHelperById);
routes.post('/helpers', HelperController.createHelper);
routes.delete('/helpers/:id', HelperController.deleteHelper);
routes.put('/helpers/:id', HelperController.updateHelper);

//by name
routes.get('/housekeep/:name', HelperController.getHousekeepByName);
routes.get('/cooks/:name', HelperController.getCooksByName);
routes.get('/helpers/:name', HelperController.getHelpersByName);

//custom filter
//add a helper for a given user
//get a helper for a particular slot

export default routes;
