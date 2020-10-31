import models from '../../../database/models';
import { errorHandling } from '../utils/errorHandling';
const Sequelize = require('sequelize');
const uuid = require('uuid');

const Op = Sequelize.Op;

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
    const buf = Buffer.alloc(16);
    const helperId = req.params.id.replace(/[-]/g, '');
    console.log(helperId);

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
    const location = req.params.id;

    const helpers = await models.Helper.findAll({
      where: {
        roles: 0,
        location: {
        [Op.like]: '%'+ location + '%'
      } },
    });
    if (helpers) {
      return res.status(200).json({ helper });
    }
    return res.status(404).json(errorHandling('Housekeep with the specified location does not exists'));
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
