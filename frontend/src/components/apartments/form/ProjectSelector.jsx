import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, Typography } from '@mui/material';

/**
 * Component for selecting a project from a dropdown list with error handling
 */
const ProjectSelector = ({ value, onChange, projects, loadingProjects, error }) => (
  <FormControl fullWidth required error={!!error}>
    <InputLabel id="project-select-label">Project</InputLabel>
    <Select
      labelId="project-select-label"
      name="projectId"
      value={value}
      onChange={onChange}
      label="Project"
      disabled={loadingProjects}
    >
      {loadingProjects ? (
        <MenuItem disabled>
          <CircularProgress size={20} />
        </MenuItem>
      ) : (
        projects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.name}
          </MenuItem>
        ))
      )}
    </Select>
    {error && (
      <Typography color="error" variant="caption">
        {error}
      </Typography>
    )}
  </FormControl>
);

export default ProjectSelector; 