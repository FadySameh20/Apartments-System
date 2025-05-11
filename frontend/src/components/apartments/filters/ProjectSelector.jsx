import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material';

/**
 * Component for selecting a project from a dropdown list
 */
const ProjectSelector = ({ value, onChange, projects, loading }) => (
  <FormControl fullWidth size="small">
    <InputLabel id="project-select-label">Project</InputLabel>
    <Select
      labelId="project-select-label"
      name="projectId"
      value={value}
      onChange={onChange}
      label="Project"
      disabled={loading}
      sx={{
        minWidth: '200px',
        '& .MuiSelect-select': {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }}
    >
      <MenuItem value="">
        <em>All Projects</em>
      </MenuItem>
      {loading ? (
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
  </FormControl>
);

export default ProjectSelector; 