import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Box } from '@mui/material';

export default function AdminCharts({ data }) {
  const chartData = data.map((val, i) => ({
    name: `Day ${i + 1}`,
    registrations: val
  }));

  return (
    <Box sx={{ width: '100%', height: 300, mt: 2 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaeaea" />
          <XAxis dataKey="name" tick={{fill: '#888'}} axisLine={false} tickLine={false} />
          <YAxis tick={{fill: '#888'}} axisLine={false} tickLine={false} />
          <Tooltip 
            cursor={{fill: 'rgba(90, 69, 255, 0.05)'}} 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} 
          />
          <defs>
            <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5A45FF" stopOpacity={1}/>
              <stop offset="95%" stopColor="#3526c8" stopOpacity={0.8}/>
            </linearGradient>
          </defs>
          <Bar dataKey="registrations" fill="url(#colorReg)" radius={[8, 8, 8, 8]} barSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
