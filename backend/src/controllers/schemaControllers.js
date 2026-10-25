const uploadModels = async (req, res) => {
    try {
        res.status(200).json({ message: 'Models uploaded successfully' });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    uploadModels
};