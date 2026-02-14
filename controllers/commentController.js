import { addCommentService } from "../services/commentService.js"

export const addCommentController = async (req, res) => {
    try {
        const comment = await addCommentService(req.user.sub, req.params.id, req.body.text);
        res.status(201).json(comment);
    }
    catch (e) {
        res.status(400).json({ message: "Error in adding comment", error: e.message });
    }
}