// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Rota de teste para authRoutes
router.get('/test', (req, res) => {
    res.send('Auth routes estão funcionando!');
});

module.exports = router;