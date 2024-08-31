import express from 'express'
import ProfileController from '../controllers/profileController'
const profileRoutes = express.Router()
import { verifyToken } from '../middlewares/verifyToken'

console.log('entrando a profile routes')
profileRoutes.get("/", verifyToken, ProfileController.getAll)
profileRoutes.get("/:id",verifyToken, ProfileController.getById)

profileRoutes.post("/create",verifyToken, ProfileController.createProfile)

profileRoutes.delete("/:id",verifyToken, ProfileController.deleteProfile)
profileRoutes.put("/:id",verifyToken, ProfileController.updateProfile)



export default profileRoutes

