// backend/routes/reportRoutes.js
const express = require('express');
const router = express.Router();

// Rota de teste para reportRoutes
router.get('/reports/test', (req, res) => {
    res.send('Report routes estão funcionando!');
});

// Rota de teste para problem-types
router.get('/problem-types/test', (req, res) => {
    res.send('Problem types route está funcionando!');
});

module.exports = router;