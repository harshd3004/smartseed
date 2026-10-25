const uploadModels = async (req, res) => {
    try {
        res.status(200).json({ message: 'Models uploaded successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    uploadModels
};