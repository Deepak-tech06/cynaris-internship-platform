import Company from "../models/Company.js";
import Project from "../models/Project.js";

// 🏢 Company CRUD
export const createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json({ message: "Company created", company });
  } catch (err) {
    res.status(500).json({ message: "Error creating company", error: err.message });
  }
};

export const getCompanies = async (req, res) => {
  const companies = await Company.findAll({ include: Project });
  res.json(companies);
};

// 📁 Project CRUD
export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ message: "Project created", project });
  } catch (err) {
    res.status(500).json({ message: "Error creating project", error: err.message });
  }
};

export const getProjects = async (req, res) => {
  const projects = await Project.findAll({ include: Company });
  res.json(projects);
};
