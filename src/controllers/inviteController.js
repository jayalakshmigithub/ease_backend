import sendInvitation from '../services/inviteServices.js';
import { findToken, markTokenAsUsed } from '../repository/inviteRepository.js';
import decryptEmail from '../utils/functions/decryptEmail.js';

//  const sendInvitationController = async (req, res) => {
//   const formData  = req.body;
//   console.log(formData)
//   const {email,workspaceId}=formData
//   try { 
//     const result = await sendInvitation(email, workspaceId);
//     if (result.success) {
//       res.status(200).json({ message: result.message });
//     } else {
//       res.status(400).json({ message: result.message });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

const sendInvitationController = async (req, res) => {
  console.log('send incivitaiton',req.body)
  const formData  = req.body;
  console.log(formData,"empty")
  const {emails,workspaceId}=formData
  try { 
    console.log(emails,'emailsemails')
    console.log(workspaceId,'workspaceId')

    const result = await sendInvitation(emails, workspaceId);
    console.log('workspace id in invite controller send',result)
    if (result) {
      console.log(result,'ressult')
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


const verifyInvitationController = async (req, res) => {
  const { token, email: encryptedEmail, workspaceId } = req.query;
  const email = decryptEmail(encryptedEmail);

  try {
    const invitation = await findToken(token, email, workspaceId);
    if (invitation) {
      await markTokenAsUsed(token, email, workspaceId);
      console.log('workspace id in invite controller',workspaceId)
      res.redirect(`http://localhost:5173/signup?email=${encryptedEmail}&workspaceId=${workspaceId}`);
    } else {
      res.status(400).json({ message: 'Invalid or expired invitation link' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export {
    sendInvitationController,
    verifyInvitationController
}
