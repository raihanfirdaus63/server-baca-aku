const errorHandler = (err, req, res, next) => {
    console.log(err);
    switch (err.name) {
        case 'SequelizeValidationError':
            res.status(400).json({
                msg: err.errors[0].message
            })
            break;

        case 'SequelizeUniqueConstraintError':
            res.status(400).json({
                msg: err.errors[0].message
            })
            break;
        case 'No File Error':
            res.status(400).json({
                msg: "No file provided in the request"
            })
            break;
        case 'Invalid Credential':
            res.status(401).json({
                msg: 'Email or Password is invalid'
            })
            break;
        case 'No Access':
            res.status(401).json({
                msg: 'Access denied, you are not admin'
            })
            break;

        case 'JsonWebTokenError':
            res.status(401).json({
                msg: 'Email or Password is invalid'
            })
            break;

        case 'Not Found':
            res.status(404).json({
                msg: 'Data not found'
            })
            break;

        default:
            console.log(err);
            res.status(500).json({
                msg: 'Internal Server Error'
            })
            break;
    }
}

module.exports = errorHandler