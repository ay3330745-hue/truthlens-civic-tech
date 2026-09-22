const express = require('express');
const cors = require('cors');
const path = require('path');

const claimsRoutes = require('./routes/claims');
const decisionsRoutes = require('./routes/decisions');
const healthRoutes = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/claims', claimsRoutes);
app.use('/api/decisions', decisionsRoutes);
app.use('/api/health', healthRoutes);

// Serve static frontend build files in production if available
const clientBuildPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(clientBuildPath, 'index.html');
  if (require('fs').existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  return res.json({
    message: 'TruthLens API Backend is running.',
    hackathonId: 'AZISTDD368',
    docs: '/api/health'
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 TruthLens API Server running on port ${PORT}`);
    console.log(`📍 Hackathon ID: AZISTDD368`);
    console.log(`🔗 API Base: http://localhost:${PORT}/api/claims`);
    console.log(`=======================================================`);
  });
}

module.exports = app;
