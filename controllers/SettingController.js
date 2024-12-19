const uploadLogo = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded');
        }
        res.status(200).json({
            message: 'File uploaded successfully',
            filePath: `/storage/${file.filename}`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
    return res.status(200).send({})
}

module.exports = { uploadLogo };