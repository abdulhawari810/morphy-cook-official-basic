export const success = async (req, status, message, data = null) => {
  if (!data) {
    return req.status(status).json({ message });
  }

  return req.status(status).json({ message, data });
};

export const error = async (req, status, message, data = null) => {
  if (!data) {
    return req.status(status).json({ message });
  }

  return req.status(status).json({ message, data });
};
