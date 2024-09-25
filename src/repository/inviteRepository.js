import { invitationModel } from "../model/invitationModel.js";


const saveToken = async ({ email, workspaceId, token }) => {
  const invitation = new invitationModel({
    email,
    workspaceId,
    token
  });
  await invitation.save();
};

const findToken = async (token, email, workspaceId) => {
  console.log('got token')
  return await invitationModel.findOne({ token, email, workspaceId });
};

const markTokenAsUsed = async (token, email, workspaceId) => {
  console.log('token used')
  await invitationModel.findOneAndDelete({ token, email, workspaceId });
};

export { 
    saveToken, 
    findToken, 
    markTokenAsUsed 
};

