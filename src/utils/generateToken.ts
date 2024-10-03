import jwt from 'jsonwebtoken'

const generateToken = (id:string) => {
    const token = jwt.sign({id},process.env.JWT_SECRET!,{
        expiresIn:'3d'
    })
}

export default generateToken;