import {
  addAdminReplyService,
  addCommentService,
  deleteCommentService,
  getAllCommentsService,
} from "../services/commentService.js";

export const addCommentController = async (req, res) => {
  try {
    const comment = await addCommentService(
      req.user.sub,
      req.params.id,
      req.body.text,
    );
    res.status(201).json(comment);
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error in adding comment", error: e.message });
  }
};

export const getAllCommentsController = async (req, res) => {
  try {
    const comments = await getAllCommentsService();
    res.status(200).json(comments);
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error in getting all comments", error: e.message });
  }
};

export const addAdminReplyController = async (req, res) => {
  try {
    const comment = await addAdminReplyService(req.params.id, req.body.text);
    res.status(200).json(comment);
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error in adding admin reply", error: e.message });
  }
};

export const deleteCommentController = async (req, res) => {
  try {
    const deletedComment = await deleteCommentService(req.params.id);
    res.status(200).json(deletedComment);
  } catch (e) {
    return res
      .status(400)
      .json({ message: "Error in deleting comment", error: e.message });
  }
};
