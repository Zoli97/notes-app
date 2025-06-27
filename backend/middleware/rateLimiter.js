import ratelimit from "../config/upstash.js";
const rateLimiter = async (req, resp, next) => {
  try {
    const key = req.ip; // Use IP to rate-limit per user
    const { success } = await ratelimit.limit(key);
    if (!success) {
      return resp
        .status(429)
        .json({ message: "Too many requests, please try again later !" });
    }
    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
