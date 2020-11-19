import models from '../../../database/models';
import { errorHandling } from '../utils/errorHandling';
const Sequelize = require('sequelize');
const uuid = require('uuid');

const Op = Sequelize.Op;

export const performHealthCheck = (req, res) => {
  const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};
	try {
    console.log(healthcheck);
		return res.status(200).json({healthcheck});
	} catch (e) {
		healthcheck.message = e;
		return res.status(503).json(healthcheck.message);
	}
};

export const getAllCooks = async (req, res) => {
  try {
    const helpers = await models.Helper.findAll({
      where:{
        roles:"1"
      }
    });
    return res.status(200).json({ helpers });
  } catch (error) {
    return res.status(500).json(errorHandling(error.message));
  }
};

export const getAllHousekeep = async (req, res) => {
  try {
    const helpers = await models.Helper.findAll({
      where:{
        roles:"0"
      }
    });
    return res.status(200).json({ helpers });
  } catch (error) {
    return res.status(500).json(errorHandling(error.message));
  }
};

export const getAllHelpers = async (req, res) => {
  try {
    const helpers = await models.Helper.findAll();
    return res.status(200).json({ helpers });
  } catch (error) {
    return res.status(500).json(errorHandling(error.message));
  }
};

export const createHelper = async (req, res) => {
  try {
    const helper = await models.Helper.create(req.body);
    return res.status(201).json({
      helper
    });
  } catch (error) {
    return res.status(500).json({ error: errorHandling(error.message) });
  }
};

export const deleteHelper = async (req, res) => {
  try {
    const helperId = req.params.id.replace(/[-]/g, '');
    const deleted = await models.Helper.destroy({
      where: { id: helperId }
    });
    if (deleted) {
      return res.status(204).send('Helper deleted');
    }
    throw new Error('Helper not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getHelperById = async (req, res) => {
  try {
    const helperId = req.params.id.replace(/[-]/g, '');
    
    const helper = await models.Helper.findOne({
      where: { 
        id: helperId 
      },
    });
    if (helper) {
      return res.status(200).json({ helper });
    }
    return res.status(404).json(errorHandling('Helper with the specified ID does not exists'));
  } catch (error) {
    return res.status(500).json(errorHandling(error.message));
  }
};

export const getCooksByLocation = async (req, res) => {
  try {
    //only bengaluru for now
    const location = req.params.location;

    const helpers = await models.Helper.findAll({
      where: {
        roles: "1",
        locations: {
        [Op.like]: '%'+ location + '%'
      } },
    });
    if (helpers) {
      return res.status(200).json({ helpers });
    }
    return res.status(404).json(errorHandling('Cooks with the specified location does not exists'));
  } catch (error) {
    return res.status(500).json(errorHandling(error.message));
  }
};

export const getHousekeepByLocation = async (req, res) => {
  try {
    const location = req.params.location;

    const helpers = await models.Helper.findAll({
      where: {
        roles: "0",
        locations: {
        [Op.like]: '%'+ location + '%'
      } },
    });
    if (helpers) {
      return res.status(200).json({ helpers });
    }
    return res.status(404).json(errorHandling('Housekeep with the specified location does not exists'));
  } catch (error) {
    return res.status(500).json(errorHandling(error.message));
  }
};

export const getHelpersByLocation = async (req, res) => {
  try {
    const location = req.params.location;

    const helpers = await models.Helper.findAll({
      where: {
        locations: {
        [Op.like]: '%'+ location + '%'
      } },
    });
    if (helpers) {
      return res.status(200).json({ helpers });
    }
    return res.status(404).json(errorHandling('Housekeep with the specified location does not exists'));
  } catch (error) {
    return res.status(500).json(errorHandling(error.message));
  }
};

export const getCooksByName = async (req, res) => {
  try {
    //only bengaluru for now
    const location = req.params.name;

    //for now just a simple substring
    const helpers = await models.Helper.findAll({
      where: {
        roles: "1",
        name: {
        [Op.like]: '%'+ name + '%'
      } },
    });
    if (helpers) {
      return res.status(200).json({ helpers });
    }
    return res.status(404).json(errorHandling('Cooks with the specified location does not exists'));
  } catch (error) {
    return res.status(500).json(errorHandling(error.message));
  }
};

export const getHousekeepByName = async (req, res) => {
  try {
    const location = req.params.name;

    const helpers = await models.Helper.findAll({
      where: {
        roles: "0",
        names: {
        [Op.like]: '%'+ name + '%'
      } },
    });
    if (helpers) {
      return res.status(200).json({ helpers });
    }
    return res.status(404).json(errorHandling('Housekeep with the specified location does not exists'));
  } catch (error) {
    return res.status(500).json(errorHandling(error.message));
  }
};

export const getHelpersByName = async (req, res) => {
  try {
    const location = req.params.name;

    const helpers = await models.Helper.findAll({
      where: {
        names: {
        [Op.like]: '%'+ name + '%'
      } },
    });
    if (helpers) {
      return res.status(200).json({ helpers });
    }
    return res.status(404).json(errorHandling('Helper with the specified location does not exists'));
  } catch (error) {
    return res.status(500).json(errorHandling(error.message));
  }
};

export const updateHelper = async (req, res) => {
  try {
    const helperId = req.params.id.replace(/[-]/g, '');
    const [updated] = await models.Helper.update(req.body, {
      where: { id: helperId }
    });
    if (updated) {
      const updatedHelper = await models.Helper.findOne({ where: { id: helperId } });
      return res.status(200).json({ helper: updatedHelper });
    }
    throw new Error('Helper not found');
  } catch (error) {
    return res.status(500).json({ error: errorHandling(error.message) });
  }
};
