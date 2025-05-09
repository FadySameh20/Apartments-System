import React from 'react';
import { 
  Grid as MuiGrid, 
  GridSize
} from '@mui/material';

export interface CustomGridProps {
  children: React.ReactNode;
  container?: boolean;
  item?: boolean;
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
  spacing?: number | string;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  sx?: any;
  key?: React.Key;
  [key: string]: any;
}

const Grid: React.FC<CustomGridProps> = (props) => {
  return <MuiGrid {...props} />;
};

export default Grid; 