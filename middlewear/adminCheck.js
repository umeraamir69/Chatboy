// middlewear/adminCheck.js

import { getSession } from 'next-auth/client';

const requireAuth = (handler) => {
  return async (req, res) => {
    const session = await getSession({ req });
    const useradta = await User.findOne({"email":session.user.email})
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return handler(req, res);
  };
};

export default requireAuth;
